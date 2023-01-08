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
    light:Phaser.GameObjects.Light;

    currentPath:P[];
    walkDuration:number = 100;
    CurrentlyMoving: boolean = false;

    constructor(gs:GameScene, x:number, y:number) {
        this.gs = gs;
        this.sprite = gs.add.sprite(x,y,'atlas', 'player_stand_0')
        .setSize(14,22).setOrigin(.5, 1).setPipeline('Lifght2D');
        gs.events.on('update', this.update, this);
        gs.events.on('destroy', this.destroy, this);
        this.light = gs.lights.addLight(this.sprite.x, this.sprite.y, 40, 0xffffff, 1);
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
            onComplete:() => {
                this.MoveStep();
                this.gs.events.emit(GameEvents.ENTITY_CHANGE_TILE, this, nextTile);
            }
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
        this.sprite.setDepth(this.sprite.y);
        this.light.setPosition(this.sprite.x+4, this.sprite.y-3);
    }
}