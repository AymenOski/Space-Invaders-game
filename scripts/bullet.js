let BulletHitEnemy = false, Score = 0;

export class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.Speed = 3;
        this.Element = null;
    }

    getElement() { return this.Element; }

    getX() { return this.x; }

    getY() { return this.y; }

    setX(x) { this.x = x; }

    setY(y) { this.y = y; }

    // Creates a bullet DOM element with a specified type
    createBulletElement(type) {
        if (!this.Element) {
            this.Element = document.createElement('div');
            this.Element.classList.add(type);
            this.Element.style.position = 'absolute';
        }
        return this.Element;
    }

    // Moves the bullet up or down based on direction
    moveBullet(direction) {
        if (direction === 'up') {
            this.y -= this.Speed + 7;
        } else if (direction === 'down') {
            this.y += this.Speed + 1;
        }
        this.updatePosition();
    }

    // Updates the bullet's position on the screen
    updatePosition() {
        if (this.Element) {
            this.Element.style.transform = `translate3d(${this.x - window.innerWidth / 2}px, ${this.y}px , 0px) scale(1.8)`;
        }
    }

    // Determines the bullet type based on a random value or player bullet
    updateBulletType(type) {
        if (type === -1) {
            return "player__bullet__type__1";
        }
        if (type < 0.33) {
            return "bullet__type__1";
        } else if (type < 0.66) {
            return "bullet__type__2";
        } else {
            return "bullet__type__3";
        }
    }

    // Checks for collision with enemies or the player
    isColliding(CollisionType) {
        if (CollisionType === "Enemy") {
            const enemyContainer = document.querySelector('.enemy-container');
            const enemies = enemyContainer.children;
            for (let i = 0; i < enemies.length; i++) {
                var enemiesRect = enemies[i].getBoundingClientRect();
                if (this.y <= enemiesRect.bottom && this.y >= enemiesRect.top && this.x >= enemiesRect.left && this.x <= enemiesRect.right) {
                    Score = 0;
                    if (this.Element) {
                        BulletHitEnemy = true;
                        let enemy = enemies[i];
                        // Awards points based on enemy type
                        if (enemy.classList.contains('E1__A1') || enemy.classList.contains('E1__A2')) {
                            Score += 150;
                        } else if (enemy.classList.contains('E2__B1') || enemy.classList.contains('E2__B2')) {
                            Score += 100;
                        } else if (enemy.classList.contains('E3__C1') || enemy.classList.contains('E3__C2')) {
                            Score += 50;
                        }
                        // Shows explosion effect and removes enemy
                        enemy.style.backgroundImage = "none";
                        enemy.innerHTML = `<img src="../Assets/Images/EnemyExplosion.png"/>`;
                        setTimeout(() => enemy.remove(), 400);
                        return true;
                    }
                }
            }
        } else if (CollisionType === "Player") {
            const PlayerRect = document.querySelector(".player").getBoundingClientRect();
            if (this.x >= PlayerRect.left && this.x <= PlayerRect.right && this.y >= PlayerRect.top && this.y <= PlayerRect.bottom) {
                return true;
            }
        }
        return false;
    }
}

// Returns whether a bullet hit an enemy
export function BulletHitEnemyGetter() {
    return BulletHitEnemy;
}

// Sets the bullet hit enemy flag
export function BulletHitEnemySetter(value) {
    BulletHitEnemy = value;
}

// Returns the player's score
export function PlayerScoreGetter() {
    return Score;
}