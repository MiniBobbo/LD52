import { C } from "../../C";
import { GameEvents } from "../../events/GameEvents";
import { Flag } from "../../flags/FlagEnum";
import { ActionAddInventory } from "../../gameactions/ActionAddInventory";
import { ActionTalk } from "../../gameactions/ActionTalk";
import { GameScene } from "../../scenes/GameScene";
import { BaseInventory } from "../BaseInventory"

export class InvEnvelope extends BaseInventory {
    create(gs:GameScene) {
        super.create(gs);
        this.Description = 'Envelope';
        this.LeftDescription = 'Examine';
        this.RightDescription = 'Open';
        this.sprite.setFrame("Items_0");
        this.LeftAction = (gs:GameScene) => {
            gs.LoadAndRunGameActions([
                new ActionTalk(gs.player as any, "My Uncle's last will and testiment." ),
                new ActionTalk(gs.player as any, "He left me his farm.  I didn't know he had one." ),
                new ActionTalk(gs.player as any, "I'll check it out this weekend and be back in the city by Monady." )
            ]);
        };
        this.RightAction = (gs:GameScene) => {
            if(!C.checkFlag(Flag.Opened_Letter, false)) {
                C.setFlag(Flag.Opened_Letter, true);
                gs.LoadAndRunGameActions([
                    new ActionTalk(gs.player as any, "The envelope has a letter and a key." ),
                    new ActionAddInventory(gs, 'Will'),
                    new ActionAddInventory(gs, 'Key'),
                ]);
            } else {
                gs.LoadAndRunGameActions([
                    new ActionTalk(gs.player as any, "There is nothing else in the envelope." ),
                ]);
            }
        };
    }

    ItemUseFailEvent(): void {
        this.gs.LoadAndRunGameActions([
            new ActionTalk(this.gs.player as any, 'I shouldn\'t use the bone on that.')
        ]);
    
    }
}