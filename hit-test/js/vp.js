const btnStartAr = document.querySelector('#startAR');
const btnsPet = document.querySelector('.btns--pet');

btnStartAr.addEventListener('click', (ev) => {
    btnsPet.classList.remove('hide');
    btnStartAr.classList.add('hide');
})