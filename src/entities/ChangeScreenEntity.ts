import { throws } from "assert";
import { GameEvents } from "../events/GameEvents";
import { ChangeScreenAction } from "../gameactions/ChangeScreenAction";
import { IEntity } from "../interfaces/IEntity";
import { EntityInstance } from "../map/LDtkReader";
import { GameScene } from "../scenes/GameScene";

export class ChangeScreenEntity implements IEntity {
    RequiredFlag: number;
    topx: number;
    topy: number;
    
    interactZone:Phaser.GameObjects.Zone;
    gs:GameScene;

    nextScreen:number;
    nextPosition:number;

    constructor(ei:EntityInstance) {
        this.nextPosition = ei.fieldInstances.find(i=>i.__identifier == 'Position').__value as number;
        this.nextScreen = ei.fieldInstances.find(i=>i.__identifier == 'NextScreen').__value as number;
        this.LeftDescription = 'Travel';
        this.Description = ei.fieldInstances.find(i=>i.__identifier == 'Description').__value as string;
        
    }

    LeftAction(gs:GameScene) {
        gs.LoadAndRunGameActions([
            new ChangeScreenAction(this.nextScreen, this.nextPosition)
        ]);
    }

    create(gs:GameScene, instance:EntityInstance) {
        this.gs = gs;
        this.interactZone = gs.add.zone(instance.px[0], instance.px[1], instance.width, instance.height)
        .setOrigin(0,0)
        .setInteractive()
        // .on('gameobjectover', ()=> {gs.events.emit(GameEvents.START_TEXT_OVERLAY, this)})
        .on('pointerover', ()=> {gs.events.emit(GameEvents.START_TEXT_OVERLAY, this)})
        .on('pointerout', ()=> {gs.events.emit(GameEvents.END_TEXT_OVERLAY, this)})
        .on('pointerdown', (p:Phaser.Input.Pointer, x:number, y:number, event:Phaser.Types.Input.EventData)=> {
                    if(p.leftButtonDown() && this.LeftDescription.trim() != '')
                    this.LeftAction(this.gs);
                    
            }, this);
        
        this.topx = this.interactZone.getTopCenter().x;
        this.topy = this.interactZone.getTopCenter().y;

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