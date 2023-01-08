import { IEntity } from "../interfaces/IEntity";
import { GameScene } from "../scenes/GameScene";

export class SpeechBox {
    gs:GameScene;
    c:Phaser.GameObjects.Container;
    t:Phaser.GameObjects.Text;
    g:Phaser.GameObjects.Graphics;
    
    constructor(gs:GameScene) {
        this.gs = gs;
        this.c = gs.add.container(0,0).setVisible(false);
        this.t = gs.add.text(-90,-20,'').setWordWrapWidth(180).setSize(180,40)
        .setFontSize(10)
        .setStroke('0x000000', 4)
        .setAlign('center')
        .setFontFamily('Arial')
        .setDepth(2);
        this.g = gs.add.graphics();
        this.c.add(this.g);
        this.c.add(this.t);
        this.g.fillStyle(0x000000, .7);
        this.g.lineStyle(0x555555, 1);
        // this.g.fillRect(-100,-20,200,40);
        gs.DisplayLayer.add(this.c);
    }

    Reveal(x:number, y:number, message:string) {
        x = Phaser.Math.Clamp(x, 0, this.gs.cameras.main.width - 75);
        y = Phaser.Math.Clamp(y, 0, this.gs.cameras.main.height);
        this.c.setPosition(x, y - 40).setVisible(true);
        // this.t.text = e.Description;
        this.t.text = message;

    }

    Hide() {
        this.c.setVisible(false);
    }
}