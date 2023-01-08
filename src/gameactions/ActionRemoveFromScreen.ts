import { ActorEntity } from "../entities/ActorEntity";
import { BaseEntity } from "../entities/BaseEntity";
import { GameEvents } from "../events/GameEvents";
import { IGameAction } from "../interfaces/IGameCommand";
import { GameScene } from "../scenes/GameScene";

export class ActionRemoveFromScreen implements IGameAction {
    e:ActorEntity;
    constructor(e:ActorEntity) {
        this.e = e;
    }
    
    Skip(gs: GameScene) {
        this.e.RemoveFromScreen();
    }

    StartAction(gs: GameScene) {
        this.e.RemoveFromScreen();
    }

    EndAction(gs: GameScene) {
    }
    Duration: number = 0;
    Blocking: boolean = false;

}