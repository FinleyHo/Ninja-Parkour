export class Saw extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {

        super(scene, x, y, "saw");

        scene.add.existing(this);

        scene.physics.add.existing(this);
        
    } 

    create = () => {

        //Erstelle Stehanimation
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('saw_idle'),
            frameRate: 20,
            repeat: -1
        });
        this.play("idle", true);
    }
   

    jump = (player) => {
    
    }

