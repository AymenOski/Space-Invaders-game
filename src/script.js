import { Player } from "../Player.js";

const player = new Player();

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        player.direction = "left";
    } else if (event.key === "ArrowRight") {
        player.direction = "right";
    }
});

document.addEventListener("keyup", () => {
   console.log("now");
   
    player.direction = null;
});



function gameLoop() {
    if (player.direction) {
        player.movePlayer(player.direction);
    }
    requestAnimationFrame(gameLoop); // keep looping
}
requestAnimationFrame(gameLoop); // start the loop

