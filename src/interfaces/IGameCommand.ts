import { GameScene } from "../scenes/GameScene";

export interface IGameAction {
    StartAction(gs:GameScene);
    EndAction(gs:GameScene);
    Skip(gs:GameScene);
    Duration:number;
    Blocking:boolean;


}