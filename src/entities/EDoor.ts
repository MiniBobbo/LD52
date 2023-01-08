import { GameScene } from "../scenes/GameScene";
import { BaseEntity } from "./BaseEntity";

export class EDoor extends BaseEntity {
    Description: string = 'My motel';
    LeftDescription = "Knock";
    // RightDescription = "Kick";
    LeftAction(gs: GameScene): void {
        console.log('Knock on door');
    }

}