import { displayPage4 } from "./4.js";
import { displayPage5 } from "./5.js";

export function displayPage3(container) {
    container.innerHTML = '';

    const p = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    const buttons = document.createElement('div');
    const yesButton = document.createElement('button');
    const noButton = document.createElement('button');

    p.textContent = 'Will the next action...';
    p2.textContent = '...be part of a larger whole? → Make sure that the project is listed before continuing.';
    p3.textContent = '...take less than 2 minutes?';
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

    p2.style.fontSize = '1.75rem';
    p3.style.marginTop = '2rem';

    yesButton.addEventListener('click', () => {
        displayPage4(container);
    });

    noButton.addEventListener('click', () => {
        displayPage5(container);
    });

    buttons.append(yesButton, noButton);
    container.append(p, p2, p3, buttons);
}
