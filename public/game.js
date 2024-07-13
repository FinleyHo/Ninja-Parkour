
import { Preload, Play } from './scenes/index.js';

let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    backgroundColor: "rgb(0, 140, 180)",
    physics: {
        fps: 60,
        default: 'arcade',
        arcade: {
            gravity: { y: 1500 },
            // debug: true,
            tileBias: 20,
        }
    },
    scene: [Preload, Play],
    scale: {
        mode: Phaser.Scale.FIT,
        zoom: 1,
        width: "100%",
        height: "100%",
	}
}

let game = new Phaser.Game(config);

export default game;