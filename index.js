import { displayPage1 } from "./src/pages/1.js";

const restart = document.getElementById('restart');
const pageContainer = document.getElementById('page-container');

restart.addEventListener('click', () => {
    displayPage1(pageContainer);
});
displayPage1(pageContainer);
