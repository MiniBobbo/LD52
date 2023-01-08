import { throws } from "assert";
import { IEntity } from "../interfaces/IEntity";
import { GameScene } from "../scenes/GameScene";

export class TextOverlay {
    gs:GameScene;
    c:Phaser.GameObjects.Container;
    t:Phaser.GameObjects.Text;
    lt:Phaser.GameObjects.Text;
    rt:Phaser.GameObjects.Text;
    ls:Phaser.GameObjects.Image;
    rs:Phaser.GameObjects.Image;
    g:Phaser.GameObjects.Graphics;
    
    constructor(gs:GameScene) {
        this.gs = gs;
        this.c = gs.add.container(0,0).setVisible(false);
        this.t = gs.add.text(0,0,'').setWordWrapWidth(200).setFontSize(12).setAlign('center').setFontFamily('Arial');
        this.lt = gs.add.text(10,12, '').setWordWrapWidth(200).setFontSize(10).setAlign('center').setFontFamily('Arial');
        this.rt = gs.add.text(70,12, '').setWordWrapWidth(200).setFontSize(10).setAlign('center').setFontFamily('Arial');
        this.ls = gs.add.image(0,14, 'atlas', "MouseButtons_0").setOrigin(0,0);
        this.rs = gs.add.image(60,14, 'atlas', "MouseButtons_1").setOrigin(0,0);
        this.g = gs.add.graphics();
        this.c.add(this.g);
        this.c.add(this.t);
        this.c.add(this.rt);
        this.c.add(this.lt);
        this.c.add(this.ls);
        this.c.add(this.rs);
    }

    Reveal(e:IEntity) {
        this.c.setPosition(e.topx, e.topy).setVisible(true);
        // this.t.text = e.Description;
        this.t.text = e.Description;
        this.lt.text = e.LeftDescription;
        this.rt.text = e.RightDescription;
        this.ls.setVisible(e.LeftDescription.trim() != '');
        this.rs.setVisible(e.RightDescription.trim() != '');

    }

    Hide() {
        this.c.setVisible(false);
    }
}