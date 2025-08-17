import { Bullet } from './bullet.js';

export class Player {
    constructor() {
        this.score = 0;
        this.lives = 3;
        this.Speed = 3
        this.x = 0;
        this.direction = null;
        this.playerBullets = [];
        this.lastShotTime = 0;
        this.shootCooldown = 700;
        this.createPlayer()
        this.trackDirection()

        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.movePlayer("left");
                    break;
                case "ArrowRight":
                    this.movePlayer("right");
                    break;
                case " ":
                    this.handleShoot();
                    break;
                default:
                    return;
            }
        });

    }

    getLives() { return this.lives }
    getScore() { return this.score }
    getX() { return this.x }
    // seters 
    setLives(lives) { this.lives = lives }
    setScore(score) { this.score = score }
    setX(x) { this.x = x }

    createPlayer() {
        const p = document.createElement("div");
        p.classList.add("player");
        const container = document.querySelector(".player-container");
        container.appendChild(p);
    }

    trackDirection() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
                this.direction = "left";
            } else if (event.key === "ArrowRight") {
                this.direction = "right";
            }
        });
        document.addEventListener("keyup", () => {
            this.direction = null;
        });
    }

    reset() { this.score = 0; this.lives = 3; this.x = 0; }

    dammage() {
        this.lives--;
        if (this.lives < 0) {
            this.lives = 0;
        }
    }

    handleShoot() {
        const now = performance.now();
        if (now - this.lastShotTime >= this.shootCooldown) {
            this.shoot();
            this.lastShotTime = now;
        }
    }

    shoot() {
        const p = document.querySelector(".player");
        const container = document.querySelector(".game-container");
        const containerRect = container.getBoundingClientRect();
        const playerRect = p.getBoundingClientRect();
        const bulletX = playerRect.left - containerRect.left + p.offsetWidth / 2;
        const bullet = new Bullet(bulletX, window.innerHeight - p.offsetWidth);
        bullet.Element = bullet.createBulletElement(bullet.updateBulletType(-1));
        this.playerBullets.push(bullet);
        document.querySelector('.game-container').appendChild(bullet.getElement());
    }

    movePlayer(direction) {
        const p = document.querySelector(".player");
        const container = document.querySelector(".player-container");
        const maxX = (container.offsetWidth / 2) - p.offsetWidth / 2;
        const minX = -(container.offsetWidth / 2) + p.offsetWidth / 2;


        if (direction === "left" && this.x - this.Speed > minX) {
            this.x -= this.Speed;
        } else if (direction === "right" && this.x + this.Speed < maxX) {
            this.x += this.Speed;
        }

        p.style.transform = `translate3d(${this.x}px, 0, 0)`;
    }

    update() {
        if (this.playerBullets.length > 0) {
            this.playerBullets.forEach((bullet) => {
                if (bullet.getY() <= 0) {
                    bullet.getElement().remove();
                    this.playerBullets = this.playerBullets.filter(b => b !== bullet);
                    return;
                }
                document.querySelector('.game-container').append(bullet.getElement());
                bullet.moveBullet('up');

            });
        }
    }

}