import { Bullet } from './bullet.js';

export class Player {
    constructor(musicManager) {
        this.score = 0;
        this.lives = 3;
        this.Speed = 6
        this.x = 0;
        this.time = performance.now();
        this.direction = null;
        this.playerBullets = [];
        this.lastShotTime = 0;
        this.shootCooldown = 700;
        this.PlayerIsInvincible = false;
        this.musicManager = musicManager;

        this.createPlayer()
        this.trackDirection()

        document.addEventListener("keydown", (event) => {
            if (this.lives <= 0) return;
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

    dammage() {
        if (this.PlayerIsInvincible) return;
        this.PlayerIsInvincible = true;
        this.musicManager.play('playerDammage');
        this.lives--;
        const lives = document.querySelector(".lives-container");
        lives.innerHTML = `Lives: ${this.lives}`
        const p = document.querySelector(".player-container");
        let blinkTimes = 10;
        let visible = true;
        const interval = setInterval(() => {
            p.style.opacity = visible ? 0.3 : 1;
            visible = !visible;
            blinkTimes--;
            if (blinkTimes <= 0) {
                p.style.opacity = 1;
                // console.log("secendCall"); // 100 * 10 = 1s => so at the end of the blinking , the player is invinsible no more
                clearInterval(interval);
            }
        }, 100)
        setTimeout(() => {
            // console.log("firstCall"); // 999 = 0.9s
            this.PlayerIsInvincible = false;
        }, 999);
    }

    handleShoot() {
        const now = performance.now();
        if (now - this.lastShotTime >= this.shootCooldown) {
            this.shoot();
            this.musicManager.play('playerShoot');
            this.lastShotTime = now;
        }
    }

    shoot() {
        const p = document.querySelector(".player");
        const playerRect = p.getBoundingClientRect();

        const bulletX = playerRect.left + p.offsetWidth / 2;
        const bullet = new Bullet(bulletX, window.innerHeight - p.offsetHeight);
        bullet.Element = bullet.createBulletElement(bullet.updateBulletType(-1));
        this.playerBullets.push(bullet);
        document.querySelector('.game-container').appendChild(bullet.getElement());
    }

    movePlayer(direction) {
        if (!direction) return
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
        document.querySelector('.timer-container').innerHTML = `Play_Time: ${((performance.now() - this.time)/ 1000).toFixed(2)}`;
        if (this.playerBullets.length > 0) {
            this.playerBullets.forEach((bullet) => {
                if (bullet.isColliding("Enemy")) {
                    bullet.getElement().remove();
                    this.musicManager.play('InvadersDeath');
                    this.playerBullets = this.playerBullets.filter((b) => b != bullet)
                    return
                }

                if (bullet.getY() + 4 <= 0) {
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