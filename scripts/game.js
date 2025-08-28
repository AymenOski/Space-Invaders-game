import { EnemyManager } from './enemies.js';
import { MusicManager } from './music.js';
import { Player } from './player.js';
import { keys, setupInput } from './input.js';
import { showGameMenu, setupMenu, hideMenu } from "./menu.js";
import { handlePauseToggle, handleSmallScreenPause, handleBulletHit , PreventDefaults} from './helpers.js';


let game, animationId;
let enemyContainer, playerContainer, livesContainer, timerContainer, scoreContainer;


export class Game {
    constructor() {
        this.MusicManager = new MusicManager();
        this.isPaused = false;
        this.EnemyManager = new EnemyManager(this.MusicManager);
        this.Player = new Player(this.MusicManager);
    }

    // Updates all entities (enemies and player) each frame
    updateEntities() {
        this.EnemyManager.update();
        this.Player.update();

        // Handle when enemies damage the player
        if (this.EnemyManager.EnemiesDammagedThePlayer) {
            this.Player.dammage();
            this.EnemyManager.EnemiesDammagedThePlayer = false;
        }
    }

    // Reset the game state and start a new game
    reset() {
        cancelAnimationFrame(animationId);
        document.querySelectorAll('[class*="bullet__"]').forEach(b => b.remove());
        enemyContainer.innerHTML = '';
        playerContainer.innerHTML = '';
        livesContainer.textContent = 'Lives: 3';
        timerContainer.textContent = 'Play_Time: 0.0';
        scoreContainer.textContent = 'Score: 0';
        this.MusicManager.stopAllMusic();
        startGame();
    }
}





// Starts a new game instance and plays main background music
function startGame() {
    game = new Game();
    game.MusicManager.play('mainTitle');
    gameLoop();
}


function endGame(reason) {
    game.Player.isPaused = true;
    game.isPaused = true;

    // if enemies reached bottom, make player show the death effect once
    if (reason === "GameOver" && game.EnemyManager.Animation === -1) {
        game.Player.lives = 1;
        game.Player.dammage();
    }

    showGameMenu(reason);
}


let lastToggleTime = 0;
// Main game loop that runs each animation frame
function gameLoop(timeStamp) {
    animationId = requestAnimationFrame(gameLoop);
    
    // Handle toggling pause with Escape key with a throttle of 300ms
    if (keys.pause && timeStamp - lastToggleTime > 300) {
        handlePauseToggle(game, keys, hideMenu, showGameMenu);
        lastToggleTime = timeStamp;
    }
    // Pause the game if the screen is too small
    handleSmallScreenPause(game, enemyContainer, playerContainer);
    // Handle bullet hitting an enemy and updating score
    handleBulletHit(game, scoreContainer);

    if (game.isPaused) return;

    // Check for game over condition or victory
    if (game.Player.lives <= 0 || game.EnemyManager.Animation === -1) return endGame("GameOver");
    if (document.querySelectorAll('.enemy').length <= 0) {
        return endGame("Congrats");
    }
    
    // Update all entities each frame
    game.updateEntities();
}



function startMusic() {
    if (!game) return;
    game.MusicManager.play('mainTitle');
}

document.addEventListener("DOMContentLoaded", () => {
    enemyContainer = document.querySelector('.enemy-container');
    playerContainer = document.querySelector('.player-container');
    livesContainer = document.querySelector('.lives-container');
    timerContainer = document.querySelector('.timer-container');
    scoreContainer = document.querySelector('.score-container');

    setupInput(); // init input listeners
    PreventDefaults(); // prevent default browser actions for some keys
    
    
    // simple callbacks for Menu BTN ( replay and continue 
    setupMenu(() => game.reset(), () => {
        game.isPaused = false;
        game.Player.isPaused = false;
        game.EnemyManager.isPaused = false;
    });
    startGame(); // starts the loop.
    
    // start main title upon user-interaction
    document.addEventListener('click', startMusic, { once: true });
    document.addEventListener('keydown', startMusic, { once: true });
});