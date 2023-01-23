const controlBtn = document.querySelectorAll('.controls__btn');
const alien = document.querySelectorAll('#model')[0];
console.log(alien)

const animationList = [
    {
    animationName: 'wave',
    },
    {
    animationName: 'dance',
    },
    {
    animationName: 'twerk',
    },
    {
    animationName: 'stand',
    }
];

console.log(alien);

controlBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const chosenAnimation = animationList.find(animationItem => animationItem.animationName === btn.dataset.animation)
    
        alien.setAttribute('animation-mixer', {
            clip: chosenAnimation.animationName
        });
    })
});

console.log('test')
