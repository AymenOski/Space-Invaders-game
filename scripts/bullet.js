export class Bullet {
    constructor(x , y){
        this.x = x;
        this.y = y;
        this.Element = null;
    }

    getElement() { return this.Element; }
    getX() { return this.x; }
    getY() { return this.y; }

    createBulletElement() {
        if (!this.Element) {
            this.Element = document.createElement('div');
            this.Element.classList.add('bullet');
            this.Element.style.left = `${this.x}px`;
            this.Element.style.top = `${this.y}px`;
            this.Element.style.transform = `translate3d(0px , 0px , 0px) scale(1.8)`;
            this.Element.style.position = 'absolute';
        }
        return this.Element;
    }

    moveBullet(direction) {
        if (direction === 'up') {
            this.y -= 10;
        } else if (direction === 'down') {
            this.y += 10;
        }
        this.updatePosition();
    }
    
    updatePosition() {
        if (this.Element) {
            this.Element.style.transform = `translate3d(${this.x}px, ${this.y}px , 0px) scale(1.8)`;
        }
    }

}