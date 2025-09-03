// Manages game audio tracks
export class MusicManager {
    constructor() {
        // Initializes audio tracks for various game events
        this.tracks = {
            playerShoot: new Audio('./Assets/Sounds/Player__Shoot.wav'),
            playerDammage: new Audio('./Assets/Sounds/Player__Dammage.mp3'),
            InvadersDeath: new Audio('./Assets/Sounds/Invaders__DeathSound.wav'),
            Level1 : new Audio('./Assets/Sounds/Level_1_theme.mp3'),
            Level2 : new Audio('./Assets/Sounds/Level_2_theme.mp3'),
            Level3 : new Audio('./Assets/Sounds/Level_3_theme.mp3'),
            WinTheme : new Audio('./Assets/Sounds/Win__theme.mp3'),
            LoseTheme : new Audio('./Assets/Sounds/Lose__theme.mp3'),
        };
        // Preloads all audio tracks
        for (let key in this.tracks) {
            this.tracks[key].preload = "auto";
            this.tracks[key].load();
        }
    }

    // Plays a specified audio track, cloning non-main tracks to allow overlapping
    play(trackName) {
        if (!this.tracks[trackName]) return;
        let track = null;
        if (trackName === "InvadersDeath" || trackName === "playerShoot" || trackName === "playerDammage") {
            track = this.tracks[trackName].cloneNode();
        } else {
            track = this.tracks[trackName];
        }
        track.play();
    }

    // Stops all audio tracks and resets their playback
    stopAllTracks() {
        for (let key in this.tracks) {
            const track = this.tracks[key];
            track.pause();
            track.currentTime = 0;
        }
    }
}