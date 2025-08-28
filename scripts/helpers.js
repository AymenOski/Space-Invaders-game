// helpers.js
import { BulletHitEnemyGetter, BulletHitEnemySetter, PlayerScoreGetter } from './bullet.js';

// Handle toggling pause with Escape key
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


// Pause the game if the screen is too small
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


// Handle bullet hitting an enemy and updating score
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
