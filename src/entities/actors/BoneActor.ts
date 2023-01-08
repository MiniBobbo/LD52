import { C } from "../../C";
import { ActionAddInventory } from "../../gameactions/ActionAddInventory";
import { ActionRemoveFromScreen } from "../../gameactions/ActionRemoveFromScreen";
import { ActionTalk } from "../../gameactions/ActionTalk";
import { ActionWalk } from "../../gameactions/ActionWalk";
import { EntityInstance } from "../../map/LDtkReader";
import { GameScene } from "../../scenes/GameScene";
import { ActorEntity } from "../ActorEntity";

export class BoneActor extends ActorEntity {
    create(gs:GameScene, e:EntityInstance) {
        super.create(gs, e);
        this.sprite = gs.add.sprite(e.px[0], e.px[1], 'atlas', 'Bone').setOrigin(0,0).setPipeline('Light2D');
        this.Description = 'What is that?';
        this.LeftDescription = 'Investigate';
    }

    LeftAction(gs: GameScene): void {
        let walkPoint = this.instance.fieldInstances.find(i=>i.__identifier == 'Destination');
        if(walkPoint != undefined) {
            let pt = walkPoint.__value as {cx:number, cy:number};
            gs.GameActionQueue.push(new ActionWalk(gs.player, gs.player.sprite as any, {x:pt.cx, y:pt.cy}));
        }
        gs.GameActionQueue.push(new ActionTalk(gs.player as any, 'It is a bone.  I guess I\'ll take it.'));
        gs.GameActionQueue.push(new ActionAddInventory(gs, "Bone"));
        gs.GameActionQueue.push(new ActionRemoveFromScreen(this));

        gs.RunGameActions();
        // gs.EndOverlay();
        C.setFlag('Bone', false);
    }


    Disable() {

    }
}