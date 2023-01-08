import { ActionTalk } from "../gameactions/ActionTalk";
import { ActionWalk } from "../gameactions/ActionWalk";
import { GameScene } from "../scenes/GameScene";
import { BaseEntity } from "./BaseEntity";

export class EScarecrow extends BaseEntity {
    Description: string = 'Creepy Scarecrow';
    LeftDescription = "Check";
    // RightDescription = "Kick";
    LeftAction(gs: GameScene): void {
        let walkPoint = this.instance.fieldInstances.find(i=>i.__identifier == 'Destination');
        if(walkPoint != undefined) {
            let pt = walkPoint.__value as {cx:number, cy:number};
            gs.GameActionQueue.push(new ActionWalk(gs.player, gs.player.sprite as any, {x:pt.cx, y:pt.cy}, 100));
        }
            
        gs.GameActionQueue.push(new ActionTalk(gs.player as any, 'What a creepy scarecrow'));
        this.gs.RunGameActions();
    }
    RightAction(gs: GameScene): void {
        console.log('Kicked Scarecrow');
    }

}