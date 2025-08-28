// Manages game audio tracks
export class MusicManager {
    constructor() {
        // Initializes audio tracks for various game events
        this.tracks = {
            playerShoot: new Audio('./Assets/Sounds/Player__Shoot.wav'),
            playerDammage: new Audio('./Assets/Sounds/Player__Dammage.mp3'),
            playerDeathExplosion: new Audio('./Assets/Sounds/Player__DeathExplosion.mp3'),
            mainTitle: new Audio('./Assets/Sounds/Main__Title.mp3'),
            gameover: new Audio('./Assets/Sounds/Game__Over.mp3'),
            InvadersDeath: new Audio('./Assets/Sounds/Invaders__DeathSound.wav'),
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
        if (trackName !== "mainTitle") {
            track = this.tracks[trackName].cloneNode();
        } else {
            track = this.tracks[trackName];
        }
        track.play();
    }

    // Stops all audio tracks and resets their playback
    stopAllMusic() {
        for (let key in this.tracks) {
            const track = this.tracks[key];
            track.pause();
            track.currentTime = 0;
        }
    }
}