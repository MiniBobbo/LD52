import { BaseEntity } from "../entities/BaseEntity";
import { GameEvents } from "../events/GameEvents";
import { IGameAction } from "../interfaces/IGameCommand";
import { GameScene } from "../scenes/GameScene";

/**This is a basic talk action where the text appears above the top of the speaker. */
export class ActionAddInventory implements IGameAction {
    
    type:string;
    gs:GameScene;
    constructor(gs:GameScene, type:string) {
        this.type = type;
        this.gs = gs;
    }
    
    Skip(gs: GameScene) {
    }

    StartAction(gs: GameScene) {
        gs.AddInventory(this.type, false);
    }

    EndAction(gs: GameScene) {
    }
    Duration: number = 0;
    Blocking: boolean = false;

}