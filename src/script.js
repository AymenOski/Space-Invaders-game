import { Player } from "../Player.js";

const player = new Player();



function gameLoop() {
    if (player.direction) {
        player.movePlayer(player.direction);
    }
    requestAnimationFrame(gameLoop); // keep looping
}
requestAnimationFrame(gameLoop); // start the loop

