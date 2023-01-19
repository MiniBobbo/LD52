import { throws } from "assert";
import { GameEvents } from "../events/GameEvents";
import { ActionChangeScreen } from "../gameactions/ActionChangeScreen";
import { ActionWalk } from "../gameactions/ActionWalk";
import { IEntity } from "../interfaces/IEntity";
import { EntityInstance } from "../map/LDtkReader";
import { GameScene } from "../scenes/GameScene";

export class ChangeScreenEntity implements IEntity {
    RequiredFlag: number;
    topx: number;
    topy: number;
    
    interactZone:Phaser.GameObjects.Zone;
    gs:GameScene;

    nextScreen:string;
    nextPosition:number;

    constructor(ei:EntityInstance) {
        this.nextPosition = ei.fieldInstances.find(i=>i.__identifier == 'Position').__value as number;
        this.nextScreen = ei.fieldInstances.find(i=>i.__identifier == 'NextScreen').__value as string;
        this.LeftDescription = 'Travel';
        this.Description = ei.fieldInstances.find(i=>i.__identifier == 'Description').__value as string;
        
    }
    ItemUsed(itemName: string): boolean {
        return false;
    }
    instance: EntityInstance;

    LeftAction(gs:GameScene) {
        let walkPoint = this.instance.fieldInstances.find(i=>i.__identifier == 'Destination');
        if(walkPoint != undefined && walkPoint.__value != null) {
            let pt = walkPoint.__value as {cx:number, cy:number};
            gs.GameActionQueue.push(new ActionWalk(gs.player, gs.player.sprite as any, {x:pt.cx, y:pt.cy}));
        }
        gs.LoadAndRunGameActions([
            new ActionChangeScreen(this.nextScreen, this.nextPosition)
        ]);
    }

    create(gs:GameScene, instance:EntityInstance) {
        this.instance = instance;
        this.gs = gs;
        this.interactZone = gs.add.zone(instance.px[0], instance.px[1], instance.width, instance.height)
        .setOrigin(0,0)
        .setInteractive()
        // .on('gameobjectover', ()=> {gs.events.emit(GameEvents.START_TEXT_OVERLAY, this)})
        .on('pointerover', (p:Phaser.Input.Pointer, x:number, y:number, e:Phaser.Types.Input.EventData) => {gs.events.emit(GameEvents.OVER_ENTITY, {entity:this, p:p, e:e})})
        .on('pointerout', (p:Phaser.Input.Pointer, e:Phaser.Types.Input.EventData) => {gs.events.emit(GameEvents.OUT_ENTITY, {entity:this, p:p, e:e})})
        .on('pointerdown',(p:Phaser.Input.Pointer, x:number, y:number, e:Phaser.Types.Input.EventData) => {gs.events.emit(GameEvents.CLICK_ENTITY, {entity:this, p:p, e:e})})
        
        // (p:Phaser.Input.Pointer, x:number, y:number, event:Phaser.Types.Input.EventData)=> {
        //     if(!this.gs.AllowPlayerInteractions)
        //     return;
        //     event.stopPropagation();
        //             if(p.leftButtonDown() && this.LeftDescription.trim() != '')
        //             this.LeftAction(this.gs);
                    
        //     }, this);
        
        this.topx = this.interactZone.getTopCenter().x;
        this.topy = this.interactZone.getTopCenter().y;

    }

    RightAction(gs: GameScene) {
    }
    dispose() {
    }
    ID: string;
    Description: string = '';
    LeftDescription: string = '';
    RightDescription: string = '';

}