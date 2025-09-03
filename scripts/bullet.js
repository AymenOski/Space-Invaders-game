let BulletHitEnemy = false , Score = 0;

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

    createBulletElement(type) {
        if (!this.Element) {
            this.Element = document.createElement('div');
            this.Element.classList.add(type);
            this.Element.style.position = 'absolute';
        }
        return this.Element;
    }

    moveBullet(direction) {
        if (direction === 'up') {
            this.y -= this.Speed + 7;
        } else if (direction === 'down') {
            this.y += this.Speed + 1;
        }
        this.updatePosition();
    }

    updatePosition() {
        if (this.Element) {
            this.Element.style.transform = `translate3d(${this.x - window.innerWidth / 2}px, ${this.y}px , 0px) scale(1.8)`;
        }
    }

    updateBulletType(type) {
        if (type === -1) {
            return "player__bullet__type__1";
        }
        if (type < 0.33) {
            return "bullet__type__1"
        } else if (type < 0.66) {
            return "bullet__type__2"
        } else {
            return "bullet__type__3"
        }
    }

    isColliding(CollisionType) {
        if (CollisionType === "Enemy") {
            const enemyContainer = document.querySelector('.enemy-container');
            const enemies = enemyContainer.children;
            for (let i = 0; i < enemies.length ; i++) {
                var enemiesRect = enemies[i].getBoundingClientRect();
                if (this.y <= enemiesRect.bottom && this.y >= enemiesRect.top && this.x >= enemiesRect.left && this.x <= enemiesRect.right) {
                    Score = 0;
                    if (this.Element) {
                        BulletHitEnemy = true;
                        let enemy = enemies[i];
                        if (enemy.classList.contains('E1__A1') || enemy.classList.contains('E1__A2')) {
                            Score += 150;
                        }else if (enemy.classList.contains('E2__B1') || enemy.classList.contains('E2__B2')) {
                            Score += 100;
                        }else if (enemy.classList.contains('E3__C1') || enemy.classList.contains('E3__C2')) {
                            Score += 50;
                        }
                        enemy.style.backgroundImage = "none";
                        enemy.innerHTML = `<img src="../Assets/Images/EnemyExplosion.png"/>`;
                        setTimeout(() => enemy.remove(), 400);
                        return true;
                    }
                }
            }

        } else if (CollisionType === "Player") {
            const PlayerRect = document.querySelector(".player").getBoundingClientRect()
            if (this.x >= PlayerRect.left && this.x <= PlayerRect.right && this.y >= PlayerRect.top && this.y <= PlayerRect.bottom) {
                return true;
            }
        }
        return false;
    }
}

export function BulletHitEnemyGetter() {
    return BulletHitEnemy;
}

export function BulletHitEnemySetter(value) {
    BulletHitEnemy = value;
}

export function PlayerScoreGetter(){
    return Score;
}
