import { ActionTalk } from "../../gameactions/ActionTalk";
import { GameScene } from "../../scenes/GameScene";
import { BaseInventory } from "../BaseInventory"

export class InvBone extends BaseInventory {
    create(gs:GameScene) {
        super.create(gs);
        this.Description = 'Human(?) Bone';
        this.LeftDescription = 'Examine';
        this.sprite.setFrame("Bone");
        this.LeftAction = (gs:GameScene) => {
            gs.LoadAndRunGameActions([
                new ActionTalk(gs.player as any, 'Looks human, but I can\'t be sure.')
            ]);
        };
    }
}