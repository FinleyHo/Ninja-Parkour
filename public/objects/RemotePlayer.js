
export class RemotePlayer extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, characterName, username, id) {
        super(scene, x, y);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //Remote Spieler haben keine Graviation
        this.body.setAllowGravity(false);

        //Nicht bewegbar
        this.body.immovable = true;

        this.scene = scene;

        this.id = id;
        this.username = username;

        this.body.setSize(16, 28);
        this.scale = 1.2;

        this.characterName = characterName;
        this.nameText = null;

        // this.setCollideWorldBounds(true);
        this.preload();

    }

    preload = () => {

        this.scene.load.once('complete', this.create, this.scene);
        this.scene.load.start();
    }

    create = () => {
        this.nameText = this.scene.add.text(this.x - 20, this.y - 40, this.username);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers(`${this.characterName}_idle`),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers(`${this.characterName}_run`),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers(`${this.characterName}_jump`),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'double_jump',
            frames: this.anims.generateFrameNumbers(`${this.characterName}_double_jump`),
            frameRate: 20,
            repeat: 0
        });
        this.anims.create({
            key: 'fall',
            frames: this.anims.generateFrameNumbers(`${this.characterName}_fall`),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'hit',
            frames: this.anims.generateFrameNumbers(`${this.characterName}_hit`),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'wall_jump',
            frames: this.anims.generateFrameNumbers(`${this.characterName}_wall_jump`),
            frameRate: 20,
            repeat: -1
        });

        //Spiele erste Animation ab
        this.play("idle");

    }

    setPosition = (x, y) => {
        this.x = x;
        this.y = y;
        this.nameText.x = x - 20;
        this.nameText.y = y - 40;
    }

    setAnimation = (animation) => {
        this.play(animation, true);
    }

    setFlipX = (flipX) => {
        this.flipX = flipX;
    }

    destroy = () => {
        this.nameText.destroy();
        super.destroy();
    }


}