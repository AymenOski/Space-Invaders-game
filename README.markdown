# Space Invaders Game

## Overview

This is a web-based implementation of the classic *Space Invaders* game, built using HTML, CSS, and JavaScript. The player controls a spaceship to shoot down waves of alien enemies while avoiding their attacks. The game includes a heads-up display (HUD) for score, lives, and playtime, along with sound effects and a game-over menu.

## Directory Structure

```
├── Assets
│   ├── Images
│   │   ├── 31633.jpg                # Background image
│   │   ├── EnemyExplosion.png       # Enemy explosion effect
│   │   ├── Enemy_Bullet_A.png       # Enemy bullet type A
│   │   ├── Enemy_Bullet_B.png       # Enemy bullet type B
│   │   ├── Enemy_Bullet_C.png       # Enemy bullet type C
│   │   ├── PlayerExplosion.png      # Player explosion effect
│   │   ├── PlayerShield.png         # Player shield effect
│   │   ├── Player_Bullet.png        # Player bullet
│   │   ├── invader_A1.png           # Enemy type A (frame 1)
│   │   ├── invader_A2.png           # Enemy type A (frame 2)
│   │   ├── invader_B1.png           # Enemy type B (frame 1)
│   │   ├── invader_B2.png           # Enemy type B (frame 2)
│   │   ├── invader_C1.png           # Enemy type C (frame 1)
│   │   ├── invader_C2.png           # Enemy type C (frame 2)
│   │   ├── player.png               # Player spaceship
│   │   └── space__0007_UFO.png     # UFO sprite
│   └── Sounds
│       ├── Game__Over.mp3          # Game over sound
│       ├── Invaders__DeathSound.wav # Enemy death sound
│       ├── Main__Title.mp3         # Background music
│       ├── Player__Dammage.mp3     # Player damage sound
│       ├── Player__DeathExplosion.mp3 # Player death sound
│       └── Player__Shoot.wav       # Player shooting sound
├── index.html                      # Main HTML file
├── scripts
│   ├── bullet.js                   # Bullet class and collision logic
│   ├── enemies.js                  # Enemy and EnemyManager classes
│   ├── game.js                     # Main game logic and loop
│   ├── helpers.js                  # Helper functions for pause, score, etc.
│   ├── input.js                    # Keyboard input handling
│   ├── menu.js                     # Game menu (pause, game over, win)
│   ├── music.js                    # Audio management
│   └── player.js                   # Player class and controls
└── style.css                       # Game styling
```

## Features

- **Player Controls**: Move left/right with arrow keys, shoot with the spacebar, and pause with the Escape key.
- **Enemies**: Three types of enemies (A, B, C) with different point values (150, 100, 50 respectively) and animations.
- **Scoring**: Points awarded for destroying enemies, displayed in the HUD.
- **Lives**: The player starts with 3 lives, with visual and sound effects for damage.
- **Game States**: Includes pause, game over, and win conditions with a popup menu.
- **Responsive Design**: Adjusts enemy and player scaling based on screen size.
- **Sound Effects**: Audio for shooting, damage, enemy death, and background music.
- **Visual Effects**: Pixel-art style sprites with explosion animations.

## Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/AymenOski/Space-Invaders-game.git
   ```
2. **Serve the Game**:
   - Use a local server (e.g., `Live Server` in VS Code or `python -m http.server 8000`)
   - Open `index.html` in a browser via the server.
3. **Dependencies**:
   - No external libraries are required; all assets are included.
   - Uses the `Press Start 2P` font from Google Fonts (loaded via CDN).

## How to Play

- **Objective**: Destroy all enemies before they reach the player's position or deplete your lives.
- **Controls**:
  - **Left Arrow**: Move player left.
  - **Right Arrow**: Move player right.
  - **Spacebar**: Shoot bullets.
  - **Escape**: Pause/unpause the game.
- **Game Over**: Triggered when the player loses all lives or enemies reach the player's position.
- **Win Condition**: Clear all enemies to win.
- **Menu**: On game over or win, choose to restart or continue (if paused).

## Technical Details

- **Game Loop**: Runs via `requestAnimationFrame` in `game.js`, updating player, enemies, and bullets each frame.
- **Collision Detection**: Uses `getBoundingClientRect` for precise hit detection between bullets and enemies/player.
- **Audio**: Managed by `MusicManager` class, with preloaded sounds to avoid delays.
- **Responsive Scaling**: Enemy and player sizes adjust based on screen width using CSS transforms.
- **Modular Code**: Organized into separate modules for player, enemies, bullets, input, music, and menu logic.