import { runInThisContext } from "vm";
import { GameEvents } from "../events/GameEvents";
import { EntityInstance } from "../map/LDtkReader";
import { GameScene } from "../scenes/GameScene";
import { ActorEntity } from "./ActorEntity";

export class BaseInventory extends ActorEntity {
    sprite:Phaser.GameObjects.Sprite;
    create(gs:GameScene, instance:EntityInstance = null) {
        this.gs = gs;
        this.interactZone = gs.add.zone(0,0, 50,40)
        // .setOrigin(0,0)
        .setInteractive()
        // .on('gameobjectover', ()=> {gs.events.emit(GameEvents.START_TEXT_OVERLAY, this)})
        .on('pointerover', ()=> {gs.events.emit(GameEvents.START_TEXT_OVERLAY, this)})
        .on('pointerout', ()=> {gs.events.emit(GameEvents.END_TEXT_OVERLAY, this)})
        .on('pointerdown', (p:Phaser.Input.Pointer, x:number, y:number, event:Phaser.Types.Input.EventData)=> {
            event.stopPropagation();
                    if(p.leftButtonDown() && this.LeftDescription.trim() != '')
                    this.LeftAction(this.gs);
                    else if(p.rightButtonDown() && this.RightDescription.trim() != '')
                    this.RightAction(this.gs);
            }, this);
        gs.events.on('update', this.update, this);
        gs.events.on('destroy', this.destroy, this);
        this.topx = this.interactZone.getTopCenter().x;
        this.topy = this.interactZone.getTopCenter().y;
        this.sprite = gs.add.sprite(-100,-100,'atlas').setSize(50,40);

    }

    SetInventoryPosition(position:number) {
        this.sprite.setPosition(position * 50 + 25, 250);
        this.topx = this.sprite.x;
        this.topy = this.sprite.y - 40;
    }

    ItemUseFailEvent() {
        console.log(`Unable to use ${this.Description}`);
    }

    

}