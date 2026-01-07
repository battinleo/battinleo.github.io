export function displayPage4(container) {
    container.innerHTML = '';
    const p = document.createElement('p');
    p.innerText = 'Do it.'
    p.style = `
        font-size: 6rem;
        font-weight: 700;
    `;
    container.append(p);
}