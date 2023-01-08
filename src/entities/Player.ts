import { C } from "../C";
import { GameEvents } from "../events/GameEvents";
import { P } from "../helpers/MoveHelper";
import { IMoveEntity } from "../interfaces/IMoveEntity";
import { GameScene } from "../scenes/GameScene";

export class Player implements IMoveEntity{
    sprite:Phaser.GameObjects.Sprite;
    gs:GameScene;
    topx:number = 0;
    topy:number = 0;

    currentPath:P[];
    walkDuration:number = 100;
    CurrentlyMoving: boolean = false;

    constructor(gs:GameScene, x:number, y:number) {
        this.gs = gs;
        this.sprite = gs.add.sprite(x,y,'atlas', 'player_stand_0')
        .setSize(14,22).setOrigin(.5, 1);
        gs.events.on('update', this.update, this);
        gs.events.on('destroy', this.destroy, this);

    }

    private movetween:Phaser.Tweens.Tween;
    StartMove(bestPath: P[], stepdurationMS: number) {
        if(this.CurrentlyMoving) {
            this.InterruptMove();
        }
        this.CurrentlyMoving = true;
        this.currentPath = bestPath;
        this.walkDuration = stepdurationMS;
        this.MoveStep();
    }

    private MoveStep() {
        if(this.currentPath.length == 0) {
            this.EndMove();
            return;
        }
        let nextTile = this.currentPath.shift();
        
        this.movetween = this.gs.tweens.add({
            targets:this.sprite,
            x:nextTile.x * C.TILE_SIZE,
            y:nextTile.y * C.TILE_SIZE,
            duration:this.walkDuration,
            callbackScope:this,
            onComplete:() => {this.MoveStep();}
        });
    }

    EndMove() {
        this.CurrentlyMoving = false;
        this.gs.events.emit(GameEvents.FINISH_STEP);
    }
    
    InterruptMove() {
        //Stop the animation.
        //Stop the movement.
        this.EndMove();
        this.movetween.destroy();
        // throw new Error("Method not implemented.");
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