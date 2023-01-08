import { P } from "../helpers/MoveHelper";

export interface IMoveEntity {
    StartMove(bestPath:P[], stepdurationMS:number);
    EndMove();
    InterruptMove();

    CurrentlyMoving:boolean;
}