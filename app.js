const player = document.getElementById('player');
const diddy = document.getElementById('diddy');
const gameArea = document.getElementById('game-area');


const speedPlayerInput = document.getElementById('speed-player');
const speedEnemyInput = document.getElementById('speed-enemy');
const bgImageInput = document.getElementById('bg-image');
const enemyImageInput = document.getElementById('enemy-image');
const valPlayer = document.getElementById('val-player');
const valEnemy = document.getElementById('val-enemy');

let playerPosition = { x: 100, y: 100 };
let diddyPosition = { x: 300, y: 300 };

let playerSpeed = parseInt(speedPlayerInput.value);
let diddySpeed = parseFloat(speedEnemyInput.value);

speedPlayerInput.addEventListener('input', (e) => {
    playerSpeed = parseInt(e.target.value);
    valPlayer.textContent = playerSpeed;
});

speedEnemyInput.addEventListener('input', (e) => {
    diddySpeed = parseFloat(e.target.value);
    valEnemy.textContent = diddySpeed;
});

bgImageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            gameArea.style.backgroundImage = `url('${event.target.result}')`;
        };
        reader.readAsDataURL(file);
    }
});

enemyImageInput.addEventListener('input', (e) => {
    diddy.style.backgroundImage = `url('${e.target.value}')`;
});

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (playerPosition.y > 0) playerPosition.y -= playerSpeed;
            break;
        case 'ArrowDown':
            if (playerPosition.y < gameArea.clientHeight - 50) playerPosition.y += playerSpeed;
            break;
        case 'ArrowLeft':
            if (playerPosition.x > 0) playerPosition.x -= playerSpeed;
            break;
        case 'ArrowRight':
            if (playerPosition.x < gameArea.clientWidth - 50) playerPosition.x += playerSpeed;
            break;
    }
    updatePositions();
});

function moveDiddy() {
    if (diddyPosition.x < playerPosition.x) {
        diddyPosition.x += diddySpeed;
    } else if (diddyPosition.x > playerPosition.x) {
        diddyPosition.x -= diddySpeed;
    }

    if (diddyPosition.y < playerPosition.y) {
        diddyPosition.y += diddySpeed;
    } else if (diddyPosition.y > playerPosition.y) {
        diddyPosition.y -= diddySpeed;
    }
    
    updatePositions();
    checkCollision();
}

function updatePositions() {
    player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`;
    diddy.style.transform = `translate(${diddyPosition.x}px, ${diddyPosition.y}px)`;
}

function checkCollision() {
    if (Math.abs(playerPosition.x - diddyPosition.x) < 50 &&
        Math.abs(playerPosition.y - diddyPosition.y) < 50) {
        
        alert('¡Diddy te atrapó!');
        playerPosition = { x: 100, y: 100 };
        diddyPosition = { x: 300, y: 300 };
    }
}

function gameLoop() {
    moveDiddy();
    requestAnimationFrame(gameLoop);
}

gameLoop();
