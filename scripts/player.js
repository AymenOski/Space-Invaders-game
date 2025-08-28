import { Bullet } from './bullet.js';
import { keys } from './input.js';

// Represents the player in the game
export class Player {
    constructor(musicManager) {
        // Initializes player properties and creates player element
        this.score = 0;
        this.lives = 3;
        this.Speed = 7;
        this.x = 0;
        this.time = performance.now();
        this.playerBullets = [];
        this.lastShotTime = 0;
        this.shootCooldown = 550;
        this.PlayerIsInvincible = false;
        this.musicManager = musicManager;
        this.isPaused = false;
        this.createPlayer();
    }

    // Creates the player DOM element
    createPlayer() {
        const p = document.createElement("div");
        p.classList.add("player");
        const container = document.querySelector(".player-container");
        container.appendChild(p);
    }

    // Handles player damage, reducing lives and applying invincibility
    dammage() {
        if (this.PlayerIsInvincible) return;
        this.PlayerIsInvincible = true;
        this.musicManager.play('playerDammage');
        this.lives--;
        const lives = document.querySelector(".lives-container");
        lives.style.opacity = 0.4;
        lives.style.color = "red";
        setTimeout(() => {
            lives.innerHTML = `Lives: ${this.lives}`;
            lives.style.color = "white";
            lives.style.opacity = 1;
        }, 400);
        const p = document.querySelector(".player-container");
        let blinkTimes = 10;
        let visible = true;
        const interval = setInterval(() => {
            p.style.opacity = visible ? 0.3 : 1;
            visible = !visible;
            blinkTimes--;
            if (blinkTimes <= 0) {
                p.style.opacity = 1;
                clearInterval(interval);
            }
        }, 100);
        setTimeout(() => {
            this.PlayerIsInvincible = false;
        }, 999);
    }

    // Manages player shooting with a cooldown
    handleShoot() {
        const now = performance.now();
        if (now - this.lastShotTime >= this.shootCooldown) {
            this.shoot();
            this.musicManager.play('playerShoot');
            this.lastShotTime = now;
        }
    }

    // Creates and adds a player bullet
    shoot() {
        const p = document.querySelector(".player");
        const playerRect = p.getBoundingClientRect();
        const bulletX = playerRect.left + p.offsetWidth / 2;
        const bullet = new Bullet(bulletX, window.innerHeight - 35);
        bullet.Element = bullet.createBulletElement(bullet.updateBulletType(-1));
        this.playerBullets.push(bullet);
        document.querySelector('.game-container').appendChild(bullet.getElement());
    }

    // Moves the player left or right within bounds
    movePlayer(direction) {
        if (!direction) return;
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

    // Updates player movement, shooting, and bullet collisions
    update() {
        document.querySelector('.timer-container').innerHTML = 
            `Play_Time: ${((performance.now() - this.time) / 1000).toFixed(1)}`;
        if (!this.isPaused && this.lives > 0) {
            if (keys.left) this.movePlayer("left");
            if (keys.right) this.movePlayer("right");
            if (keys.shoot) this.handleShoot();
        }
        if (this.playerBullets.length > 0) {
            this.playerBullets.forEach((bullet) => {
                if (bullet.isColliding("Enemy")) {
                    bullet.getElement().remove();
                    this.musicManager.play('InvadersDeath');
                    this.playerBullets = this.playerBullets.filter((b) => b != bullet);
                    return;
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