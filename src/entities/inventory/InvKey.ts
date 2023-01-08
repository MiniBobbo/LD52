import { C } from "../../C";
import { GameEvents } from "../../events/GameEvents";
import { Flag } from "../../flags/FlagEnum";
import { ActionAddInventory } from "../../gameactions/ActionAddInventory";
import { ActionTalk } from "../../gameactions/ActionTalk";
import { GameScene } from "../../scenes/GameScene";
import { BaseInventory } from "../BaseInventory"

export class InvKey extends BaseInventory {
    create(gs:GameScene) {
        super.create(gs);
        this.Description = 'Old Key';
        this.LeftDescription = 'Use';
        this.RightDescription = 'Examine';
        this.sprite.setFrame("Items_1");
        this.LeftAction = (gs:GameScene) => {
            gs.BindItemToUse(this);
        };
        this.RightAction = (gs:GameScene) => {
            gs.LoadAndRunGameActions([
                new ActionTalk(gs.player as any, "An old key, probably to the house or something." ),
            ]);
        };
    }

    ItemUseFailEvent(): void {
        this.gs.LoadAndRunGameActions([
            new ActionTalk(this.gs.player as any, "I can't unlock that.")
        ]);
    
    }
}