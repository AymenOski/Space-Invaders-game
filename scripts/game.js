import { EnemyManager } from './enemies.js';
import { MusicManager } from './music.js';
import { Player } from './player.js';
import { keys, setupInput } from './input.js';
import { showGameMenu, setupMenu, hideMenu } from "./menu.js";
import { handlePauseToggle, handleSmallScreenPause, handleBulletHit, PreventDefaults } from './helpers.js';
import { StoryManager, setupStoryListener } from './story.js';


let game, animationId, level = 0;
let enemyContainer, playerContainer, livesContainer, timerContainer, scoreContainer;


export class Game {
    constructor() {
        this.MusicManager = new MusicManager();
        this.isPaused = false;
        this.EnemyManager = new EnemyManager(this.MusicManager, ++level);
        this.Player = new Player(this.MusicManager);
        this.StoryManager = new StoryManager(this, this.MusicManager);
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
        level = 0
        currentSceneTemp = 0;
        this.MusicManager.stopAllTracks();
        startGame(0);
    }
}

let tempPlayer, currentSceneTemp = 0;
// Starts a new game instance and plays main background music
function startGame(storyScene = 0) {

    if (level > 0) {

        document.querySelector('.player').remove();
        document.querySelectorAll('[class*="bullet__"]').forEach(b => b.remove());
        game.MusicManager.stopAllTracks(); // stop the music before getting garbage collected
        tempPlayer = game.Player;
        currentSceneTemp = game.StoryManager.currentScene;
        game = new Game();
        game.StoryManager.currentScene = currentSceneTemp;
        game.Player = tempPlayer;
        game.Player.x = 0;
    } else {
        game = new Game();
    }
    game.StoryManager.showStory(storyScene);

    gameLoop();
}

let lastToggleTime = 0;
// Main game loop that runs each animation frame
function gameLoop(timeStamp) {
    animationId = requestAnimationFrame(gameLoop);

    if (game.StoryManager.isShowingStory) return;
    if (document.querySelectorAll('.enemy').length <= 0 && level < 3) {
        cancelAnimationFrame(animationId);
        startGame(game.StoryManager.currentScene);
        return;
    }

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
    if (game.Player.lives <= 0 || game.EnemyManager.Animation === -1) {
        game.StoryManager.currentScene = 4;
        game.StoryManager.showStory(4);

        return;
    }
    if (document.querySelectorAll('.enemy').length <= 0 && level === 3) {
        game.StoryManager.currentScene = 3;
        game.StoryManager.showStory(3);
        return;
    }

    // Update all entities each frame
    game.updateEntities();
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

    const unlockAudio = () => {
        if (game && game.MusicManager) {
            game.MusicManager.unlockAudio();
        }
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
    };

    window.addEventListener('click', unlockAudio);
    window.addEventListener('keydown', unlockAudio);

    setupStoryListener(() => game.StoryManager.hideStory());
    // attach music starters now (game is defined)
    startGame(); // starts the loop.
});

