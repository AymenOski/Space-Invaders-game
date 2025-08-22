import { EnemyManager } from './enemies.js';
import { MusicManager } from './music.js';
import { Player } from './player.js';

let game, animationId;

export class Game {
    constructor() {
        this.MusicManager = new MusicManager();
        this.MusicManager.play('mainTitle');

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
    if (game.Player.lives <= 0) {
        showGameMenu("GameOver");
        return;
    }

    game.updateEntities();
    if (game.Player.direction) { game.Player.movePlayer(game.Player.direction) }
    animationId = requestAnimationFrame(gameLoop);

}

let toggleMenu = false;
document.addEventListener('keydown', (event) => {
    if (game.Player.lives <= 0) return;
    if (event.code === "Escape") {
        if (toggleMenu) {
            showGameMenu("pause"); // true
        } else {
            showGameMenu("pause"); // false 
        }
        toggleMenu = !toggleMenu;
    }
});

const popup = document.getElementById("game-over-popup");
const replayBtn = document.getElementById("replay-btn");
const continueBtn = document.getElementById("continue-btn");
function showGameMenu(type) {
    game.Player.pauseMovement = true;
    if (type === "GameOver") {
        popup.querySelector("h2").textContent = "Game Over";
        continueBtn.style.display = "none";
    } else {
        popup.querySelector("h2").textContent = "Paused";
        continueBtn.style.display = "inline-block";
    }
    if (!toggleMenu) {
        popup.classList.remove("hidden");
        cancelAnimationFrame(animationId);
    } else {
        popup.classList.add("hidden");
        cancelAnimationFrame(animationId);
        game.Player.pauseMovement = false;
        gameLoop();
    }
}

replayBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    game.reset();
});

continueBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    gameLoop();
});

document.addEventListener('click', startMusic, { once: true });
document.addEventListener('keydown', startMusic, { once: true });

function startMusic() {
    game.MusicManager.play('mainTitle');
}

