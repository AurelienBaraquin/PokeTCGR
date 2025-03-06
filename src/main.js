import { MainScene } from './scenes/MainScene.js';

const config = {
    type: Phaser.AUTO,
    backgroundColor: "#333333",
    scene: [MainScene],
    scale: {
        mode: Phaser.Scale.FIT,
        width: 1280,
        height: 720,
    },
};

const game = new Phaser.Game(config);
