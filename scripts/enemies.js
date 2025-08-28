import { Bullet } from './bullet.js';

const Enemies = document.querySelector('.enemy-container');

// Represents an individual enemy
export class Enemy {
    constructor(Speed) {
        this.Speed = Speed;
        this.EnemyX = 0;
        this.EnemyY = 0;
        this.Element = null;
    }

    getElement() { return this.Element; }
    setElement(element) { this.Element = element; }
    setEnemyX(x) { this.EnemyX = x; }
    setEnemyY(y) { this.EnemyY = y; }

    createEnemyElement(type) {
        if (!this.Element) {
            this.Element = document.createElement('div');
            this.Element.classList.add('enemy');
            this.Element.classList.add(type);
        }
        return this.Element;
    }

    // Moves the enemy in the specified direction
    moveEnemy(direction) {
        if (direction === 'left') {
            this.EnemyX -= this.Speed;
        } else if (direction === 'right') {
            this.EnemyX += this.Speed;
        } else if (direction === 'down') {
            this.EnemyY += this.Speed + 0.2;
        }
        this.updatePosition();
    }

    // Updates the enemy's position on the screen with responsive scaling
    updatePosition() {
        if (!this.Element) return;
        const enemyContainer = document.querySelector('.enemy-container');
        const width = enemyContainer.offsetWidth;
        const height = enemyContainer.offsetHeight;
        const columns = 11;
        const rows = 5;
        const xSpacing = (width / 2) / columns + 5;
        const ySpacing = (height / 3) / rows + 5;
        // Scales enemy size based on screen width
        if (width < 450) {
            this.Element.style.transform = `translate3d(${this.EnemyX * xSpacing}px, ${this.EnemyY * ySpacing}px , 0px) scale(0.5)`;
        } else if (width < 600) {
            this.Element.style.transform = `translate3d(${this.EnemyX * xSpacing}px, ${this.EnemyY * ySpacing}px , 0px) scale(0.9)`;
        } else if (width < 800) {
            this.Element.style.transform = `translate3d(${this.EnemyX * xSpacing}px, ${this.EnemyY * ySpacing}px , 0px) scale(1.2)`;
        } else if (width <= 1200) {
            this.Element.style.transform = `translate3d(${this.EnemyX * xSpacing}px, ${this.EnemyY * ySpacing}px , 0px) scale(1.5)`;
        } else if (width > 1200) {
            this.Element.style.transform = `translate3d(${this.EnemyX * xSpacing}px, ${this.EnemyY * ySpacing}px , 0px) scale(2)`;
        }
    }

    // Toggles between enemy sprite types for animation
    updateEnemyType() {
        if (this.Element) {
            if (this.Element.classList.contains('E1__A1')) {
                this.Element.classList.remove('E1__A1');
                this.Element.classList.add('E1__A2');
            } else if (this.Element.classList.contains('E2__B1')) {
                this.Element.classList.remove('E2__B1');
                this.Element.classList.add('E2__B2');
            } else if (this.Element.classList.contains('E3__C1')) {
                this.Element.classList.remove('E3__C1');
                this.Element.classList.add('E3__C2');
            } else if (this.Element.classList.contains('E1__A2')) {
                this.Element.classList.remove('E1__A2');
                this.Element.classList.add('E1__A1');
            } else if (this.Element.classList.contains('E2__B2')) {
                this.Element.classList.remove('E2__B2');
                this.Element.classList.add('E2__B1');
            } else if (this.Element.classList.contains('E3__C2')) {
                this.Element.classList.remove('E3__C2');
                this.Element.classList.add('E3__C1');
            }
        }
    }
}

// Manages all enemies in the game
export class EnemyManager {
    constructor(musicManager) {
        // Initializes enemy array, movement flags, and grid
        this.Enemies = [];
        this.EnemiesDirection = 'right';
        this.EnemiesCanMoveX = true;
        this.EnemiesHaveMovedDown = false;
        this.EnemiesDammagedThePlayer = false;
        this.EnemyGrid = [
            ["E1", "E1", "E1", "E1", "E1", "E1", "E1", "E1", "E1", "E1", "E1"],
            ["E2", "E2", "E2", "E2", "E2", "E2", "E2", "E2", "E2", "E2", "E2"],
            ["E2", "E2", "E2", "E2", "E2", "E2", "E2", "E2", "E2", "E2", "E2"],
            ["E3", "E3", "E3", "E3", "E3", "E3", "E3", "E3", "E3", "E3", "E3"],
            ["E3", "E3", "E3", "E3", "E3", "E3", "E3", "E3", "E3", "E3", "E3"]
        ];
        this.musicManager = musicManager;
        this.EnemyBullets = [];
        this.spawnEnemies();
        this.Animation = 0;
        this.isPaused = false;
    }

    // Spawns enemies based on the grid layout
    spawnEnemies() {
        for (let i = 0; i < this.EnemyGrid.length; i++) {
            for (let j = 0; j < this.EnemyGrid[i].length; j++) {
                const newEnemy = new Enemy(0.07, null);
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
                const posX = j;
                const posY = i;
                newEnemy.EnemyX = posX;
                newEnemy.EnemyY = posY;
                newEnemy.updatePosition();
                this.Enemies.push(newEnemy);
                Enemies.appendChild(newEnemy.getElement());
            }
        }
    }

    // Randomly selects an enemy to shoot a bullet
    shoot() {
        const randomEnemy = this.Enemies[Math.floor(Math.random() * this.Enemies.length)].getElement().getBoundingClientRect();
        if (randomEnemy.y <= 114) {
            return;
        }
        const bullet = new Bullet(randomEnemy.left, randomEnemy.top);
        bullet.Element = bullet.createBulletElement(bullet.updateBulletType(Math.random()));
        this.EnemyBullets.push(bullet);
    }

    // Checks if enemies have reached the player's position
    checkIfEnemiesReachedPlayer() {
        if (this.isPaused) return;
        let maxBottom = Math.max(...this.Enemies.map(enemy => {
            return enemy.getElement().getBoundingClientRect().bottom;
        }));
        let playerTop = document.querySelector('.player').getBoundingClientRect().top;
        return maxBottom >= playerTop;
    }

    // Updates enemy movement, shooting, and collision detection
    update() {
        if (this.isPaused) return;
        const allEnemies = document.querySelectorAll('.enemy');
        if (allEnemies.length === 0) return;
        let minLeft = Infinity;
        let maxRight = -Infinity;
        allEnemies.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.left < minLeft) minLeft = rect.left;
            if (rect.right > maxRight) maxRight = rect.right;
        });
        this.Animation++;
        // Handles enemy movement direction changes
        if ((minLeft <= 0 || maxRight + 10 >= window.innerWidth) && !this.EnemiesHaveMovedDown) {
            this.EnemiesCanMoveX = false;
        }
        this.EnemiesHaveMovedDown = false;
        if (this.EnemiesCanMoveX) {
            this.Enemies.forEach((enemy) => {
                enemy.moveEnemy(this.EnemiesDirection);
                if (this.Animation % 50 === 0) {
                    enemy.updateEnemyType();
                }
            });
        }
        // Moves enemies down and changes direction if they hit screen edges
        if (minLeft <= 0 && !this.EnemiesCanMoveX) {
            this.Enemies.forEach((enemy) => {
                enemy.moveEnemy('down');
                if (this.checkIfEnemiesReachedPlayer()) {
                    this.Animation = -1;
                }
            });
            this.EnemiesHaveMovedDown = true;
            this.EnemiesCanMoveX = true;
            this.EnemiesDirection = 'right';
        }
        if (maxRight + 10 >= window.innerWidth && !this.EnemiesCanMoveX) {
            this.Enemies.forEach((enemy) => {
                enemy.moveEnemy('down');
                if (this.checkIfEnemiesReachedPlayer()) {
                    this.Animation = -1;
                }
            });
            this.EnemiesHaveMovedDown = true;
            this.EnemiesCanMoveX = true;
            this.EnemiesDirection = 'left';
        }
        // Randomly triggers enemy shooting
        if (Math.random() < (allEnemies.length > 25 ? 0.014 : 0.014 + 0.02)) {
            this.shoot();
        }
        // Updates enemy bullets and checks for player collision
        if (this.EnemyBullets.length > 0) {
            this.EnemyBullets.forEach((bullet) => {
                if (bullet.isColliding("Player")) {
                    this.EnemiesDammagedThePlayer = true;
                }
                if (bullet.getY() + 25 >= window.innerHeight) {
                    bullet.getElement().remove();
                    this.EnemyBullets = this.EnemyBullets.filter(b => b !== bullet);
                    return;
                }
                document.querySelector('.game-container').appendChild(bullet.getElement());
                bullet.moveBullet('down');
            });
        }
    }
}