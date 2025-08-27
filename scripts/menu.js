const popup = document.getElementById("game-over-popup");
const replayBtn = document.getElementById("replay-btn");
const continueBtn = document.getElementById("continue-btn");

// Show menu (pause, win, lose)
export function showGameMenu(type) {
  if (type === "Congrats") {
    popup.querySelector("h2").textContent = "Congrats You win!";
    continueBtn.style.display = "none";
  } else if (type === "GameOver") {
    popup.querySelector("h2").textContent = "Game Over";
    continueBtn.style.display = "none";
  } else {
    popup.querySelector("h2").textContent = "Paused";
    continueBtn.style.display = "inline-block";
  }
  popup.classList.remove("hidden");
}

// Hide popup menu
export function hideMenu() {
  popup.classList.add("hidden");
  document.querySelector('.enemy-container').style.opacity = 1;
  document.querySelector('.player').style.opacity = 1;
}

// Menu buttons (replay, continue)
export function setupMenu(onReplay, onContinue) {
  replayBtn.addEventListener("click", () => {
    hideMenu();
    onReplay();
  });
  continueBtn.addEventListener("click", () => {
    hideMenu();
    onContinue();
  });
}
