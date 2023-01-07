import { C } from "./C";

export class GameData {
    flags:Map<number, boolean>;

    constructor() {
        this.flags = new Map<number, boolean>();
    }
}