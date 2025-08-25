import { EnemyManager } from './enemies.js';
import { MusicManager } from './music.js';
import { Player } from './player.js';
import { BulletHitEnemyGetter, BulletHitEnemySetter, PlayerScoreGetter } from './bullet.js';

let game, animationId;

export class Game {
    constructor() {
        this.MusicManager = new MusicManager();
        this.MusicManager.play('mainTitle');
        this.isPaused = false;

        this.EnemyManager = new EnemyManager(this.MusicManager);
        this.Player = new Player(this.MusicManager);
    }

    updateEntities() {
        this.EnemyManager.update();
        this.Player.update();

        if (this.EnemyManager.EnemiesDammagedThePlayer) {
            this.Player.dammage();
            this.EnemyManager.EnemiesDammagedThePlayer = false;
        }
    }

    reset() {
        cancelAnimationFrame(animationId);
        document.querySelectorAll('[class*="bullet__"]').forEach(b => b.remove());
        document.querySelector('.enemy-container').innerHTML = '';
        document.querySelector('.player-container').innerHTML = '';
        document.querySelector('.lives-container').innerHTML = 'Lives: 3';
        document.querySelector('.timer-container').innerHTML = 'Play_Time: 0.0';
        document.querySelector('.score-container').innerHTML = 'Score: 0';

        this.MusicManager.stopAllMusic();
        startGame();
    }
}


function startGame() {
    game = new Game();
    gameLoop();
}

startGame()


function gameLoop() {
    animationId = requestAnimationFrame(gameLoop);
    if (window.innerWidth < 320 || window.innerHeight < 320) {
        game.EnemyManager.isPaused = true;
        document.querySelector('.enemy-container').style.display = "none"
        document.querySelector('.player').style.display = "none"

    }else {
        game.EnemyManager.isPaused = false;
        document.querySelector('.enemy-container').style.display = "inline-block";
        document.querySelector('.player').style.display = "flex";
    }
    
    if (game.isPaused) return;

    if (BulletHitEnemyGetter() === true) {
        game.EnemyManager.EnemyCount--;
        BulletHitEnemySetter(false);
        game.Player.score += PlayerScoreGetter();
        const score = document.querySelector(".score-container");
        score.style.opacity = 0.4
        score.style.color = "green"
        setTimeout(() => {
            score.innerHTML = `Score: ${game.Player.score}`
            score.style.color = "white"
            score.style.opacity = 1

        }, 400);
    }

    if (game.Player.lives <= 0 || game.EnemyManager.Animation === -1) {
        if (game.EnemyManager.Animation === -1) {
            game.Player.lives = 1;
            game.Player.dammage();
        }
        game.Player.isPaused = true;
        game.isPaused = true;
        showGameMenu("GameOver");
        return;
    } else if (game.EnemyManager.EnemyCount <= 0) {
        game.Player.isPaused = true;
        game.isPaused = true;
        showGameMenu("Congrats");
        return;
    }

    game.updateEntities();
    if (game.Player.direction) {
        game.Player.movePlayer(game.Player.direction);
    }
}

document.addEventListener('keydown', (event) => {
    if (game.Player.lives <= 0) return;

    if (event.code === "Escape") {
        if (game.isPaused) {
            popup.classList.add("hidden");
            game.EnemyManager.isPaused = false;
            game.Player.isPaused = false;
            game.isPaused = false;
        } else {
            game.Player.isPaused = true;
            game.isPaused = true;
            showGameMenu("pause");
        }
    }
});

const popup = document.getElementById("game-over-popup");
const replayBtn = document.getElementById("replay-btn");
const continueBtn = document.getElementById("continue-btn");
function showGameMenu(type) {

    if (type === "Congrats") {
        popup.querySelector("h2").textContent = "Congrats You win!";
        continueBtn.style.display = "none";
    } else if (type === "GameOver") {
        popup.querySelector("h2").textContent = "Game Over";
        continueBtn.style.display = "none";
    if (window.innerWidth < 400 || window.innerHeight < 400) {
        document.querySelector('.enemy-container').style.opacity = 0
        document.querySelector('.player').style.opacity = 0
    }
    } else {
        popup.querySelector("h2").textContent = "Paused";
        continueBtn.style.display = "inline-block";
    }
    
    popup.classList.remove("hidden");
}

replayBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
        document.querySelector('.enemy-container').style.opacity = 1
        document.querySelector('.player').style.opacity = 1
    game.reset();
});

continueBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    game.EnemyManager.isPaused = false;
    game.Player.isPaused = false;
    game.isPaused = false;
});

document.addEventListener('click', startMusic, { once: true });
document.addEventListener('keydown', startMusic, { once: true });


document.addEventListener('keydown', (event) => {
    
    if (event.ctrlKey || event.metaKey) {
        if (event.key.toLowerCase() === 'r') {
            return;
        }
        event.preventDefault();
    }
});

document.addEventListener('wheel', (event) => {
    if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
    }
}, { passive: false });

function startMusic() {    
    game.MusicManager.play('mainTitle');
}