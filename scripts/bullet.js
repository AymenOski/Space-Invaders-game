export class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.Speed = 5;
        this.Element = null;
    }

    getElement() { return this.Element; }
    getX() { return this.x; }
    getY() { return this.y; }
    setX(x) { this.x = x; }
    setY(y) { this.y = y; }

    createBulletElement(type) {
        if (!this.Element) {
            this.Element = document.createElement('div');
            this.Element.classList.add(type);
            this.Element.style.position = 'absolute';
        }
        return this.Element;
    }

    moveBullet(direction) {
        if (direction === 'up') {
            this.y -= this.Speed;
        } else if (direction === 'down') {
            this.y += this.Speed;
        }
        this.updatePosition();
    }

    updatePosition() {
        // console.log(this.x - window.innerWidth / 2);
        
        if (this.Element) {
            this.Element.style.transform = `translate3d(${this.x - window.innerWidth / 2}px, ${this.y}px , 0px) scale(1.8)`;
        }
    }

    updateBulletType(type) {
        if (type === -1) {
            return "player__bullet__type__1";
        }
        if (type < 0.33) {
            return "bullet__type__1"
        } else if (type < 0.66) {
            return "bullet__type__2"
        } else {
            return "bullet__type__3"
        }
    }

    isColliding(CollisionType) {
        if (CollisionType === "Enemy") {

        } else if (CollisionType === "Player") {
            const PlayerRect = document.querySelector(".player").getBoundingClientRect()
            if (this.x >= PlayerRect.left && this.x <= PlayerRect.right && this.y >= PlayerRect.top && this.y <= PlayerRect.bottom) {
                return true;
            }
        }
    }
}