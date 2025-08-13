export class Enemy {
    constructor(Speed, EnemywhoShots) {
        this.Speed = Speed;
        this.EnemywhoShots = EnemywhoShots;
        this.EnemyX = 0;
        this.EnemyY = 0;
        this.Element = null; // This will hold the enemy element once created
    }

    getSpeed() { return this.Speed; }
    getElement() { return this.Element; }
    getEnemyX() { return this.EnemyX; }
    getEnemyY() { return this.EnemyY; }
    getEnemywhoShots() { return this.EnemywhoShots; }
    setSpeed(Speed) { this.Speed = Speed; }
    setElement(element) { this.Element = element; }
    setEnemyX(x) { this.EnemyX = x; }
    setEnemyY(y) { this.EnemyY = y; }
    setEnemywhoShots() {
        let r = Math.random();
        if (r <= 0.33) {

        } else if (r <= 0.66) {

        } else {

        }
        this.EnemywhoShots = EnemywhoShots;
    }
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
        } else if (direction === 'down') {
            this.EnemyY += this.Speed + 20;
        }
        if (this.EnemyX % 35 === 0) {
            this.updateEnemyType();
        }
        this.updatePosition();
    }
    updatePosition() {
        if (this.Element) {
            this.Element.style.transform = `translate3d(${this.EnemyX}px, ${this.EnemyY}px , 0px) scale(1.8)`;
        }
    }

    updateEnemyType() {
        if (this.Element) {
            if (this.Element.classList.contains('E1__A1')) {
                this.Element.classList.remove('E1__A1');
                this.Element.classList.add('E1__A2');
            } else if (this.Element.classList.contains('E2__B1')) {
                this.Element.classList.remove('E2__B1');
                this.Element.classList.add('E2__B2');
            } else if (this.Element.classList.contains('E3__C1')) {
                this.Element.classList.remove('E3__C1');
                this.Element.classList.add('E3__C2');
            } else if (this.Element.classList.contains('E1__A2')) {
                this.Element.classList.remove('E1__A2');
                this.Element.classList.add('E1__A1');
            } else if (this.Element.classList.contains('E2__B2')) {
                this.Element.classList.remove('E2__B2');
                this.Element.classList.add('E2__B1');
            } else if (this.Element.classList.contains('E3__C2')) {
                this.Element.classList.remove('E3__C2');
                this.Element.classList.add('E3__C1');
            }
        }
    }
}

