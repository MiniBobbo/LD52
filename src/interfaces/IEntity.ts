import { NumberLiteralType } from "typescript";
import { EntityInstance } from "../map/LDtkReader";
import { GameScene } from "../scenes/GameScene";

export interface IEntity {
    topx:number;
    topy:number;
    dispose();
    create(gs:GameScene, instance:EntityInstance);
    LeftAction(gs:GameScene);
    RightAction(gs:GameScene);

    ID:string;
    Description:string;
    LeftDescription:string;
    RightDescription:string;

    RequiredFlag:number;
}
