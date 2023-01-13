import { BaseEntity } from "../entities/BaseEntity";
import { GameEvents } from "../events/GameEvents";
import { Entity } from "../map/LDtkReader";
import { GameScene } from "../scenes/GameScene";
import { IFSM } from "./FSM";
import { FSMModule } from "./FSMModule";

export class FSMNothingSelected extends FSMModule {
    gs:GameScene;
    constructor(gs:GameScene, parent:IFSM) {
        super(parent);
        this.gs = gs;
    }
    moduleStart(args: any): void {
        this.gs.events.on(GameEvents.CLICK_ENTITY, this.SelectEntity, this);
        this.gs.events.on(GameEvents.OVER_ENTITY, this.OverEntity, this);
        this.gs.events.on(GameEvents.OUT_ENTITY, this.OutEntity, this);

    }
    OutEntity(entity:BaseEntity, p:Phaser.Input.Pointer, e:Phaser.Types.Input.EventData) {
        this.gs.to.Hide();
        this.gs.OverThisEntity = null;
        // e.stopPropagation();
        console.log(`Out ${entity.Description}`);

    }

    OverEntity(data:{entity:BaseEntity, p:Phaser.Input.Pointer, e:Phaser.Types.Input.EventData}) {
        this.gs.to.Reveal(data.entity);
        this.gs.OverThisEntity = data.entity;
        // e.stopPropagation();
        console.log(`Over ${data.entity.Description}`);

    }

    SelectEntity(entity:BaseEntity, p:Phaser.Input.Pointer, e:Phaser.Types.Input.EventData) {

        console.log(`Clicked ${entity.Description}`);
        e.stopPropagation();
    }

    moduleEnd(args: any): void {
        this.gs.events.removeListener(GameEvents.CLICK_ENTITY, this.SelectEntity, this);
        this.gs.events.removeListener(GameEvents.OVER_ENTITY, this.OverEntity, this);
        this.gs.events.removeListener(GameEvents.OUT_ENTITY, this.OutEntity, this);
    }
}
