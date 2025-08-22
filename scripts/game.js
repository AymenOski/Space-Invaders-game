import { EnemyManager } from './enemies.js';
import { Player } from './player.js';

export class Game {
    constructor() {
        this.EnemyManager = new EnemyManager();
        this.Player = new Player();
    }

    updateEntities() {
        this.EnemyManager.update();
        this.Player.update();
        if (this.EnemyManager.EnemiesDammagedThePlayer) {
            this.Player.dammage();
            this.EnemyManager.EnemiesDammagedThePlayer = false;
        }
    }
}

const game = new Game();

function gameLoop() {
    game.updateEntities();
    if (game.Player.direction) { game.Player.movePlayer(game.Player.direction) }

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
