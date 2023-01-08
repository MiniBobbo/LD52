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
    /**This is called when an item is used on this Entity.
     * Returns true if this item handled the interaction.  Otherwise false and the item should handle the message.
     */
    ItemUsed(itemName:string):boolean;

    instance:EntityInstance;
    ID:string;
    Description:string;
    LeftDescription:string;
    RightDescription:string;

    RequiredFlag:number;
}
