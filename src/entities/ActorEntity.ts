import { GameEvents } from "../events/GameEvents";
import { EntityInstance } from "../map/LDtkReader";
import { GameScene } from "../scenes/GameScene";
import { BaseEntity } from "./BaseEntity";

export class ActorEntity extends BaseEntity {
    sprite:Phaser.GameObjects.Sprite;
    create(gs:GameScene, instance:EntityInstance) {
        this.instance = instance;
        this.gs = gs;
        this.interactZone = gs.add.zone(instance.px[0], instance.px[1], instance.width, instance.height)
        .setOrigin(.5,1)
        .setInteractive()
        // .on('gameobjectover', ()=> {gs.events.emit(GameEvents.START_TEXT_OVERLAY, this)})
        .on('pointerover', ()=> {gs.events.emit(GameEvents.OVER_ENTITY, this)})
        .on('pointerout', ()=> {gs.events.emit(GameEvents.OUT_ENTITY, this)})
        .on('pointerdown', () => {gs.events.emit(GameEvents.CLICK_ENTITY, this)});
            // event.stopPropagation();
            //         if(p.leftButtonDown() && this.LeftDescription.trim() != '')
            //             gs.events.emit(GameEvents.LAUNCH_LEFT_ACTION, this);
            //         else if(p.rightButtonDown() && this.RightDescription.trim() != '')
            //             gs.events.emit(GameEvents.LAUNCH_RIGHT_ACTION, this);

            // }, this);
        gs.events.on('update', this.update, this);
        gs.events.on('destroy', this.destroy, this);
        this.topx = this.interactZone.getTopCenter().x;
        this.topy = this.interactZone.getTopCenter().y;

    }
    destroy() {
        this.gs.events.removeListener('update', this.update, this);
        this.gs.events.removeListener('destroy', this.destroy, this);
    }

    update() {
        this.interactZone.x = this.sprite.x;
        this.interactZone.y = this.sprite.y;
    }

    RemoveFromScreen() {
        this.sprite.disableInteractive().setVisible(false).setPosition(-100,-100);

    }

}