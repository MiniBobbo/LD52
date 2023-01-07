import { GameScene } from "../scenes/GameScene";

export class Player {
    sprite:Phaser.GameObjects.Sprite;
    gs:GameScene;
    topx:number = 0;
    topy:number = 0;
    constructor(gs:GameScene, x:number, y:number) {
        this.gs = gs;
        this.sprite = gs.add.sprite(x,y,'atlas', 'player_stand_0')
        .setSize(14,22).setOrigin(.5, 1);
        gs.events.on('update', this.update, this);
        gs.events.on('destroy', this.destroy, this);

    }
    destroy() {
        this.gs.events.removeListener('update', this.update, this);
        this.gs.events.removeListener('destroy', this.destroy, this);
    }
    update() {
        this.topx = this.sprite.x;
        this.topy = this.sprite.y - this.sprite.height;
    }
}