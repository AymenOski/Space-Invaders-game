import { Bullet } from './bullet.js';

export class Player {
    constructor() {
        this.score = 0;
        this.lives = 3;
        this.moves = 3
        this.x = 0;
        this.direction = null;
        this.createPlayer()
        this.trackDirection()

        document.addEventListener("keydown", (event) => {
            if (event.key.startsWith("Arrow")) {
                switch (event.key) {
                    case "ArrowLeft":
                        this.movePlayer("left");
                        break;
                    case "ArrowRight":
                        this.movePlayer("right");
                        break;
                        case " ":
                    this.shoot();
                    break;
                default:
                    return;
                }
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

    createPlayer(){
        const p = document.createElement("div");
        p.classList.add("player");
        const container = document.querySelector(".player-container");
        container.appendChild(p);
    }

    trackDirection(){
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


    shoot() {
    const bullet = new Bullet(this.x, 500);
    bullet.createBulletElement();
    const playerContainer = document.querySelector('.player-container');
    playerContainer.prepend(bullet.getElement());
    }

    movePlayer(direction) {
        const p = document.querySelector(".player");
        const container = document.querySelector(".player-container");
        const maxX = (container.offsetWidth / 2) - p.offsetWidth / 2;
        const minX = -(container.offsetWidth / 2) + p.offsetWidth / 2;


        if (direction === "left" && this.x - this.moves > minX) {
            this.x -= this.moves;
        } else if (direction === "right" && this.x + this.moves < maxX) {
            this.x += this.moves;
        }

        p.style.transform = `translate3d(${this.x}px, 0, 0)`;
    }

}
