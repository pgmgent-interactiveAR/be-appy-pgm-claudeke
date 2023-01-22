const firstWord = ['Be', 'Act', 'Clear'];
const secondWord = ['Celestial', 'Cosmic', 'Astronomical'];
const thirdWord = ['Expectation', 'Mistakes', 'Yourself'];

const bgImages = ['aldebaran-s-uXchDIKs4qI-unsplash.jpg', 'vincentiu-solomon-ln5drpv_ImI-unsplash.jpg', 'shot-by-cerqueira-0o_GEzyargo-unsplash.jpg', 'aldebaran-s-qtRF_RxCAo0-unsplash.jpg']

const generateBtn = document.querySelector('#generate');

const lineOne = document.querySelector('.quote__line--one');
const lineTwo = document.querySelector('.quote__line--two');
const lineThree = document.querySelector('.quote__line--three');

const backGround = document.querySelector('.background');

generateBtn.addEventListener('click', (ev) => {
    lineOne.innerHTML = firstWord[Math.floor(Math.random() * firstWord.length)];
    lineTwo.innerHTML = secondWord[Math.floor(Math.random() * firstWord.length)];
    lineThree.innerHTML = thirdWord[Math.floor(Math.random() * firstWord.length)];
    randomBg = bgImages[Math.floor(Math.random() * firstWord.length)];
    backGround.innerHTML = `<img class="background__image" src="../dist/assets/images/${randomBg}" alt="${randomBg}">`
})
