import { C } from "../../C";
import { GameEvents } from "../../events/GameEvents";
import { Flag } from "../../flags/FlagEnum";
import { ActionAddInventory } from "../../gameactions/ActionAddInventory";
import { ActionTalk } from "../../gameactions/ActionTalk";
import { ActionWait } from "../../gameactions/ActionWait";
import { GameScene } from "../../scenes/GameScene";
import { BaseInventory } from "../BaseInventory"

export class InvWill extends BaseInventory {
    create(gs:GameScene) {
        super.create(gs);
        this.Description = 'Will';
        this.LeftDescription = 'Read';
        this.sprite.setFrame("Items_2");
        this.LeftAction = (gs:GameScene) => {
            gs.LoadAndRunGameActions([
                new ActionTalk(gs.player as any, "This says that I own the farm." ),
                new ActionTalk(gs.player as any, "...", 2500 ),
                new ActionTalk(gs.player as any, "I don't really want a farm..." ),
            ]);
        };
    }

    ItemUseFailEvent(): void {
        this.gs.LoadAndRunGameActions([
            new ActionTalk(this.gs.player as any, "How did you even see this?")
        ]);
    
    }
}