# Space Invaders Game

## Overview

This is a web-based implementation of the classic *Space Invaders* game, enhanced with a story mode and multiple levels. Built using HTML, CSS, and JavaScript, the player controls the *Stellar Claw* spaceship, piloted by Zara Flux, to fend off waves of Glimmerkin enemies stealing Earth's colors. The game features a heads-up display (HUD) for score, lives, and playtime, immersive sound effects, pixel-art visuals, and a narrative-driven story mode across three distinct levels.

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
│       ├── Invaders__DeathSound.wav # Enemy death sound
│       ├── Level_1_theme.mp3        # Level 1 background music
│       ├── Level_2_theme.mp3        # Level 2 background music
│       ├── Level_3_theme.mp3        # Level 3 background music
│       ├── Lose__theme.mp3         # Game over music
│       ├── Player__Dammage.mp3     # Player damage sound
│       ├── Player__Shoot.wav       # Player shooting sound
│       ├── Win__theme.mp3          # Victory music
├── README.md                       # Project documentation
├── index.html                      # Main HTML file
├── scripts
│   ├── bullet.js                   # Bullet class and collision logic
│   ├── enemies.js                  # Enemy and EnemyManager classes with tile map logic
│   ├── game.js                     # Main game logic and loop
│   ├── helpers.js                  # Helper functions for pause, score, etc.
│   ├── input.js                    # Keyboard input handling
│   ├── menu.js                     # Pause and game over menu
│   ├── music.js                    # Audio management
│   ├── player.js                   # Player class and controls
│   └── story.js                    # Story mode logic and scenes
└── style.css                       # Game styling
```

## Features

- **Player Controls**: Move left/right with arrow keys, shoot with the spacebar, pause with the Escape key.
- **Enemies**: Three types of enemies (A, B, C) with point values (150, 100, 50) and animations.
- **Levels**: Three distinct levels with increasing enemy counts, defined by tile map grids:
  - Level 1: Glowdrones (2 rows of enemies).
  - Level 2: Chromacruisers (3 rows of enemies).
  - Level 3: Color King’s Glowdrone army (5 rows of enemies).
- **Story Mode**: A narrative-driven mode with five scenes:
  - Introduction (before Level 1): Sets up the Glimmerkin color heist.
  - Development (after Level 1 and 2): Progresses the story with new enemy waves.
  - Climax (before Level 3): Introduces the Color King.
  - Win Ending (after Level 3): Celebrates victory with the player’s score.
  - Lose Ending (on game over): Shows defeat with a chance to retry.
- **Scoring**: Points for destroying enemies, displayed in the HUD, integrated into story endings.
- **Lives**: Start with 3 lives, with visual (blink) and sound effects for damage.
- **Game States**: Pause, game over, win, and story states with pop-up menus and overlays.
- **Responsive Design**: Enemy and player scaling adjusts based on screen size using CSS transforms.
- **Sound Effects**: Level-specific music, plus sounds for shooting, damage, and enemy death.
- **Visual Effects**: Pixel-art sprites with explosion animations for enemies and player.

## Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/AymenOski/Space-Invaders-game.git
   ```

2. **Serve the Game**:
   - Use a local server (e.g., `Live Server` in VS Code or `python -m http.server 8000`).
   - Open `index.html` in a browser via the server to ensure proper asset loading.

3. **Dependencies**:
   - No external libraries required; all assets (images, sounds) are included.
   - Uses the `Press Start 2P` font from Google Fonts (loaded via CDN).

## How to Play

- **Objective**: Destroy all enemies across three levels to save Earth’s colors, while avoiding enemy attacks and preserving lives.
- **Controls**:
  - **Left Arrow**: Move player left.
  - **Right Arrow**: Move player right.
  - **Spacebar**: Shoot bullets.
  - **Escape**: Pause/unpause the game.
- **Story Progression**:
  - Start: View the introduction (scene 0) for Level 1.
  - Clear Level 1: See development (scene 1) for Level 2.
  - Clear Level 2: See climax (scene 2) for Level 3.
  - Clear Level 3: View win ending (scene 3).
  - Lose (0 lives or enemies reach player): View lose ending (scene 4).
- **Game Over**: Triggered when lives reach 0 or enemies reach the player’s position.
- **Win Condition**: Clear all enemies in Level 3.
- **Menus**:
  - Pause menu: Continue or restart.
  - Story overlay: Click “Continue” (or “Restart Game” for endings) to progress.
  - Game over/win: Restart via story overlay.

## Technical Details

- **Game Loop**: Uses `requestAnimationFrame` in `game.js` to update player, enemies, and bullets each frame, pausing during story scenes.
- **Collision Detection**: Employs `getBoundingClientRect` for accurate hit detection between bullets and enemies/player.
- **Audio**: Managed by `MusicManager` class in `music.js`, preloading tracks for seamless playback. Level-specific themes (`Level_1_theme.mp3`, etc.) enhance immersion.
- **Responsive Scaling**: Enemy and player sizes adjust dynamically using CSS transforms based on screen width.
- **Modular Code**: Separates logic into modules for player, enemies, bullets, input, music, menu, and story.
- **Tile Map Engine**:
  - Implemented in `enemies.js` via `EnemyManager.generateMap()`.
  - Uses a single tileset (enemy sprites: `invader_A1.png`, `invader_B1.png`, `invader_C1.png`, etc.).
  - Generates three unique maps:
    - Level 1: 2 rows (11 enemies each, types E1, E2).
    - Level 2: 3 rows (11 enemies each, types E1, E2, E2).
    - Level 3: 5 rows (11 enemies each, types E1, E2, E2, E3, E3).
  - Logical grid stored in a `Map` object, mapping level numbers to enemy layouts.
  - Enemies are positioned using a grid-based system with `xSpacing` and `ySpacing` for responsive placement.
- **Story Mode**:
  - Managed by `StoryManager` in `story.js`.
  - Displays scenes via `#story-overlay` with level-specific music and text, pausing gameplay.
  - Scenes progress automatically: Level 1 → Scene 0, Level 2 → Scene 1, Level 3 → Scene 2, Win → Scene 3, Loss → Scene 4.
  - Clicking `#story-continue-btn` advances the story or resets the game (for win/loss scenes).

## Future Improvements

- Add a high-score system with local storage.
