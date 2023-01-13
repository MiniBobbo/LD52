import { throws } from "assert";
import { GameEvents } from "../events/GameEvents";
import { IEntity } from "../interfaces/IEntity";
import { EntityInstance } from "../map/LDtkReader";
import { GameScene } from "../scenes/GameScene";

export class BaseEntity implements IEntity {
    ItemUsed(itemName: string): boolean {
        return false;
    }
    RequiredFlag: number;
    topx: number;
    topy: number;
    
    interactZone:Phaser.GameObjects.Zone;
    gs:GameScene;

    instance:EntityInstance;

    create(gs:GameScene, instance:EntityInstance) {
        this.gs = gs;
        this.instance = instance;
        this.interactZone = gs.add.zone(instance.px[0], instance.px[1], instance.width, instance.height)
        .setOrigin(0,0)
        .setInteractive()
        .on('pointerover', (p:Phaser.Input.Pointer, e:Phaser.Types.Input.EventData)=> {gs.events.emit(GameEvents.OVER_ENTITY, {entity:this, pointer:p, event:e})})
        .on('pointerout', (p:Phaser.Input.Pointer, e:Phaser.Types.Input.EventData)=> {gs.events.emit(GameEvents.OUT_ENTITY, this, p,e)})
        .on('pointerdown', (p:Phaser.Input.Pointer, e:Phaser.Types.Input.EventData) => {gs.events.emit(GameEvents.CLICK_ENTITY, this, p,e)});

        // .on('pointerover', ()=> {
        //     gs.events.emit(GameEvents.START_TEXT_OVERLAY, this);
        //     gs.events.emit(GameEvents.START_OVER_ENTITY, this);
        // })
        // .on('pointerout', ()=> {
        //     gs.events.emit(GameEvents.END_TEXT_OVERLAY, this);
        //     gs.events.emit(GameEvents.END_OVER_ENTITY, this);
        // })
        // .on('pointerdown', (p:Phaser.Input.Pointer, x:number, y:number, event:Phaser.Types.Input.EventData)=> {
        //         if(!this.gs.AllowPlayerInteractions)
        //             return;
        //             event.stopPropagation();
        //             if(gs.UseItem) {
        //                 if(!this.ItemUsed(gs.ItemBeingUsed.ID)) 
        //                     gs.ItemBeingUsed.ItemUseFailEvent();
        //                 gs.ReleaseItemToUse();
        //                 return;
        //          }
   
        //             if(p.leftButtonDown() && this.LeftDescription.trim() != '')
        //                 gs.events.emit(GameEvents.LAUNCH_LEFT_ACTION, this);
        //             else if(p.rightButtonDown() && this.RightDescription.trim() != '')
        //                 gs.events.emit(GameEvents.LAUNCH_RIGHT_ACTION, this);
                    
        //     }, this);
        
        this.topx = this.interactZone.getTopCenter().x;
        this.topy = this.interactZone.getTopCenter().y;

    }

    LeftAction(gs: GameScene) {
        throw new Error("Method not implemented.");
    }
    RightAction(gs: GameScene) {
        throw new Error("Method not implemented.");
    }
    dispose() {
        throw new Error("Method not implemented.");
    }
    ID: string;
    Description: string = '';
    LeftDescription: string = '';
    RightDescription: string = '';

}