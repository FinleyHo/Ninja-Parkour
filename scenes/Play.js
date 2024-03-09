

import { Player } from '../objects/Player.js';

export class Play extends Phaser.Scene {

    constructor() {
        super('play');
        this.player = null;
    }

    create() {

        //Level erstellen
        const map = this.make.tilemap({ key: "level1" });

        //Erstelle Kachelsets/Tileset
        const backBrownTileset = map.addTilesetImage("back_brown", "back_brown_img");
        const terrainTileset = map.addTilesetImage("terrain", "terrain_img");
        const terrainCollideTileset = map.addTilesetImage("terrain_collide", "terrain_img");
        const spikesTileset = map.addTilesetImage("spikes", "spikes_img");
        const fireTileset = map.addTilesetImage("fire", "fire_img");

        //Erstelle Ebenen/Layer
        const backgroundLayer = map.createLayer("background", backBrownTileset);
        const terrainLayer = map.createLayer("terrain", [terrainTileset, terrainCollideTileset]);
        const trapsLayer = map.createLayer("traps", [spikesTileset, fireTileset]);

        //Erstelle Spieler
        this.player = new Player(this, 100, 2000, "Pink Man", 'Max');

        //Kamera verfolgt Spieler
        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setZoom(1.4);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        //Erstelle Kollision mit den Blöcken
        terrainLayer.setCollisionByProperty({ collide: true });
        this.physics.add.collider(this.player, terrainLayer);

        //Erstelle Kollision mit den Fallen
        trapsLayer.setCollisionByProperty({ kill: true});
        this.physics.add.collider(this.player, terrainLayer);
        
        //Erstelle ein Trampolin für jedes Trampolin in der Trampolinebene
        const trampolinesLayer = map.getObjectLayer("trampolines");
        const trampolines = [];
        for (const trampoline of trampolinesLayer.objects) {
            const newTrampoline = new Trampoline(this, trampoline.x, trampoline.y)
            trampolines.push(newTrampoline);  
        }

        //Kollision mit Trampolinen
        this.physics.add.collide(this.player, trampolines, )
    }

    update() {
    }

}