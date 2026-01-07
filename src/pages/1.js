import { displayPage2 } from "./2.js";
import { displayPage3 } from "./3.js";

export function displayPage1(container) {
    container.innerHTML = '';

    const p = document.createElement('p');
    const buttons = document.createElement('div');
    const yesButton = document.createElement('button');
    const noButton = document.createElement('button');

    p.textContent = 'Is it actionable?'
    yesButton.textContent = 'Yes'
    noButton.textContent = 'No';

    buttons.style = `
        display: flex;
        justify-content: center;
        gap: 3rem;
        margin-top: 3rem;
    `;

    const buttonWidth = '150px';

    yesButton.style.width = buttonWidth;
    noButton.style.width = buttonWidth;

    noButton.addEventListener('click', () => {
        displayPage2(container);
    });

    yesButton.addEventListener('click', () => {
        displayPage3(container);
    });

    buttons.append(yesButton, noButton);
    container.append(p, buttons);
}
