/* Refresh public OGS global 19x19 rating history. No dependencies or credentials. */
'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');

const ENDPOINT = 'https://online-go.com/termination-api/player/2117847/v5-rating-history?speed=overall&size=19';
const OUTPUT = path.resolve('iconoclaste-history.json');
const SERIES = '19x19';

// OGS RatingsChart uses this TSV endpoint. Its RatingEntry parser reads
// `ended` as Unix seconds and `rating` as the numeric Glicko rating.
function parseHistory(tsv) {
    const lines = tsv.replace(/^\uFEFF/, '').trim().split(/\r?\n/);
    if (lines.length < 2) throw new Error('History response contains no observations.');
    const headers = lines.shift().split('\t').map((value) => value.trim());
    const dateIndex = headers.indexOf('ended');
    const ratingIndex = headers.indexOf('rating');
    if (dateIndex < 0 || ratingIndex < 0 || new Set(headers).size !== headers.length) {
        throw new Error('History response is missing unique ended/rating TSV headers.');
    }

    const points = lines.filter((line) => line.trim()).map((line, index) => {
        const fields = line.split('\t');
        const rawDate = fields[dateIndex]?.trim();
        const rawRating = fields[ratingIndex]?.trim();
        const seconds = Number(rawDate);
        const rating = Number(rawRating);
        const milliseconds = seconds * 1000;
        if (!rawDate || !rawRating || !Number.isFinite(seconds) || seconds <= 0 ||
            !Number.isFinite(rating) || milliseconds > Date.now() + 86400000 ||
            !Number.isFinite(new Date(milliseconds).getTime())) {
            throw new Error(`Invalid rating observation at TSV row ${index + 2}.`);
        }
        return { date: new Date(milliseconds).toISOString(), rating };
    });
    if (!points.length) throw new Error('History response contains no valid observations.');
    return points.sort((a, b) => a.date.localeCompare(b.date)).slice(-500);
}

async function main() {
    const response = await fetch(ENDPOINT, {
        headers: { Accept: 'text/tab-separated-values, text/plain;q=0.9' },
        signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) throw new Error(`OGS history request returned HTTP ${response.status}.`);
    const points = parseHistory(await response.text());
    let previous;
    try {
        previous = JSON.parse(await fs.readFile(OUTPUT, 'utf8'));
    } catch (error) {
        if (error.code !== 'ENOENT') throw error;
    }
    if (previous?.series === SERIES && JSON.stringify(previous.history) === JSON.stringify(points)) {
        console.log('Rating observations are unchanged.');
        return;
    }
    const output = { updatedAt: new Date().toISOString(), series: SERIES, history: points };
    const temporary = OUTPUT + '.tmp';
    await fs.writeFile(temporary, JSON.stringify(output, null, 2) + '\n', 'utf8');
    await fs.rename(temporary, OUTPUT);
    console.log(`Updated ${path.basename(OUTPUT)} with ${points.length} observations.`);
}

module.exports = { parseHistory };
if (require.main === module) {
    main().catch((error) => {
        console.error(error.message);
        process.exitCode = 1;
    });
}
