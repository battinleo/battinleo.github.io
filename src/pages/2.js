export function displayPage2(container) {
    container.innerHTML = '';

    const p = document.createElement('p');
    const ul = document.createElement('ul');
    const itemTexts = [
        'Trash',
        'Someday/maybe',
        'Reference',
    ];

    p.innerText = 'Your stuff belongs to either:';
    for (const text of itemTexts) {
        const item = document.createElement('li');
        item.innerText = text;
        ul.append(item);
    }

    ul.style.textAlign = 'left';

    container.append(p, ul);
}
