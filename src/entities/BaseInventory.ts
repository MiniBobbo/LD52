import { runInThisContext } from "vm";
import { GameEvents } from "../events/GameEvents";
import { EntityInstance } from "../map/LDtkReader";
import { GameScene } from "../scenes/GameScene";
import { ActorEntity } from "./ActorEntity";

export class BaseInventory extends ActorEntity {
    sprite:Phaser.GameObjects.Sprite;
    create(gs:GameScene, instance:EntityInstance = null) {
        super.create(gs, instance);
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