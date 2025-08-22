import { EnemyManager } from './enemies.js';
import { MusicManager } from './music.js';
import { Player } from './player.js';

let game ,animationId , GameMenuCheck;

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
        showGameMenu(gameOver);
        return;
    }

    game.updateEntities();
    if (game.Player.direction) { game.Player.movePlayer(game.Player.direction) }
    animationId = requestAnimationFrame(gameLoop);

}

const popup = document.getElementById("game-over-popup");
const replayBtn = document.getElementById("replay-btn");
const continueBtn = document.getElementById("continue-btn");

function showGameMenu(type) {
    popup.classList.remove("hidden");
    if (type === 'gameOver') {
        cancelAnimationFrame(animationId);
    }
}

replayBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    game.reset();
});

continueBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    document.querySelector('.lives-container').innerHTML = 'Lives: 1';
    gameLoop();
});

document.addEventListener('click', startMusic, { once: true });
document.addEventListener('keydown', startMusic, { once: true });

function startMusic() {
    game.MusicManager.play('mainTitle');
}

document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
        showGameMenu();
    }
});
