import { BaseEntity } from "../entities/BaseEntity";
import { GameEvents } from "../events/GameEvents";
import { IGameAction } from "../interfaces/IGameCommand";
import { GameScene } from "../scenes/GameScene";

export class ActionWait implements IGameAction {
    
    gs:GameScene;


    constructor(gs:GameScene, waitTime:number = 300) {
        this.gs = gs;
        this.Duration = waitTime;
    }
    
    Skip(gs: GameScene) {
    }

    StartAction(gs: GameScene) {

    }

    EndAction(gs: GameScene) {
    }
    Duration: number = 0;
    Blocking: boolean = false;

}