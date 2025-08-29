
export class StoryManager {
    constructor(game, musicManager) {
        this.game = game;
        this.MusicManager = musicManager;
        this.overlay = document.getElementById('story-overlay');
        this.titleElem = document.getElementById('story-title');
        this.textElem = document.getElementById('story-text');
        this.continueBtn = document.getElementById('story-continue-btn');
        this.currentScene = 0;
        this.isShowing = false;
    }

    getStoryScenes() {
        return [
            {  // Level 1: Introduction
                title: "The Void Swarm Descends",
                text: "Year 2147. The Void Swarm's scouts breach Earth's orbit, seeking to harvest our energy. As Captain Nova, pilot the Aether Guardian to stop them!",
                music: 'mainTitle',
                duration: 5000
            },
            {  // Level 2: Development (after clearing Level 1)
                title: "Swarm Evolution",
                text: "The scouts are gone, but the Warriors and Drones advance. Intel: The Swarm has stolen human tech to adapt mid-battle. Push them back!",
                music: 'playerDammage'
            },
            {  // Level 3: Climax
                title: "The Queen's Wrath",
                text: "The Swarm unleashes its Harvesters, led by their Queen. Destroy them to save Earth! Hint: Target UFOs for bonus points.",
                music: 'InvadersDeath'
            },
            {  // Win Ending
                title: "Victory for Earth",
                text: "The Swarm retreats to their void dimension. Earth is safe... for now. Your score: [SCORE]. Lore: The Queen vows revenge."
            },
            {  // Lose Ending
                title: "Earth's Last Stand Falls",
                text: "The Swarm overwhelms the Aether Guardian. Earth is harvested. Final score: [SCORE]. Try again, Captain Nova."
            }
        ];
    }

    showStory(sceneIndex) {
        if (this.isShowing) return;
        this.game.isPaused = true;
        this.game.Player.isPaused = true;
        this.isShowing = true;
        this.titleElem.textContent = this.getStoryScenes()[sceneIndex].title;
        this.textElem.textContent = this.getStoryScenes()[sceneIndex].text.replace('[SCORE]', this.game.Player.score);
        this.overlay.classList.remove('hidden');
        this.overlay.classList.add('visible');
    }
}