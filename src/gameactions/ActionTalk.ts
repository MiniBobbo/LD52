import { BaseEntity } from "../entities/BaseEntity";
import { IGameAction } from "../interfaces/IGameCommand";
import { GameScene } from "../scenes/GameScene";

/**This is a basic talk action where the text appears above the top of the speaker. */
export class ActionTalk implements IGameAction {
    speaker:{topx:number, topy:number};
    text:string;

    constructor(speaker:BaseEntity, text:string) {
        this.speaker = speaker;
        this.text = text;
    }
    
    Skip(gs: GameScene) {
        this.EndAction(gs);
    }

    StartAction(gs: GameScene) {
        //TODO: Get the speech box location right and take into account the edges of the screen.
        gs.speech.setVisible(true)
        .setPosition(this.speaker.topx, this.speaker.topy)
        .setText(this.text);
    }
    EndAction(gs: GameScene) {
        gs.speech.setVisible(false);
    }
    Duration: number = 1000;
    Blocking: boolean = false;

}