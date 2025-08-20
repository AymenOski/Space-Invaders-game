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
        document.querySelector('.timer-container').innerHTML = `Play_Time: ${(performance.now()/1000).toFixed(2)}`;

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
