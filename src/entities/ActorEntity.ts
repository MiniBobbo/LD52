import { GameEvents } from "../events/GameEvents";
import { EntityInstance } from "../map/LDtkReader";
import { GameScene } from "../scenes/GameScene";
import { BaseEntity } from "./BaseEntity";

export class ActorEntity extends BaseEntity {
    sprite:Phaser.GameObjects.Sprite;
    create(gs:GameScene, instance:EntityInstance) {
        super.create(gs, instance);
        this.interactZone.setOrigin(0,0)
        gs.events.on('update', this.update, this);
        gs.events.on('destroy', this.destroy, this);

    }
    destroy() {
        this.gs.events.removeListener('update', this.update, this);
        this.gs.events.removeListener('destroy', this.destroy, this);
    }

    update() {
        // this.interactZone.x = this.sprite.x - this.interactZone.width/2;
        // this.interactZone.y = this.sprite.y - this.interactZone.height/2;
    }

    RemoveFromScreen() {
        this.sprite.disableInteractive().setVisible(false).setPosition(-100,-100);
    }

}