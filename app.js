(() => {
    let canvas = document.querySelector('#canvas');
    let snake = document.querySelector('#snake');
    let scoreKeeper = document.querySelector('#score-keeper');

    const UP = 'ArrowUp';
    const RIGHT = 'ArrowRight';
    const DOWN = 'ArrowDown';
    const LEFT = 'ArrowLeft';

    const CANVAS_SIZE = 640; // Size of the canvas in pixels
    const SNAKE_SIZE = CANVAS_SIZE/20; // Size of the snake in pixels

    let start, previousTimestamp;
    let done = false;


    document.addEventListener('keydown', (e) => {
      if([UP, RIGHT, DOWN, LEFT].includes(e.key)) {
        requestAnimationFrame((timestamp) => update(timestamp, e.key));
      }
    });

    function update(timestamp, key) {
        if(start === undefined) {
          start = timestamp;
        }

        let deltaTime = timestamp - start;

        if(previousTimestamp !== timestamp) {
          let limit = CANVAS_SIZE - SNAKE_SIZE - 16; // Size of the canvas minus size of the snake minus the size of the border in pixels
          let count = Math.min(0.1 * deltaTime, limit);
          
          switch (key) {
            case UP:                      
                snake.style.transform = `translateY(${-1 * count}px)`;
                break;
            case RIGHT:
                snake.style.transform = `translateX(${count}px)`;
                break;
            case DOWN:
                snake.style.transform = `translateY(${count}px)`;
                break;
            case LEFT:
                snake.style.transform = `translateX(${-1 * count}px)`;
                break;
          }

          if(count === limit) done = true;
        }

        // requestAnimationFrame(step);

        if(deltaTime < 2000) {
          previousTimestamp = timestamp;

          if(!done) {
            requestAnimationFrame((timestamp) => update(timestamp, key));
          }
        }
    }
})();