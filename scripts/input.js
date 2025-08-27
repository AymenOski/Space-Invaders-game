// store which keys are pressed
export const keys = {
  left: false,
  right: false,
  shoot: false,
  pause: false
};

// setup listeners one time
export function setupInput() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") keys.left = true;
    if (e.key === "ArrowRight") keys.right = true;
    if (e.key === " ") keys.shoot = true;
    if (e.key === "Escape") keys.pause = true;
  });

  document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") keys.left = false;
    if (e.key === "ArrowRight") keys.right = false;
    if (e.key === " ") keys.shoot = false;
    if (e.key === "Escape") keys.pause = false;
  });
}
