import { ActionTalk } from "../gameactions/ActionTalk";
import { GameScene } from "../scenes/GameScene";
import { BaseEntity } from "./BaseEntity";

export class EScarecrow extends BaseEntity {
    Description: string = 'Creepy Scarecrow';
    LeftDescription = "Check";
    // RightDescription = "Kick";
    LeftAction(gs: GameScene): void {
        gs.GameActionQueue.push(new ActionTalk(gs.player as any, 'What a creepy scarecrow'));
        this.gs.RunGameActions();
    }
    RightAction(gs: GameScene): void {
        console.log('Kicked Scarecrow');
    }

}