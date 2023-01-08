import { Tile } from "../map/LDtkReader";

export class MoveHelper {
    static called:number = 0;
    static FindMovementTiles(b:Phaser.Tilemaps.TilemapLayer, starting:{x:number, y:number}):P[] {
        /**
         * Use a flood fill to find all the movement options for this unit.
         * 
         * Recursive algo.  Oh no!
         * 
         * Add the current space to the completed queue with a movement rate of the units move so it never is added again.
         * Pass the current space into the algo.
         * 
         * In the Algo:
         *      The algo takes in an array of spaces to check.  
         *      Loop through the spaces passed in:
         *          Check the 4 spaces around the current space.
         *          If (movement >= 0):
         *              If FoundInCompletedArray:
         *                  If CompletedArrayMovement < movement this is a better move.
         *                      Change the CompletedArray move value to this value.
         *                      Add the space to the checkNext array with better move value.
         *              If (movement > 0) and it isn't in the completed array:
         *                  Add the space to the checkNext array 
         *                  Add to the completed array with the movement value 
         *              If (movement = 0) and isn't in the completed array
         *                  Add the space to the completed array with the movement value
        *       After the spaces passed in is empty, recursively call this algo and pass in the checkNext array.   
        */
        
        let Completed = [];
        this.called = 0;


        Completed.push({x:starting.x, y:starting.y, move:99});
        let checkNext = [Completed[0]];
        this.CheckTiles(checkNext, Completed, b);

        
        return Completed;
    }

    static FindMovementPath(tiles:P[], starting:{x:number, y:number}):P[] {
        let bestpath:P[] = [];
        let currentTile = tiles.find(t=>t.x == starting.x && t.y == starting.y);
        let step = 0;
        while(currentTile.move != 99 && step < 100) {
            let best:P = {x:0, y:0, move:0};
            for(let x = currentTile.x-1; x <=currentTile.x+1;x++) {
                for(let y = currentTile.y-1; y <=currentTile.y+1;y++) {
                    let checkTile = tiles.find(t=>t.x == x && t.y == y);
                    if(checkTile != undefined && checkTile.move > best.move) {
                        best = checkTile;
                    }
                }
            }
            currentTile = best;
            bestpath.push(best);
        }

        return bestpath;
    }

    private static CheckTiles(Check:P[], Completed:P[], b:Phaser.Tilemaps.TilemapLayer) {
        let CheckNext:P[] = [];
        Check.forEach(p => {
            for(let x = -1; x <=1;x++) {
                for(let y = -1; y <=1;y++) {
                    if(x == 0 || y == 0 && !(x==0 && y == 0)) {
                        let dx = p.x + x;
                        let dy = p.y + y;
                        let move = p.move;
                        let checkTile = b.getTileAt(dx,dy);
                        //Check if this tile doesn't exist or if it is blocked by something.  
                        if(checkTile == null || checkTile.index != 1)
                            continue;
                        move -= 1;
                        //Check if this is a valid move:
                        if(move >= 0) {
                            let c = Completed.find(i => i.x == dx && i.y == dy);
                            //Check if this is in the completed array
                            if(c != undefined) {
                                //Found in completed array
                                if(c.move < move) {
                                    //This is a better move.
                                    c.move = move;
                                    CheckNext.push({x:dx, y:dy, move:move});
                                }
                                //Ignore better moves in the completed array.
                            } else {
                                //Not found in completed array
                                if(move > 0) {
                                    //Add this to CheckNext because we might be able to move out of it.
                                    CheckNext.push({x:dx, y:dy, move:move});    
                                }
                                Completed.push({x:dx, y:dy, move:move});
                            }

                        }

                    }
                }
            }
        });
        this.called++;
        //Recursively call this function with the new checknext values.
        if(CheckNext.length > 0)
        this.CheckTiles(CheckNext, Completed, b);
    }



}



export class P {
    x:number;
    y:number;
    move:number;
}
