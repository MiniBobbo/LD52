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
    h:number = 0;
    
    constructor(gs:GameScene) {
        this.gs = gs;
        this.c = gs.add.container(0,0).setVisible(false).setDepth(1);
        this.t = gs.add.text(0,0,'').setWordWrapWidth(100).setFontSize(10).setAlign('left')
        .setFixedSize(100, 40)
        .setLineSpacing(-5)
        .setFontFamily('Arial')
        // .setShadow(0,0,'0x000000', 2, true, true)
        .setStroke('0x000000', 4)
        ;
        this.lt = gs.add.text(10,12, '').setWordWrapWidth(200).setFontSize(10)
        .setStroke('0x000000', 4)
        .setAlign('center').setFontFamily('Arial');
        this.rt = gs.add.text(10,26, '').setWordWrapWidth(200).setFontSize(10)
        .setStroke('0x000000', 4)
        .setAlign('center').setFontFamily('Arial');
        this.ls = gs.add.image(0,16, 'atlas', "MouseButtons_0").setOrigin(0,0).setVisible(false);
        this.rs = gs.add.image(0,26, 'atlas', "MouseButtons_1").setOrigin(0,0).setVisible(false);
        this.g = gs.add.graphics();
        this.c.add(this.g);
        this.c.add(this.t);
        this.c.add(this.rt);
        this.c.add(this.lt);
        this.c.add(this.ls);
        this.c.add(this.rs);
        gs.DisplayLayer.add(this.c);
        this.gs.events.on('update', this.Update, this);
    }

    Update() {
        let lines = this.t.getWrappedText().length;

        let x = this.gs.input.activePointer.worldX + 20;
        let y = this.gs.input.activePointer.worldY - 20;
        x = Phaser.Math.Clamp(x, 0, this.gs.cameras.main.width - this.t.width-4);
        y = Phaser.Math.Clamp(y, 0, this.gs.cameras.main.height - this.h);
        this.c.setPosition(x, y).setVisible(true);
        // this.c.setPosition(this.gs.input.pointer1.x, this.gs.input.pointer1.y);
    }

    Reveal(e:IEntity) {
        // this.t.text = e.Description;
        this.t.text = e.Description;
        let lines = this.t.getWrappedText().length;
        let yspace = 11;
        this.lt.y = yspace * (lines);
        this.ls.y = yspace * (lines)+4;
        this.rt.y = yspace * (lines+1);
        this.rs.y = yspace * (lines+1)+4;
        this.h = yspace * (lines+2)+4;
        
        this.lt.text = e.LeftDescription;
        this.rt.text = e.RightDescription;
        this.ls.setVisible(e.LeftDescription.trim() != '');
        this.rs.setVisible(e.RightDescription.trim() != '');

    }

    Hide() {
        this.t.text = '';
        this.lt.text = '';
        this.rt.text = '';
        this.ls.setVisible(false);
        this.rs.setVisible(false);
    }

    SetText(message) {
        this.t.text = message;
        this.lt.text = '';
        this.rt.text = '';
        this.ls.setVisible(false);
        this.rs.setVisible(false);

    }
}