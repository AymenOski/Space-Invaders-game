import { Enemy , EnemyManager} from './enemies.js';
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

        if ((firstEnemyColumn.left <= 0 || lastEnemyColumn.right + 10 >= window.innerWidth) && !this.EnemyManager.EnemiesHaveMovedDown) {
            this.EnemyManager.EnemiesCanMoveX = false;
        }

        // moves enemies and make them shoot
        this.EnemyManager.EnemiesHaveMovedDown = false;
        if (this.EnemyManager.EnemiesCanMoveX) {
            this.EnemyManager.Enemies.forEach((enemy , index) => {
                enemy.moveEnemy(this.EnemyManager.EnemiesDirection);
                if (enemy.getEnemyX() % 35 === 0) {
                    enemy.updateEnemyType();
                    // enemy.shoot(enemy.getEnemyX(), enemy.getEnemyY());
                    if (Math.random() < 0.1) { // 10% chance to shoot
                        // enemy.shoot();
                    }
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
    }
}

const game = new Game();

function gameLoop(timestamp) {
    game.updateEntities(timestamp);
    // handleSounds();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

