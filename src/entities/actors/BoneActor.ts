import { C } from "../../C";
import { ActionAddInventory } from "../../gameactions/ActionAddInventory";
import { ActionTalk } from "../../gameactions/ActionTalk";
import { EntityInstance } from "../../map/LDtkReader";
import { GameScene } from "../../scenes/GameScene";
import { ActorEntity } from "../ActorEntity";

export class BoneActor extends ActorEntity {
    create(gs:GameScene, e:EntityInstance) {
        super.create(gs, e);
        this.sprite = gs.add.sprite(e.px[0], e.px[1], 'atlas', 'Bone').setOrigin(0,0);
        this.Description = 'What is that?';
        this.LeftDescription = 'Investigate';
    }

    LeftAction(gs: GameScene): void {
        gs.LoadAndRunGameActions(
            [
                new ActionTalk(gs.player as any, 'It is a bone.  I guess I\'ll take it.'),
                new ActionAddInventory(gs, "Bone")
            ]
        );
        this.RemoveFromScreen();
        gs.EndOverlay();
        C.setFlag('Bone', false);
    }


    Disable() {

    }
}