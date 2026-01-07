export function displayPage5(container) {
    container.innerHTML = '';

    const p = document.createElement('p');
    const ul = document.createElement('ul');
    const item1 = document.createElement('li');
    const item2 = document.createElement('li');
    const item2ul = document.createElement('ul');
    const item2ulitem1 = document.createElement('li');
    const item2ulitem2 = document.createElement('li');

    item2ulitem1.innerText = 'to the Calendar';
    item2ulitem2.innerText = 'to the Next actions list';

    item1.innerText = 'Delegate it; your stuff belongs to the waiting list';
    p.innerText = 'Either:';

    item2ul.append(item2ulitem1, item2ulitem2);

    item2.innerText = 'Defer it:'

    item2.append(item2ul);

    ul.style.textAlign = 'left';
    item2ul.style.textAlign = 'left';

    item1.style.fontSize = '2rem';
    item2.style.fontSize = '2rem';

    ul.append(item1, item2);

    container.append(p, ul);
}
