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
        let px = 0;
        let py = 0;
        let width = 50;
        let height = 40;

        if(instance != null) {
            px = instance.px[0];
            py = instance.px[1];
            width = instance.width;
            height = instance.height;
        }
        this.instance = instance;
        this.interactZone = gs.add.zone(px, py, width, height)
        .setOrigin(0,0)
        .setInteractive()
        .on('pointerover', (p:Phaser.Input.Pointer, x:number, y:number, e:Phaser.Types.Input.EventData) => {gs.events.emit(GameEvents.OVER_ENTITY, {entity:this, p:p, e:e})})
        .on('pointerout', (p:Phaser.Input.Pointer, e:Phaser.Types.Input.EventData) => {gs.events.emit(GameEvents.OUT_ENTITY, {entity:this, p:p, e:e})})
        .on('pointerdown',(p:Phaser.Input.Pointer, x:number, y:number, e:Phaser.Types.Input.EventData) => {gs.events.emit(GameEvents.CLICK_ENTITY, {entity:this, p:p, e:e})})

        
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