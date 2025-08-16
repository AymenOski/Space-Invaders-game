import { EnemyManager } from './enemies.js';
import { Player } from './player.js';

export class Game {
    constructor() {
        this.EnemyManager = new EnemyManager();
        this.EnemyManager.spawnEnemies();
        this.Player = new Player();
    }

    updateEntities(timestamp) {
        // Update all enemies          
        let firstEnemyColumn = this.EnemyManager.Enemies[0].getElement().getBoundingClientRect();
        let lastEnemyColumn = this.EnemyManager.Enemies[this.EnemyManager.Enemies.length - 1].getElement().getBoundingClientRect();
        this.EnemyManager.EnemiesX = firstEnemyColumn.left;
        this.EnemyManager.EnemiesY = firstEnemyColumn.top;

        if ((firstEnemyColumn.left <= 0 || lastEnemyColumn.right + 10 >= window.innerWidth) && !this.EnemyManager.EnemiesHaveMovedDown) {
            this.EnemyManager.EnemiesCanMoveX = false;
        }

        // moves enemies and make them shoot
        this.EnemyManager.EnemiesHaveMovedDown = false;
        if (this.EnemyManager.EnemiesCanMoveX) {
            this.EnemyManager.Enemies.forEach((enemy, index) => {
                enemy.moveEnemy(this.EnemyManager.EnemiesDirection);
                if (enemy.getEnemyX() % 35 === 0) {
                    enemy.updateEnemyType();
                }
            })
        }
        if (firstEnemyColumn.left <= 0 && !this.EnemyManager.EnemiesCanMoveX) {
            this.EnemyManager.Enemies.forEach((enemy) => {
                enemy.moveEnemy('down');
            })

            this.EnemyManager.EnemiesHaveMovedDown = true;
            this.EnemyManager.EnemiesCanMoveX = true;
            this.EnemyManager.EnemiesDirection = 'right';
        }

        if (lastEnemyColumn.right + 10 >= window.innerWidth && !this.EnemyManager.EnemiesCanMoveX) {
            this.EnemyManager.Enemies.forEach((enemy) => {
                enemy.moveEnemy('down');
            })

            this.EnemyManager.EnemiesHaveMovedDown = true;
            this.EnemyManager.EnemiesCanMoveX = true;
            this.EnemyManager.EnemiesDirection = 'left';
        }
        if (Math.random() < 0.05) {
            this.EnemyManager.chargingBullets();
        }
        if (this.EnemyManager.EnemyBullets.length > 0) {
            this.EnemyManager.EnemyBullets.forEach((bullet) => {
                if (bullet.getY() >= window.innerHeight) {
                    bullet.getElement().remove();
                    this.EnemyManager.EnemyBullets = this.EnemyManager.EnemyBullets.filter(b => b !== bullet);
                    return;
                }
                document.querySelector('.game-container').appendChild(bullet.getElement());
                bullet.moveBullet('down');
            });
        }
    }
}

const game = new Game();

function gameLoop(timestamp) {
    game.updateEntities(timestamp);
    if (game.Player.direction) { game.Player.movePlayer(game.Player.direction) }
    // handleSounds();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

