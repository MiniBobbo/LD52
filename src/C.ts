import { Game } from "phaser";
import { GameData } from "./GameData";

export class C {
    static currentScreen:string = 'FrontYard';
    static EntryPoint:number = 1;
    static waypoint:string = '';
    static TILE_SIZE:number = 16;
    static Inventory:string[] = ["Envelope"];
    static WALK_SPEED:number = 250;

    static MOUSE_SENSITIVITY:number = .8;

    static FLAG_COUNT:number = 100;
    static gd:GameData;

    static GAME_NAME = 'InitialGame';

    static RoundToTile(x:number, y:number):{x:number, y:number} {
        let newX = 0;
        let newY = 0;
        newX = Math.floor(x/C.TILE_SIZE) * C.TILE_SIZE;
        newY = Math.floor(y/C.TILE_SIZE) * C.TILE_SIZE;
        return {x:newX, y:newY};
    }

    static checkFlag(flag:string, defaultValue:boolean = false):boolean {
        if(this.gd == null)
            this.gd = new GameData();
        if(this.gd.flags.has(flag))
            return this.gd.flags.get(flag);
        else {
            this.gd.flags.set(flag, defaultValue);
            return defaultValue;
        }
    }

    static setFlag(flag:string, value:boolean) {
        if(this.gd == null)
            this.gd = new GameData();
        this.gd.flags.set(flag, value);
    }
}