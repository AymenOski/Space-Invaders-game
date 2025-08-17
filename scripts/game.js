import { EnemyManager } from './enemies.js';
import { Player } from './player.js';

export class Game {
    constructor() {
        this.EnemyManager = new EnemyManager();
        this.EnemyManager.spawnEnemies();
        this.Player = new Player();
    }

    updateEntities() {
        // this.EnemyManager.update();
        this.Player.update();
    }
}

const game = new Game();

function gameLoop() {
    game.updateEntities();
    if (game.Player.direction) { game.Player.movePlayer(game.Player.direction) }
    // handleSounds();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
