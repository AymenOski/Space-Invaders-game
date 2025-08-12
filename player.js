export class player {
    constructor() {
        this.score = 0;
        this.lives = 3;
        this.moves = 5
        this.x = 0;

        document.addEventListener("keydown", (event) => {
        if (event.key.startsWith("Arrow")) {
            switch(event.key) {
            case "ArrowLeft":
                this.movePlayer("left");
                break;
            case "ArrowRight":
                this.movePlayer("right");
                break;
            }
        }
    });
        
    }

    getLives() { return this.lives }
    getScore() { return this.score }
    getX() { return this.x }

    setLives(lives) { this.lives = lives }
    setScore(score) { this.score = score }
    setX(x) { this.x = x }

    reset() { this.score = 0; this.lives = 3; this.x = 0; }

    dammage() {
        this.lives--;
        if (this.lives < 0) {
            this.lives = 0;
        }
    }


    shoot() { }






    movePlayer(direction) {
    const p = document.querySelector(".player");
    const container = document.querySelector(".player-container");
    const maxX = ( container.offsetWidth - p.offsetWidth ) / 2;
    const minX = -( container.offsetWidth - p.offsetWidth ) / 2;

    console.log(maxX, minX);

    if (direction === "left") {
        this.x -= this.moves;
    } else if (direction === "right" && this.x + this.moves < maxX ) {
        this.x += this.moves;
    }
    
    p.style.transform = `translate3d(${this.x}px, 0, 0)`;
}

}
