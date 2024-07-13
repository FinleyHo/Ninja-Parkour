export class Trampoline extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        //Aufruf der Konstruktor Methode von Phaser.Physics.Arcade.Sprite   
        super(scene, x + 14, y - 14, "trampoline");

        //Hinzufügen des Objekts zur Szene
        scene.add.existing(this);

        //Hinzufügen des Objekts zur Physik Engine
        scene.physics.add.existing(this);

        //Größe der Bounding Box
        this.body.setSize(24, 14);

        //Verschiebe Bounding Box
        this.body.offset.x = 1;
        this.body.offset.y = 16;

        //Deaktiviere gravity
        this.body.allowGravity = false;

        //Nicht bewegbar
        this.body.immovable = true;

        this.jumpPower = -800;

        this.create();
    }

    create = () => {
        //Erstelle Stehanimation
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('trampoline_idle'),
            frameRate: 20,
            repeat: 0
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('trampoline_jump'),
            frameRate: 20,
            repeat: 0
        });
        this.play("idle");
    }

    jump = (player) => {
        this.play("jump");
        this.chain("idle");
        player.setVelocityY(this.jumpPower);
    }

}