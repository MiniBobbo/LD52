import { ActionTalk } from "../gameactions/ActionTalk";
import { ActionWalk } from "../gameactions/ActionWalk";
import { GameScene } from "../scenes/GameScene";
import { BaseEntity } from "./BaseEntity";

export class EScarecrow extends BaseEntity {
    Description: string = 'Creepy Scarecrow';
    LeftDescription = "Check";
    RightDescription = "Kick";
    // RightDescription = "Kick";
    LeftAction(gs: GameScene): void {
        let walkPoint = this.instance.fieldInstances.find(i=>i.__identifier == 'Destination');
        if(walkPoint != undefined) {
            let pt = walkPoint.__value as {cx:number, cy:number};
            gs.GameActionQueue.push(new ActionWalk(gs.player, gs.player.sprite as any, {x:pt.cx, y:pt.cy}));
        }
            
        gs.GameActionQueue.push(new ActionTalk(gs.player as any, 'What a creepy scarecrow.  This is long text so that we can see how the wrapping works.'));
        this.gs.RunGameActions();
    }
    RightAction(gs: GameScene): void {
        gs.LoadAndRunGameActions([
            new ActionTalk(gs.player as any, 'I\m not kicking someone\'s scarecrow!'),
            new ActionTalk(gs.player as any, 'They worked hard on that.'),
        ]);
    }

    ItemUsed(itemName: string): boolean {
        this.gs.LoadAndRunGameActions([
            new ActionTalk(this.gs.player as any, 'Scarecrows don\'t like bones.'),
        ]);
        return true;
    }


}