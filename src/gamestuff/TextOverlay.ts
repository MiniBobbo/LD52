import { throws } from "assert";
import { IEntity } from "../interfaces/IEntity";
import { GameScene } from "../scenes/GameScene";

export class TextOverlay {
    gs:GameScene;
    c:Phaser.GameObjects.Container;
    t:Phaser.GameObjects.BitmapText;
    t2:Phaser.GameObjects.Text;
    lt:Phaser.GameObjects.BitmapText;
    rt:Phaser.GameObjects.BitmapText;
    g:Phaser.GameObjects.Graphics;
    
    constructor(gs:GameScene) {
        this.gs = gs;
        this.c = gs.add.container(0,0).setVisible(false);
        this.t = gs.add.bitmapText(0,0,'6px', '').setMaxWidth(200);
        this.t2 = gs.add.text(0,0,'').setWordWrapWidth(200).setFontSize(12).setAlign('center');
        this.lt = gs.add.bitmapText(10,12,'6px', '');
        this.rt = gs.add.bitmapText(100,10,'6px', '');
        this.g = gs.add.graphics();
        this.c.add(this.g);
        this.c.add(this.t);
        this.c.add(this.t2);
        this.c.add(this.rt);
        this.c.add(this.lt);
        this.c.add(gs.add.image(0,12, 'atlas', "MouseButtons_0"));
        this.c.add(gs.add.image(90,12, 'atlas', "MouseButtons_0"));
    }

    Reveal(e:IEntity) {
        this.c.setPosition(e.topx, e.topy).setVisible(true);
        // this.t.text = e.Description;
        this.t2.text = e.Description;
        this.lt.text = e.LeftDescription;
        this.rt.text = e.RightDescription;
        if(e.LeftDescription.trim() != '') {
            // this.lt.
        }

    }

    Hide() {
        this.c.setVisible(false);
    }
}