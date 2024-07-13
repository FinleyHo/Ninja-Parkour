export class Preload extends Phaser.Scene {

    constructor() {
        super('preload');

        this.backgrounds = [
            "sand",
            "sky"
        ]

        this.characterNames = [
            "Mask Dude",
            "Ninja Frog",
            "Pink Man",
            "Virtual Guy",
        ]

    }

    preload = () => {
        this.loadingBar();
        this.loadMap();
        this.loadPlayerSpritesheets();
        this.loadTrapsSpritesheets();
    }

    create = () => {
        this.scene.start("play");
    }

    loadingBar = () => {
        //Ladeanimation Ladebalken
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        this.load.on('progress', function (value) {
            console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on('complete', function () {
            console.log('complete');
        });
    }

    loadMap = () => {
        //Lade Bilder für Tilemap
        this.load.image("terrain_img", "assets/PixelAdventure/Terrain/Terrain (16x16).png");
        this.load.image("back_brown_img", "assets/PixelAdventure/Background/Brown.png");
        this.load.image("spikes_img", "assets/PixelAdventure/Traps/Spikes/Idle.png");

        //Lade Tilemap
        this.load.tilemapTiledJSON("level1", "tiled/level1.json");
    }

    loadTrapsSpritesheets = () => {

        //Lade Spritesheets für Trampoline
        this.load.spritesheet({
            key: `trampoline_idle`,
            url: `assets/PixelAdventure/Traps/Trampoline/Idle.png`,
            frameConfig: {
                frameWidth: 28,
                frameHeight: 28,
                startFrame: 0,
                endFrame: 0
            }
        });
        this.load.spritesheet({
            key: `trampoline_jump`,
            url: `assets/PixelAdventure/Traps/Trampoline/Jump (28x28).png`,
            frameConfig: {
                frameWidth: 28,
                frameHeight: 28,
                startFrame: 0,
                endFrame: 7
            }
        });

        //Lade Spritesheets für die Segen
        this.load.spritesheet({
            key: `saw`,
            url: `assets/PixelAdventure/Traps/Saw/On (38x38).png`,
            frameConfig: {
                frameWidth: 38,
                frameHeight: 38,
                startFrame: 0,
                endFrame: 7
            }
        });
    }

    loadPlayerSpritesheets = () => {
        //Mit Schleife alle Bilder für Animationen laden
        for (let characterName of this.characterNames) {

            this.load.spritesheet({
                key: `${characterName}_idle`,
                url: `assets/PixelAdventure/MainCharacters/${characterName}/Idle (32x32).png`,
                frameConfig: {
                    frameWidth: 32,
                    frameHeight: 32,
                    startFrame: 0,
                    endFrame: 10
                }
            });
            this.load.spritesheet({
                key: `${characterName}_fall`,
                url: `assets/PixelAdventure/MainCharacters/${characterName}/Fall (32x32).png`,
                frameConfig: {
                    frameWidth: 32,
                    frameHeight: 32,
                    startFrame: 0,
                    endFrame: 0
                }
            });
            this.load.spritesheet({
                key: `${characterName}_hit`,
                url: `assets/PixelAdventure/MainCharacters/${characterName}/Hit (32x32).png`,
                frameConfig: {
                    frameWidth: 32,
                    frameHeight: 32,
                    startFrame: 0,
                    endFrame: 6
                }
            });
            this.load.spritesheet({
                key: `${characterName}_double_jump`,
                url: `assets/PixelAdventure/MainCharacters/${characterName}/Double Jump (32x32).png`,
                frameConfig: {
                    frameWidth: 32,
                    frameHeight: 32,
                    startFrame: 0,
                    endFrame: 5
                }
            });
            this.load.spritesheet({
                key: `${characterName}_jump`,
                url: `assets/PixelAdventure/MainCharacters/${characterName}/Jump (32x32).png`,
                frameConfig: {
                    frameWidth: 32,
                    frameHeight: 32,
                    startFrame: 0,
                    endFrame: 0
                }
            });
            this.load.spritesheet({
                key: `${characterName}_wall_jump`,
                url: `assets/PixelAdventure/MainCharacters/${characterName}/Wall Jump (32x32).png`,
                frameConfig: {
                    frameWidth: 32,
                    frameHeight: 32,
                    startFrame: 0,
                    endFrame: 3
                }
            });
            this.load.spritesheet({
                key: `${characterName}_run`,
                url: `assets/PixelAdventure/MainCharacters/${characterName}/Run (32x32).png`,
                frameConfig: {
                    frameWidth: 32,
                    frameHeight: 32,
                    startFrame: 0,
                    endFrame: 11
                }
            });
        }
    }

}