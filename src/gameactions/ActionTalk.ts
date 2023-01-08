import { throws } from "assert";
import { BaseEntity } from "../entities/BaseEntity";
import { IGameAction } from "../interfaces/IGameCommand";
import { GameScene } from "../scenes/GameScene";

/**This is a basic talk action where the text appears above the top of the speaker. */
export class ActionTalk implements IGameAction {
    speaker:{topx:number, topy:number};
    text:string;
    duration:number;

    constructor(speaker:BaseEntity, text:string, duration:number = 0) {
        this.speaker = speaker;
        this.text = text;
        this.Duration = duration;
        if(duration == 0) {
            this.Duration = text.length * 60;
            if (this.Duration < 1200)
                this.Duration = 1200;
        }
    }
    
    Skip(gs: GameScene) {
        this.EndAction(gs);
        gs.timer.destroy();
        gs.RunGameActions();
    }

    StartAction(gs: GameScene) {
        //TODO: Get the speech box location right and take into account the edges of the screen.
        gs.DisplayText(this.speaker.topx, this.speaker.topy, this.text);
    }
    EndAction(gs: GameScene) {
        gs.HideText();
    }
    Duration: number = 1000;
    Blocking: boolean = false;

}