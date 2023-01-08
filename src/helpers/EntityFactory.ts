import { C } from "../C";
import { ActorEntity } from "../entities/ActorEntity";
import { ActorGroundskeeper } from "../entities/actors/ActorGroundskeeper";
import { ActorTree } from "../entities/actors/ActorTree";
import { BoneActor } from "../entities/actors/BoneActor";
import { BaseEntity } from "../entities/BaseEntity";
import { BaseInventory } from "../entities/BaseInventory";
import { EDoor } from "../entities/EDoor";
import { EScarecrow } from "../entities/EScarecrow";
import { InvBone } from "../entities/inventory/InvBone";
import { InvEnvelope } from "../entities/inventory/InvEnvelope";
import { InvKey } from "../entities/inventory/InvKey";
import { InvWill } from "../entities/inventory/InvWill";
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
            case 'Tree':
                ae = new ActorTree();
                ae.create(gs, e);
                break;
            case 'Groundskeeper':
                ae = new ActorGroundskeeper();
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
                // e.create(gs, null);                
                break;
            case 'Envelope':
                e = new InvEnvelope();
                break;
            case 'Key':
                e = new InvKey();
                break;
            case 'Will':
                e = new InvWill();
                break;
        
            default:
                break;
        }
        e.create(gs, null);                
        e.SetInventoryPosition(position);
        return e;
    }
}