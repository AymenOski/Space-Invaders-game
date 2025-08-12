import { Enemy } from './enemy.js';
// import { Player } from './player.js';

const Enemies = document.querySelector('.enemy-container');


export class Game {
    constructor(EnemyCount = 55) {
        this.EnemyCount = EnemyCount;
        this.EnemiesDirection = 'right'; // Initial direction of enemies
        this.EnemiesCanMoveX = true;
        this.EnemiesHaveMovedDown = false;
        this.EnemyGrid = [
            ["E1", "E1", "E1", "E1", "E1", "E1", "E1", "E1", "E1", "E1", "E1"],
            ["E2", "E2", "E2", "E2", "E2", "E2", "E2", "E2", "E2", "E2", "E2"],
            ["E2", "E2", "E2", "E2", "E2", "E2", "E2", "E2", "E2", "E2", "E2"],
            ["E3", "E3", "E3", "E3", "E3", "E3", "E3", "E3", "E3", "E3", "E3"],
            ["E3", "E3", "E3", "E3", "E3", "E3", "E3", "E3", "E3", "E3", "E3"]
        ];
        this.Enemies = [];
    }
    // Getters
    getEnemyCount() {
        return this.EnemyCount;
    }
    // Setters
    setEnemyCount(EnemyCount) {
        this.EnemyCount = EnemyCount;
    }
    // Methods 
    spawnEnemies() {
        for (let i = 0; i < this.EnemyGrid.length; i++) {
            for (let j = 0; j < this.EnemyGrid[i].length; j++) {
                // const newEnemy = this.level === 1 ? new Enemy(1, false) : new Enemy(2, false);
                const newEnemy = new Enemy(2, null);
                var enemyElement = undefined;
                switch (this.EnemyGrid[i][j]) {
                    case "E1":
                        enemyElement = newEnemy.createEnemyElement("E1__A1");
                        break;
                    case "E2":
                        enemyElement = newEnemy.createEnemyElement("E2__B1");
                        break;
                    case "E3":
                        enemyElement = newEnemy.createEnemyElement("E3__C1");
                        break;
                    default:
                        continue;
                }
                newEnemy.setElement(enemyElement);

                const posX = j * 70;
                const posY = i * 55;
                newEnemy.setEnemyX(posX);
                newEnemy.setEnemyY(posY);

                newEnemy.updatePosition();

                this.Enemies.push(newEnemy);
                Enemies.appendChild(newEnemy.getElement());
            }
        }
    }
    // Update
    updateEntities(timestamp) {
        // Update all enemies          
        let firstEnemyColumn = this.Enemies[0].getElement().getBoundingClientRect();
        let lastEnemyColumn = this.Enemies[this.Enemies.length - 1].getElement().getBoundingClientRect();

        if ((firstEnemyColumn.left <= 0 || lastEnemyColumn.right + 10 >= window.innerWidth) && !this.EnemiesHaveMovedDown) {
            this.EnemiesCanMoveX = false;
        }

        this.EnemiesHaveMovedDown = false;
        if (this.EnemiesCanMoveX) {
            this.Enemies.forEach((enemy) => {
                enemy.moveEnemy(this.EnemiesDirection);
                if (enemy.getEnemyX() % 35 === 0) {
                    enemy.updateEnemyType();
                }
            })
        }
        if (firstEnemyColumn.left <= 0 && !this.EnemiesCanMoveX) {
            this.Enemies.forEach((enemy) => {
                enemy.moveEnemy('down');
            })

            this.EnemiesHaveMovedDown = true;
            this.EnemiesCanMoveX = true;
            this.EnemiesDirection = 'right';
        }

        if (lastEnemyColumn.right + 10 >= window.innerWidth && !this.EnemiesCanMoveX) {
            this.Enemies.forEach((enemy) => {
                enemy.moveEnemy('down');
            })

            this.EnemiesHaveMovedDown = true;
            this.EnemiesCanMoveX = true;
            this.EnemiesDirection = 'left';
        }
    }
}

const music = document.getElementById('gameMusic');
music.play();
const game = new Game();
game.spawnEnemies();


function gameLoop(timestamp) {
    game.updateEntities(timestamp);
    // handleSounds();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

