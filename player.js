class player {
    constructor() {
        this.score = 0;
        this.lives = 3;
        this.x = 0;
    }

    getLives()  { return this.lives }
    getScore()  { return this.score }
    getX()      { return this.x }

    setLives(lives) { this.lives = lives }
    setScore(score) {  this.score = score }
    setX(x)         {  this.x = x }
    
    reset() { this.score = 0; this.lives = 3; this.x = 0; }

    dammage() {

        this.lives--;
        if (this.lives < 0) {
            this.lives = 0;
        }
    }
    shoot(){
        

    }   

}