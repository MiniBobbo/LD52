import { C } from "./C";

export class GameData {
    flags:Map<string, boolean>;

    constructor() {
        this.flags = new Map<string, boolean>();
        this.flags.set('All', true);
    }
}