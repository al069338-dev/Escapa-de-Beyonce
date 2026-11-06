const player = document.getElementById('player');
const beyonce = document.getElementById('beyonce');
const gameArea = document.getElementById('game-area');


const speedPlayerInput = document.getElementById('speed-player');
const speedEnemyInput = document.getElementById('speed-enemy');
const bgImageInput = document.getElementById('bg-image');
const enemyImageInput = document.getElementById('enemy-image');
const valPlayer = document.getElementById('val-player');
const valEnemy = document.getElementById('val-enemy');

let playerPosition = { x: 100, y: 100 };
let beyoncePosition = { x: 300, y: 300 };

let playerSpeed = parseInt(speedPlayerInput.value);
let beyonceSpeed = parseFloat(speedEnemyInput.value);

speedPlayerInput.addEventListener('input', (e) => {
    playerSpeed = parseInt(e.target.value);
    valPlayer.textContent = playerSpeed;
});

speedEnemyInput.addEventListener('input', (e) => {
    beyonceSpeed = parseFloat(e.target.value);
    valEnemy.textContent = beyonceSpeed;
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
    beyonce.style.backgroundImage = `url('${e.target.value}')`;
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

function moveBeyonce() {
    if (beyoncePosition.x < playerPosition.x) {
        beyoncePosition.x += beyonceSpeed;
    } else if (beyoncePosition.x > playerPosition.x) {
        beyoncePosition.x -= beyonceSpeed;
    }

    if (beyoncePosition.y < playerPosition.y) {
        beyoncePosition.y += beyonceSpeed;
    } else if (beyoncePosition.y > playerPosition.y) {
        beyoncePosition.y -= beyonceSpeed;
    }
    
    updatePositions();
    checkCollision();
}

function updatePositions() {
    player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`;
    beyonce.style.transform = `translate(${beyoncePosition.x}px, ${beyoncePosition.y}px)`;
}

function checkCollision() {
    if (Math.abs(playerPosition.x - beyoncePosition.x) < 50 &&
        Math.abs(playerPosition.y - beyoncePosition.y) < 50) {
        
        alert('¡Beyonce te atrapó!');
        playerPosition = { x: 100, y: 100 };
        beyoncePosition = { x: 300, y: 300 };
    }
}

function gameLoop() {
    moveBeyonce();
    requestAnimationFrame(gameLoop);
}

gameLoop();