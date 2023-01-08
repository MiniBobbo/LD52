import { throws } from "assert";
import { C } from "../C";
import { BaseEntity } from "../entities/BaseEntity";
import { GameEvents } from "../events/GameEvents";
import { MoveHelper, P } from "../helpers/MoveHelper";
import { IGameAction } from "../interfaces/IGameCommand";
import { IMoveEntity } from "../interfaces/IMoveEntity";
import { GameScene } from "../scenes/GameScene";

/**This is a basic talk action where the text appears above the top of the speaker. */
export class ActionWalk implements IGameAction {
    e:IMoveEntity;
    destination:{x:number, y:number};
    start:{x:number, y:number};
    stepDuration:number = 200;

    constructor(entity:IMoveEntity, start:{x:number, y:number}, destination:{x:number, y:number}, stepduration:number = C.WALK_SPEED) {
        this.e = entity;
        this.destination = destination;
        this.start = start;
        this.stepDuration = stepduration;
    }
    
    Skip(gs: GameScene) {
        this.EndAction(gs);
    }

    StartAction(gs: GameScene) {
        let startTile = gs.MoveGrid.getTileAt(this.destination.x, this.destination.y);
        let playerTile = gs.MoveGrid.getTileAtWorldXY(this.start.x, this.start.y);
        if(startTile.index == 1) {
               let resultTiles = MoveHelper.FindMovementTiles(gs.MoveGrid, {x:startTile.x, y:startTile.y});
               let bestPath = MoveHelper.FindMovementPath(resultTiles, {x:playerTile.x, y:playerTile.y});
               this.e.StartMove(bestPath, this.stepDuration);
               this.Duration = 10000;
               // if(this.myDebug) {
               //        this.debug.clear();
               //        bestPath.forEach(t => {
               //               this.add.text(t.x * 16, t.y * 16, t.move + '').setFontSize(10);
               //        }, this);
               // }

               
        }
    }
    EndAction(gs: GameScene) {
        // gs.events.emit(GameEvents.FINISH_STEP);
    }
    Duration: number = 1000;
    Blocking: boolean = false;

}