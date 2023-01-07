import { throws } from "assert";
import { IEntity } from "../interfaces/IEntity";
import { GameScene } from "../scenes/GameScene";

export class TextOverlay {
    gs:GameScene;
    c:Phaser.GameObjects.Container;
    t:Phaser.GameObjects.BitmapText;
    lt:Phaser.GameObjects.BitmapText;
    rt:Phaser.GameObjects.BitmapText;
    
    constructor(gs:GameScene) {
        this.gs = gs;
        this.c = gs.add.container(0,0).setVisible(false);
        this.t = gs.add.bitmapText(0,0,'6px', '').setMaxWidth(200);
        this.lt = gs.add.bitmapText(0,10,'6px', '');
        this.rt = gs.add.bitmapText(100,10,'6px', '');
        this.c.add(this.t);
        this.c.add(this.rt);
        this.c.add(this.lt);
    }

    Reveal(e:IEntity) {
        this.c.setPosition(e.topx, e.topy).setVisible(true);
        this.t.text = e.Description;
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