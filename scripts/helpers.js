import { BulletHitEnemyGetter, BulletHitEnemySetter, PlayerScoreGetter } from './bullet.js';

// Toggles game pause state when Escape is pressed
export function handlePauseToggle(game, keys, hideMenu, showGameMenu) {
    if (!keys.pause) return;
    if (game.isPaused) {
        hideMenu();
        game.isPaused = false;
        game.Player.isPaused = false;
        game.EnemyManager.isPaused = false;
    } else {
        game.isPaused = true;
        game.Player.isPaused = true;
        game.EnemyManager.isPaused = true;
        showGameMenu("pause");
    }
    keys.pause = false;
}

// Pauses the game and hides elements on small screens
export function handleSmallScreenPause(game, enemyContainer, playerContainer) {
    if (window.innerWidth < 320 || window.innerHeight < 320) {
        game.EnemyManager.isPaused = true;
        enemyContainer.style.display = "none";
        playerContainer.style.display = "none";
    } else {
        if (!game.isPaused) {
            game.EnemyManager.isPaused = false;
            enemyContainer.style.display = "inline-block";
            playerContainer.style.display = "flex";
        }
    }
}

// Updates score and UI when a bullet hits an enemy
export function handleBulletHit(game, scoreContainer) {
    if (BulletHitEnemyGetter() === true) {
        BulletHitEnemySetter(false);
        game.Player.score += PlayerScoreGetter();
        scoreContainer.style.opacity = 0.4;
        scoreContainer.style.color = "green";
        setTimeout(() => {
            scoreContainer.textContent = `Score: ${game.Player.score}`;
            scoreContainer.style.color = "white";
            scoreContainer.style.opacity = 1;
        }, 400);
    }
}

// Prevents default browser actions for certain key combinations
export function PreventDefaults() {
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
}