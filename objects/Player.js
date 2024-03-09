


export class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, characterName, name) {
        super(scene, x, y, name);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;

        this.damage = 10;
        this.jumpPower = 20;
        this.speed = 20;
        this.jumpSpeed = 40;
        this.isJumping = false;
        this.jumpCount = 0;

        this.body.setSize(16, 28);
        this.scale = 1.2;

        this.characterName = characterName;

        // this.setCollideWorldBounds(true);
        this.preload();

    }

    preload = () => {

        this.scene.load.once('complete', this.create, this.scene);
        this.scene.load.start();
    }

    create = () => {

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.wasdKeys = this.scene.input.keyboard.addKeys({ up: 'w', left: 'a', down: 's', right: 'd' });

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


        this.scene.events.on('update', (t, dt) => { this.update(t, dt) });

    }

    update = (t, dt) => {

        //Spieler nach links bewegen
        if (this.cursors.left.isDown || this.wasdKeys.left.isDown) {
            this.play("run", true);
            this.flipX = true;
            this.setVelocityX(-this.speed * dt);
        } else if (this.cursors.right.isDown || this.wasdKeys.right.isDown) {
            this.play("run", true);
            this.flipX = false;
            this.setVelocityX(this.speed * dt);
        } else {
            this.play("idle", true);
            this.setVelocityX(0);
        }

        //Spieler springt
        if ((Phaser.Input.Keyboard.JustDown(this.cursors.up) || Phaser.Input.Keyboard.JustDown(this.wasdKeys.up)) && this.jumpCount < 2) {
            this.jumpCount += 1;
            this.setVelocityY(-this.jumpSpeed * dt);
        }

        //Schauen ob Spieler den Boden berührt
        if (this.body.velocity.y == 0) {
            this.jumpCount = 0;
        }

        //Spiele spring oder fall Animation ab
        if (this.body.velocity.y < 0) {
            this.play("jump", true);

        }
        else if (this.body.velocity.y > 0) {
            this.play("fall", true);
        }
    }

}