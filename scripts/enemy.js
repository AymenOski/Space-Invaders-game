export class Enemy {
    constructor(Speed, EnemywhoShots) {
        this.Speed = Speed;
        this.EnemywhoShots = EnemywhoShots;
        this.EnemyX = 0;
        this.EnemyY = 0;
        this.Element = null; // This will hold the enemy element once created
    }
    // Getters
    getSpeed() {
        return this.Speed;
    }
    getEnemywhoShots() {
        return this.EnemywhoShots;
    }
    // Setters
    setSpeed(Speed) {
        this.Speed = Speed;
    }
    setEnemywhoShots() {
        let r = Math.random();
        if (r <= 0.33) {

        } else if (r <= 0.66) {

        } else {

        }
        this.EnemywhoShots = EnemywhoShots;
    }
    // getters
    getElement() {
        return this.Element;
    }
    getEnemyX() {
        return this.EnemyX;
    }
    // setters 
    setElement(element) {
        this.Element = element;
    }
    setEnemyX(x) {
        this.EnemyX = x;
    }
    setEnemyY(y) {
        this.EnemyY = y;
    }
    // methods
    createEnemyElement(type) {
        if (!this.Element) {
            this.Element = document.createElement('div');
            this.Element.classList.add('enemy');
            this.Element.classList.add(type);
            this.Element.style.left = `${window.innerWidth / 4 + 15}px`;
            this.Element.style.top = `${window.innerHeight / 10}px`;
            this.Element.style.transform = `translate3d(0px , 0px , 0px) scale(1.8)`;
            this.Element.style.position = 'absolute';
        }
        return this.Element;
    }
    moveEnemy(direction) {
        if (direction === 'left') {
            this.EnemyX -= this.Speed;
        } else if (direction === 'right') {
            this.EnemyX += this.Speed;
        }else if (direction === 'down') {
            this.EnemyY += this.Speed + 5;
        }
        this.updatePosition();
    }
    updatePosition() {
        if (this.Element) {
            this.Element.style.transform = `translate3d(${this.EnemyX}px, ${this.EnemyY}px , 0px) scale(1.8)`;
        }
    }
}