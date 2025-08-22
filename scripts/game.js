import { EnemyManager } from './enemies.js';
import { MusicManager } from './music.js';
import { Player } from './player.js';

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
        document.querySelector('.timer-container').innerHTML = 'Play_Time: 0.00';
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

    if (game.isPaused) return;

    if (game.Player.lives <= 0) {
        game.isPaused = true;
        showGameMenu("GameOver");
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
            game.isPaused = false;
        } else {
            game.isPaused = true;
            showGameMenu("pause");
        }
    }
});

const popup = document.getElementById("game-over-popup");
const replayBtn = document.getElementById("replay-btn");
const continueBtn = document.getElementById("continue-btn");
function showGameMenu(type) {

    if (type === "GameOver") {
        popup.querySelector("h2").textContent = "Game Over";
        continueBtn.style.display = "none";
    } else {
        popup.querySelector("h2").textContent = "Paused";
        continueBtn.style.display = "inline-block";
    }

    popup.classList.remove("hidden");
}

replayBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    game.reset();
});

continueBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    game.isPaused = false;
});

document.addEventListener('click', startMusic, { once: true });
document.addEventListener('keydown', startMusic, { once: true });

function startMusic() {
    game.MusicManager.play('mainTitle');
}

