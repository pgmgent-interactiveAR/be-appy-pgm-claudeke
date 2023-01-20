const controlBtn = document.querySelectorAll('.controls__btn');
const alien = document.querySelectorAll('#model--alien');

console.log(alien.getAttribute('animation-mixer'));

const animationList = [
    {
    animationName: 'wave',
    position: {
        x: 0.65,
        y: -0.1,
        z: 0,
    }
    },
    {
    animationName: 'dance',
    position: {
        x: 0.65,
        y: -0.1,
        z: 0,
    }
    },
    {
    animationName: 'twerk',
    position: {
        x: 0.65,
        y: -0.1,
        z: 0,
    }
    },
    {
    animationName: 'stand',
    position: {
        x: 0.65,
        y: 0.7,
        z: 0,
    }
    },
    {
    animationName: 'kiss',
    position: {
        x: 0.4,
        y: -0.1,
        z: 0,
    },
    rotation: {
        x: 0,
        y: -90,
        z: 0,
    }
    },
];

controlBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const chosenAnimation = animationList.find(animationItem => animationItem.animationName === btn.dataset.animation)
    
        console.log('clicked ')
        alien.setAttribute('position', chosenAnimation.position);
        alien.setAttribute('animation-mixer', {
            clip: chosenAnimation.animationName
        });

        if (chosenAnimation.rotation) {
            alien.setAttribute('rotation', chosenAnimation.rotation);
        };
    })
});

console.log('test')

