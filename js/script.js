window.addEventListener('DOMContentLoaded', function() {
'use strict';

    const startBtn = document.querySelector('.startAnim');
    const resetBtn = document.querySelector('.resetAnim');
    const cloud1 = document.querySelector('.cloud1');
    const cloud2 = document.querySelector('.cloud2');
    const ourRoad = document.querySelector('.road');
    let count = 0;
    let moveAnim;
    let moveRod;
    const speed = 5;

    const getQuantityElements = widthElement => Math.ceil(ourRoad.offsetWidth / widthElement);

    for(let i = 0; i < getQuantityElements(100) + 1; i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.left = (i * 100) + 'px';
        line.x = i * 100;
        ourRoad.appendChild(line);
    }

    const move = ()=> {
        moveAnim = requestAnimationFrame(move);
        moveRod = requestAnimationFrame(moveRoad);
        count++;

        if(count < 750) {
            cloud1.style.left = count + 'px';
            cloud2.style.left = count * 2 + 'px';
        } else {
            cancelAnimationFrame(moveAnim);
        }
    };
    const stop = () => {
        let posCl1 = cloud1.getBoundingClientRect();
        if (posCl1.x > 1) {
        count = 0;
        posCl1.x = 0;
        cloud1.style.left = 0 + 'px';
        cloud2.style.left = 0 + 'px';
        }
    };

    const moveRoad = () => {
        let lines = document.querySelectorAll('.line');
        lines.forEach(function(line){
            line.x += speed;
            line.style.left = line.x + 'px';
            console.log(line.x);
    
            if(line.x >= ourRoad.offsetWidth) {
                line.x = -100;
            }
        });
    };

    document.addEventListener('click', (event)=> {

        if(event.target === startBtn && !event.target.classList.contains('clicked')) {
            startBtn.classList.add('clicked');
            startBtn.textContent = 'Stop!';
            resetBtn.style.display = 'none';
            moveAnim = requestAnimationFrame(move);
            moveRod = requestAnimationFrame(moveRoad);
        } else if(event.target === startBtn && event.target.classList.contains('clicked', true)) { 
            startBtn.classList.remove('clicked');
            startBtn.textContent = 'Start Animation!';
            moveAnim = cancelAnimationFrame(moveAnim);
            moveRod =  cancelAnimationFrame(moveRoad);
            resetBtn.style.display = 'block';
        } else if (event.target === resetBtn) {
            moveAnim = cancelAnimationFrame(moveAnim);
            moveRod =  cancelAnimationFrame(moveRoad);
            resetBtn.style.display = 'none';
            stop();
        }
    });
});