'use strict';

const book = document.querySelectorAll('.book');

const paragraphs = book[0].querySelectorAll('li');

const paragraphsTwo = book[5].querySelectorAll('li');

const paragraphsThree = book[2].querySelector('ul');

paragraphs[1].insertAdjacentElement('afterend', paragraphs[3]);

paragraphs[3].insertAdjacentElement('afterend', paragraphs[6]);

paragraphs[6].insertAdjacentElement('afterend', paragraphs[8]);

paragraphs[8].insertAdjacentElement('afterend', paragraphs[4]);

paragraphs[4].insertAdjacentElement('afterend', paragraphs[5]);

paragraphs[5].insertAdjacentElement('afterend', paragraphs[7]);

paragraphs[7].insertAdjacentElement('afterend', paragraphs[9]);

document.body.setAttribute('style', 'background-image:url(./image/you-dont-know-js.jpg)');

const books = document.querySelector('.books');

books.prepend(book[2]);

books.prepend(book[5]);

books.prepend(book[3]);

books.prepend(book[4]);

books.prepend(book[0]);

books.prepend(book[1]);

const elemForDelete = document.querySelector('.adv');

elemForDelete.remove();

const mistake = book[4].querySelector('a');

mistake.textContent = 'Книга 3. this и Прототипы Объектов';

book[5].append(paragraphsTwo[9]);

book[5].append(paragraphsTwo[3]);

book[5].append(paragraphsTwo[4]);

book[5].append(paragraphsTwo[2]);

book[5].append(paragraphsTwo[6]);

book[5].append(paragraphsTwo[7]);

book[5].append(paragraphsTwo[5]);

book[5].append(paragraphsTwo[8]);

book[5].append(paragraphsTwo[10]);

const newParagraph = document.createElement('li');

newParagraph.textContent = 'Глава 8: За пределами ES6';

paragraphsThree.append(newParagraph);
