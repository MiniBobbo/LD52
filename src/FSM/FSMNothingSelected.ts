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
        // this.gs.input.on('pointerover', (p:Phaser.Input.Pointer, over:Phaser.GameObjects.GameObject[])=> {
        //     over.forEach(element => {
        //         console.log(`Over ${element.name}`);
        //     });
        // }, this);

    }
    OutEntity(data:{entity:BaseEntity, p:Phaser.Input.Pointer, e:Phaser.Types.Input.EventData}) {
        this.gs.to.Hide();
        this.gs.OverThisEntity = null;
        // data.e.stopPropagation();
        console.log(`Out ${data.entity.Description}, event missing? ${data.e===undefined}`);


    }

    OverEntity(data:{entity:BaseEntity, p:Phaser.Input.Pointer, e:Phaser.Types.Input.EventData}) {
        this.gs.to.Reveal(data.entity);
        this.gs.OverThisEntity = data.entity;
        // data.e.stopPropagation();
        console.log(`Over ${data.entity.Description}, event missing? ${data.e===undefined}`);
        if(data.e ===undefined)
            console.log('event missing.');  
    }

    SelectEntity(data:{entity:BaseEntity, p:Phaser.Input.Pointer, e:Phaser.Types.Input.EventData}) {
        console.log(`Clicked ${data.entity.Description}, event missing? ${data.e===undefined}`);

        data.e.stopPropagation();
    }

    moduleEnd(args: any): void {
        this.gs.events.removeListener(GameEvents.CLICK_ENTITY, this.SelectEntity, this);
        this.gs.events.removeListener(GameEvents.OVER_ENTITY, this.OverEntity, this);
        this.gs.events.removeListener(GameEvents.OUT_ENTITY, this.OutEntity, this);
    }
}
