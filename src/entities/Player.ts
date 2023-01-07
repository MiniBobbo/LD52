import { GameScene } from "../scenes/GameScene";

export class Player {
    sprite:Phaser.GameObjects.Sprite;
    gs:GameScene;
    constructor(gs:GameScene, x:number, y:number) {
        this.gs = gs;
        this.sprite = gs.add.sprite(x,y,'atlas', 'player_stand_0');

    }
}