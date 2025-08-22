export class MusicManager {
    constructor(){
        this.tracks = { 
            playerShoot : new Audio('./Assets/Sounds/Player__Shoot.wav'),
            playerDammage : new Audio('./Assets/Sounds/Player__Dammage.mp3'),
            playerDeathExplosion : new Audio('./Assets/Sounds/Player__DeathExplosion.mp3'),
            mainTitle : new Audio('./Assets/Sounds/Main__Title.mp3'),
            gameover : new Audio('./Assets/Sounds/Game__Over.mp3'),
            InvadersDeath : new Audio('./Assets/Sounds/Invaders__DeathSound.wav'),
        }
    }
}
