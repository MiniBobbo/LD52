import { GameScene } from "../scenes/GameScene";
import { BaseEntity } from "./BaseEntity";

export class EScarecrow extends BaseEntity {
    Description: string = 'Creepy Scarecrow';
    LeftDescription = "Check";
    // RightDescription = "Kick";
    LeftAction(gs: GameScene): void {
        console.log('Clicked Scarecrow');
    }
    RightAction(gs: GameScene): void {
        console.log('Kicked Scarecrow');
    }

}