import { GameEvents } from "../../events/GameEvents";
import { ActionTalk } from "../../gameactions/ActionTalk";
import { GameScene } from "../../scenes/GameScene";
import { BaseInventory } from "../BaseInventory"

export class InvBone extends BaseInventory {
    create(gs:GameScene) {
        super.create(gs);
        this.Description = 'Human(?) Bone';
        this.RightDescription = 'Examine';
        this.LeftDescription = 'Use on';
        this.sprite.setFrame("Bone");
        this.RightAction = (gs:GameScene) => {
            gs.LoadAndRunGameActions([
                new ActionTalk(gs.player as any, 'Looks human, but I can\'t be sure.')
            ]);
        };
        this.LeftAction = (gs:GameScene) => {
            gs.BindItemToUse(this);
        };
    }

    ItemUseFailEvent(): void {
        this.gs.LoadAndRunGameActions([
            new ActionTalk(this.gs.player as any, 'I shouldn\'t use the bone on that.')
        ]);
    
    }
}