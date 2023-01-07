import { BaseEntity } from "../entities/BaseEntity";
import { EDoor } from "../entities/EDoor";
import { EScarecrow } from "../entities/EScarecrow";
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
}