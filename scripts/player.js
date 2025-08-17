export class Player {
    constructor() {
        this.score = 0;
        this.lives = 3;
        this.moves = 6
        this.x = 0;
        this.direction = null;
        this.createPlayer()
        this.trackDirection()
    }


    //geters
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


    shoot() { }


    movePlayer(direction) {
        if (!direction) return
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
