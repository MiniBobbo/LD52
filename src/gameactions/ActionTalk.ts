import { BaseEntity } from "../entities/BaseEntity";
import { IGameAction } from "../interfaces/IGameCommand";
import { GameScene } from "../scenes/GameScene";

export class ActionTalk implements IGameAction {
    speaker:BaseEntity
    text:string;

    constructor(speaker:BaseEntity, text:string) {
        this.speaker = speaker;
        this.text = text;
    }
    
    Skip(gs: GameScene) {
        throw new Error("Method not implemented.");
    }

    StartAction(gs: GameScene) {
        
    }
    EndAction(gs: GameScene) {
        throw new Error("Method not implemented.");
    }
    Duration: number = 1000;
    Blocking: boolean = false;

}