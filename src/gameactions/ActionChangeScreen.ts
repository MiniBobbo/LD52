import { C } from "../C";
import { BaseEntity } from "../entities/BaseEntity";
import { IGameAction } from "../interfaces/IGameCommand";
import { GameScene } from "../scenes/GameScene";

/**This is a basic talk action where the text appears above the top of the speaker. */
export class ActionChangeScreen implements IGameAction {
    nextScreen:string;
    nextPosition:number;

    constructor(nextScreen:string, nextPosition:number) {
        this.nextScreen = nextScreen;
        this.nextPosition = nextPosition;
    }
    
    Skip(gs: GameScene) {

    }

    StartAction(gs: GameScene) {
        C.currentScreen = `${this.nextScreen}`;
        C.EntryPoint = this.nextPosition;
        gs.scene.start('reset');
    }
    EndAction(gs: GameScene) {
    
    }
    Duration: number = 1000;
    Blocking: boolean = false;

}