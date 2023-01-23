const controlBtn = document.querySelectorAll('.controls__btn');
const alien = document.querySelectorAll('#model')[0];

const animationList = [
    {
    animationName: 'flair',
    },
    {
    animationName: 'idle',
    },
    {
    animationName: 'twerk',
    },
    {
    animationName: 'sillydance1',
    },
];

controlBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const chosenAnimation = animationList.find(animationItem => animationItem.animationName === btn.dataset.animation)
    
        alien.setAttribute('animation-mixer', {
            clip: chosenAnimation.animationName
        });
    })
});

