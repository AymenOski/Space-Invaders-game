import { Bullet } from './bullet.js';

const Enemies = document.querySelector('.enemy-container');

// Enemy class

export class Enemy {
    constructor(Speed) {
        this.Speed = Speed;
        this.EnemyX = 0;
        this.EnemyY = 0;
        this.Element = null; // This will hold the enemy element once created
    }

    getSpeed() { return this.Speed; }
    getElement() { return this.Element; }
    getEnemyX() { return this.EnemyX; }
    getEnemyY() { return this.EnemyY; }
    setSpeed(Speed) { this.Speed = Speed; }
    setElement(element) { this.Element = element; }
    setEnemyX(x) { this.EnemyX = x; }
    setEnemyY(y) { this.EnemyY = y; }

    createEnemyElement(type) {
        if (!this.Element) {
            this.Element = document.createElement('div');
            this.Element.classList.add('enemy');
            this.Element.classList.add(type);
            // this.Element.style.left = `${window.innerWidth / 4 }px`;
            // this.Element.style.top = `${50}px`;

        }
        return this.Element;
    }

    moveEnemy(direction) {
        if (direction === 'left') {
            this.EnemyX -= this.Speed;
        } else if (direction === 'right') {
            this.EnemyX += this.Speed;
        } else if (direction === 'down') {
            this.EnemyY += this.Speed ;
        }
        this.updatePosition();
    }





    updatePosition() {
        if (!this.Element) return;
        const enemyContainer = document.querySelector('.enemy-container')
        const width = enemyContainer.offsetWidth
        const height = enemyContainer.offsetHeight
        const columns = 11
        const rows = 5

        const xSpacing = (width / 2) / columns + 5
        const ySpacing = (height / 3) / rows + 5


        if (width < 600) {
            // enemyContainer.style.background = "blue"
            this.Element.style.transform = `translate3d(${this.EnemyX * xSpacing}px, ${this.EnemyY * ySpacing}px , 0px) scale(0.5)`
        }
        else if (width < 800) {
            // enemyContainer.style.background = "red"
            this.Element.style.transform = `translate3d(${this.EnemyX * xSpacing}px, ${this.EnemyY * ySpacing}px , 0px) scale(1)`
        } else if (width < 1200) {
            // enemyContainer.style.background = "gray"
            this.Element.style.transform = `translate3d(${this.EnemyX * xSpacing}px, ${this.EnemyY * ySpacing}px , 0px) scale(1.5)`
        } else if (width > 1200) {
            // enemyContainer.style.background = "green"
            this.Element.style.transform = `translate3d(${this.EnemyX * xSpacing}px, ${this.EnemyY * ySpacing}px , 0px) scale(2)`
        }

    }

    // updateEnemyType() {
    //     if (this.Element) {
    //         if (this.Element.classList.contains('E1__A1')) {
    //             this.Element.classList.remove('E1__A1');
    //             this.Element.classList.add('E1__A2');
    //         } else if (this.Element.classList.contains('E2__B1')) {
    //             this.Element.classList.remove('E2__B1');
    //             this.Element.classList.add('E2__B2');
    //         } else if (this.Element.classList.contains('E3__C1')) {
    //             this.Element.classList.remove('E3__C1');
    //             this.Element.classList.add('E3__C2');
    //         } else if (this.Element.classList.contains('E1__A2')) {
    //             this.Element.classList.remove('E1__A2');
    //             this.Element.classList.add('E1__A1');
    //         } else if (this.Element.classList.contains('E2__B2')) {
    //             this.Element.classList.remove('E2__B2');
    //             this.Element.classList.add('E2__B1');
    //         } else if (this.Element.classList.contains('E3__C2')) {
    //             this.Element.classList.remove('E3__C2');
    //             this.Element.classList.add('E3__C1');
    //         }
    //     }
    // }
}

// EnemyManager class


export class EnemyManager {
    constructor() {
        this.EnemyCount = 55;
        this.Enemies = [];
        this.EnemiesX = 0;
        this.EnemiesY = 0;
        this.EnemiesDirection = 'right';
        this.EnemiesCanMoveX = true;
        this.EnemiesHaveMovedDown = false;
        this.EnemiesDammagedThePlayer= false;
        this.EnemyGrid = [
            ["E1", "E1", "E1", "E1", "E1", "E1", "E1", "E1", "E1", "E1", "E1"],
            ["E2", "E2", "E2", "E2", "E2", "E2", "E2", "E2", "E2", "E2", "E2"],
            ["E2", "E2", "E2", "E2", "E2", "E2", "E2", "E2", "E2", "E2", "E2"],
            ["E3", "E3", "E3", "E3", "E3", "E3", "E3", "E3", "E3", "E3", "E3"],
            ["E3", "E3", "E3", "E3", "E3", "E3", "E3", "E3", "E3", "E3", "E3"]
        ];
        this.EnemyBullets = [];
        this.spawnEnemies()
        this.Animation = 0;
    }

    spawnEnemies() {
        for (let i = 0; i < this.EnemyGrid.length; i++) {
            for (let j = 0; j < this.EnemyGrid[i].length; j++) {
                // const newEnemy = this.level === 1 ? new Enemy(1, false) : new Enemy(2, false);
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
                newEnemy.setEnemyX(posX);
                newEnemy.setEnemyY(posY);

                newEnemy.updatePosition();

                this.Enemies.push(newEnemy);
                Enemies.appendChild(newEnemy.getElement());
            }
        }
    }

    shoot() {
        const randomEnemy = this.Enemies[Math.floor(Math.random() * this.Enemies.length)].getElement().getBoundingClientRect();
        if(randomEnemy.y <= 114 ){
             return;
        }
        
        const bullet = new Bullet(randomEnemy.left, randomEnemy.top);
        bullet.Element = bullet.createBulletElement(bullet.updateBulletType(Math.random()));
        this.EnemyBullets.push(bullet);
    }

    update() {
        // Update all enemies
        const T = document.querySelectorAll('[class*="E1__"]')
        let firstEnemyColumn , lastEnemyColumn;
        
        if (T.length > 1 ){
            firstEnemyColumn = T[0].getBoundingClientRect();
            lastEnemyColumn = T[T.length-1].getBoundingClientRect()
        }else {
            firstEnemyColumn = T[0].getBoundingClientRect();    
            lastEnemyColumn = T[0].getBoundingClientRect();
        }        
        
        
        this.EnemiesX = firstEnemyColumn.left;
        this.EnemiesY = firstEnemyColumn.top;

        this.Animation++;

        if ((firstEnemyColumn.left <= 0 || lastEnemyColumn.right + 10 >= window.innerWidth) && !this.EnemiesHaveMovedDown) {
            this.EnemiesCanMoveX = false;
        }

        // moves enemies and make them shoot
        this.EnemiesHaveMovedDown = false;
        if (this.EnemiesCanMoveX) {

            this.Enemies.forEach((enemy) => {

                enemy.moveEnemy(this.EnemiesDirection);
                if (this.Animation % 50 === 0) {
                    // enemy.updateEnemyType();
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
        // shooting enemy and player bullets
        
        if (Math.random() <  (document.querySelector(".enemy-container").children.length > 25 ? 0.014 : 0.014 + 0.02)) {
            this.shoot();
        }

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
