import { C } from "../C";
import { ActorEntity } from "../entities/ActorEntity";
import { BoneActor } from "../entities/actors/BoneActor";
import { BaseEntity } from "../entities/BaseEntity";
import { BaseInventory } from "../entities/BaseInventory";
import { EDoor } from "../entities/EDoor";
import { EScarecrow } from "../entities/EScarecrow";
import { InvBone } from "../entities/inventory/InvBone";
import { Entity, EntityInstance } from "../map/LDtkReader";
import { GameScene } from "../scenes/GameScene";

export class EntityFactory {
    static CreateEntity(e:EntityInstance, gs:GameScene):BaseEntity {
        let be:BaseEntity;
        switch (e.fieldInstances.find(i=>i.__identifier == 'ID').__value) {
            case 'scarecrow':
                be = new EScarecrow();
                be.create(gs, e);
                break;
            case 'door':
                be = new EDoor();
                be.create(gs, e);
                break;
            default:
                break;

            }
        return be;
    }

    static CreateActor(e:EntityInstance, gs:GameScene):ActorEntity {
        let ae:ActorEntity;
        switch (e.fieldInstances.find(i=>i.__identifier == 'Name').__value) {
            case 'Bone':
                ae = new BoneActor();
                ae.create(gs, e);
                break;
            default:
                break;

            }
            let flagRequired = e.fieldInstances.find(i=>i.__identifier == 'FlagRequired').__value as string;
            let flagDefault =  e.fieldInstances.find(i=>i.__identifier == 'FlagDefault').__value as boolean;
        if(!C.checkFlag(flagRequired, flagDefault))
            ae.RemoveFromScreen();
        ae.sprite.setPipeline('Light2D');
        return ae;

    }

    static CreateInventory(type:string, position:number, gs:GameScene):BaseInventory{
        let e:BaseInventory;
        switch (type) {
            case 'Bone':
                e = new InvBone();
                e.create(gs, null);                
                break;
        
            default:
                break;
        }
        e.SetInventoryPosition(position);
        return e;
    }
}