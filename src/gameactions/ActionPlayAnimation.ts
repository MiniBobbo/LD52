import { ActorEntity } from "../entities/ActorEntity";
import { BaseEntity } from "../entities/BaseEntity";
import { GameEvents } from "../events/GameEvents";
import { IGameAction } from "../interfaces/IGameCommand";
import { GameScene } from "../scenes/GameScene";

export class ActionPlayAnimation implements IGameAction {
    e:ActorEntity;
    Animation:string;
    FlipX:boolean = false;
    constructor(e:ActorEntity, animation:string, flipx:boolean) {
        this.e = e;
        this.Animation = animation;
        this.FlipX = flipx;
    }
    
    Skip(gs: GameScene) {
        this.e.sprite.play(this.Animation);
        this.e.sprite.flipX = this.FlipX;
    }

    StartAction(gs: GameScene) {
        this.e.sprite.play(this.Animation);
        this.e.sprite.flipX = this.FlipX;
    }

    EndAction(gs: GameScene) {
    }
    Duration: number = 0;
    Blocking: boolean = false;

}