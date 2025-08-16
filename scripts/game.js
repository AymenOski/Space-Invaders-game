import { EnemyManager } from './enemies.js';
import { Player } from './player.js';

export class Game {
    constructor() {
        this.EnemyManager = new EnemyManager();
        this.EnemyManager.spawnEnemies();
        this.Player = new Player();
    }

    updateEntities() {        
        // Update all enemies          
        let firstEnemyColumn = this.EnemyManager.Enemies[0].getElement().getBoundingClientRect();
        let lastEnemyColumn = this.EnemyManager.Enemies[this.EnemyManager.Enemies.length - 1].getElement().getBoundingClientRect();
        this.EnemyManager.EnemiesX = firstEnemyColumn.left;
        this.EnemyManager.EnemiesY = firstEnemyColumn.top;
        console.log(`Enemies X: ${this.EnemyManager.EnemiesX}, Y: ${this.EnemyManager.EnemiesY}`);
        if ((firstEnemyColumn.left <= 0 || lastEnemyColumn.right + 10 >= window.innerWidth) && !this.EnemyManager.EnemiesHaveMovedDown) {
            this.EnemyManager.EnemiesCanMoveX = false;
        }

        // moves enemies and make them shoot
        this.EnemyManager.EnemiesHaveMovedDown = false;
        if (this.EnemyManager.EnemiesCanMoveX) {
            this.EnemyManager.Enemies.forEach((enemy) => {
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
        // shooting enemy and player bullets
        if (Math.random() < 0.02) {
            this.EnemyManager.chargingBullets();
        }
        if (this.EnemyManager.EnemyBullets.length > 0 ) {
            this.EnemyManager.EnemyBullets.forEach((bullet) => {
                if (bullet.getY() + firstEnemyColumn.top + 20 >= window.innerHeight) {
                    bullet.getElement().remove();
                    this.EnemyManager.EnemyBullets = this.EnemyManager.EnemyBullets.filter(b => b !== bullet);
                    return;
                }
                document.querySelector('.game-container').appendChild(bullet.getElement());
                bullet.moveBullet('down');
            });
        }
        if (this.Player.playerBullets.length > 0) {
            this.Player.playerBullets.forEach((bullet) => {
                if (bullet.getY() + innerHeight <= 0) {
                    bullet.getElement().remove();
                    this.Player.playerBullets = this.Player.playerBullets.filter(b => b !== bullet);
                    return;
                }
                document.querySelector('.game-container').append(bullet.getElement());
                bullet.moveBullet('up');
            });
        }
    }
}

const game = new Game();

function gameLoop() {
    game.updateEntities();
    if (game.Player.direction) { game.Player.movePlayer(game.Player.direction) }
    // handleSounds();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

