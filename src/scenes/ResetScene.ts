import { GameScene } from "./GameScene";

export class ResetScene extends Phaser.Scene {
    create() {
        this.scene.remove('game');
        this.time.addEvent({
            delay:300,
            callbackScope:this,
            callback:()=>{
                this.scene.add('game', GameScene, true);
                // this.scene.start('game');
            }
        });
    }
}