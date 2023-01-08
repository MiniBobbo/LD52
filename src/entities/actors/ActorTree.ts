import { C } from "../../C";
import { ActionAddInventory } from "../../gameactions/ActionAddInventory";
import { ActionRemoveFromScreen } from "../../gameactions/ActionRemoveFromScreen";
import { ActionTalk } from "../../gameactions/ActionTalk";
import { ActionWalk } from "../../gameactions/ActionWalk";
import { EntityInstance } from "../../map/LDtkReader";
import { GameScene } from "../../scenes/GameScene";
import { ActorEntity } from "../ActorEntity";

export class ActorTree extends ActorEntity {
    create(gs:GameScene, e:EntityInstance) {
        super.create(gs, e);
        this.sprite = gs.add.sprite(e.px[0], e.px[1], 'atlas', 'tree_sway_0').setOrigin(.5,1).setPipeline('Light2D');
        this.Description = 'Tree';
        this.LeftDescription = 'Look at';
    }

    LeftAction(gs: GameScene): void {
        let walkPoint = this.instance.fieldInstances.find(i=>i.__identifier == 'Destination');
        if(walkPoint != undefined && walkPoint.__value != null) {
            let pt = walkPoint.__value as {cx:number, cy:number};
            gs.GameActionQueue.push(new ActionWalk(gs.player, gs.player.sprite as any, {x:pt.cx, y:pt.cy}));
        }
        gs.GameActionQueue.push(new ActionTalk(gs.player as any, 'No leaves or anything.'));
        gs.GameActionQueue.push(new ActionTalk(gs.player as any, 'Not much of a harvest this year.'));
        gs.RunGameActions();
    }


    Disable() {

    }
}