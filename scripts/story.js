const storyContinue = document.getElementById('story-continue-btn');

export class StoryManager {
    constructor(game, musicManager) {
        this.game = game;
        this.MusicManager = musicManager;
        this.overlay = document.getElementById('story-overlay');
        this.titleElem = document.getElementById('story-title');
        this.textElem = document.getElementById('story-text');
        this.continueBtn = document.getElementById('story-continue-btn');
        this.currentScene = 0;
        this.isShowingStory = false;
    }

    getStoryScenes() {
        return [
            {  // Level 1: Introduction
                title: "Glimmerkin Color Heist",
                text: "It’s 2199, and the Glimmerkin are raiding Earth’s skies with their buzzing Glowdrones, stealing our colors to brighten their dull galaxy! You’re Zara Flux, piloting the *Stellar Claw*. Blast those pesky drones and save Earth’s rainbows!",
                music: 'Level1'
            },
            {  // Level 2: Development (after clearing Level 1)
                title: "Chromacruisers Crash In",
                text: "Way to go, Zara! The Glowdrones are gone, but now the Glimmerkin’s sleek Chromacruisers are swooping down, snatching our sunsets! Fire up the *Stellar Claw* and smash them to keep Earth’s skies vivid!",
                music: 'Level2'
            },
            {  // Level 3: Climax
                title: "Showdown with the Color King",
                text: "The Glimmerkin Color King and his massive Glowdrone are here to drain Earth’s last hues! Zara, it’s do-or-die—pilot the *Stellar Claw* to blast them back to their gray galaxy. Zap those fast Chromacruisers for bonus points!",
                music: 'Level3'
            },
            {  // Win Ending
                title: "Earth’s Sky Party Saved!",
                text: "Boom! The Glimmerkin King’s outta here, and Earth’s skies are sparkling again! Zara Flux, you’re a legend with a score of [SCORE]! Rumor has it, the Glimmerkin are planning a comeback—ready for round two?",
                music: 'WinTheme'
            },
            {  // Lose Ending
                title: "Glimmerkin Party Crashers Win",
                text: "Oh no! The Glimmerkin turned Earth into their cosmic dance floor, and the *Stellar Claw* crashed. Your score: [SCORE]. Hop back in, Zara, and show those aliens who’s boss!",
                music: 'LoseTheme'
            }
        ];
    }

    showStory(storyScene) {
        if (storyScene > 0 ){
            this.game.MusicManager.stopAllTracks();
        }
        this.game.MusicManager.play(this.getStoryScenes()[storyScene].music);
        this.isShowingStory = true;
        this.game.isPaused = true;
        this.game.Player.isPaused = true;
        this.game.EnemyManager.isPaused = true;
        this.titleElem.textContent = this.getStoryScenes()[storyScene].title;
        this.textElem.textContent = this.getStoryScenes()[storyScene].text.replace('[SCORE]', this.game.Player.score);
        this.continueBtn.textContent = (storyScene >= 3) ? 'Restart Game' : 'Continue';
        
        this.overlay.classList.remove('hidden');
        this.overlay.classList.add('visible');
    }
    hideStory() {
        this.isShowingStory = false;
        this.game.isPaused = false;
        this.game.Player.isPaused = false;
        this.game.EnemyManager.isPaused = false;
        this.overlay.classList.add('hidden');
        this.overlay.classList.remove('visible');

        if (this.currentScene === 3 || this.currentScene === 4) {
            this.game.reset();
        }
        this.currentScene++;
    }
}
export function setupStoryListener(callback) {
    storyContinue.addEventListener('click', callback)
}
