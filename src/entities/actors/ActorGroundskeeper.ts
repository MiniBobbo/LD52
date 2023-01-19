import { C } from "../../C";
import { Flag } from "../../flags/FlagEnum";
import { ActionAddInventory } from "../../gameactions/ActionAddInventory";
import { ActionPlayAnimation } from "../../gameactions/ActionPlayAnimation";
import { ActionRemoveFromScreen } from "../../gameactions/ActionRemoveFromScreen";
import { ActionRunFunction } from "../../gameactions/ActionRunFunction";
import { ActionTalk } from "../../gameactions/ActionTalk";
import { ActionWait } from "../../gameactions/ActionWait";
import { ActionWalk } from "../../gameactions/ActionWalk";
import { EntityInstance } from "../../map/LDtkReader";
import { GameScene } from "../../scenes/GameScene";
import { ActorEntity } from "../ActorEntity";

export class ActorGroundskeeper extends ActorEntity {
    create(gs:GameScene, e:EntityInstance) {
        super.create(gs, e);
        this.sprite = gs.add.sprite(e.px[0] + e.width/2, e.px[1] + e.height/2, 'atlas')
        .setOrigin(.5,.5)
        .setPipeline('Light2D')
        .play('groundskeeper_dig');
        ;
        this.Description = 'Groundskeeper';
        this.LeftDescription = 'Talk to';
        this.RightDescription = "Whatcha doing?";
    }

    LeftAction(gs: GameScene): void {
        let walkPoint = this.instance.fieldInstances.find(i=>i.__identifier == 'Destination');
        if(walkPoint != undefined) {
            let pt = walkPoint.__value as {cx:number, cy:number};
            gs.GameActionQueue.push(new ActionWalk(gs.player, gs.player.sprite as any, {x:pt.cx, y:pt.cy}));
            gs.GameActionQueue.push(new ActionRunFunction(gs, 0), {
                StartAction:(gs:GameScene)=> {gs.player.sprite.flipX = true;},
                Blocking:false,
                EndAction:(gs:GameScene)=>{},
                Duration:0,
                Skip:(gs:GameScene)=>{}
            });
        }
        if(!C.checkFlag(Flag.Talk_Groundskeeper1, false)) {
            gs.GameActionQueue.push(new ActionTalk(gs.player as any, 'Hello?'));
            gs.GameActionQueue.push(new ActionWait(gs, 2000));
            gs.GameActionQueue.push(new ActionTalk(gs.player as any, "Sorry to bug you.  Do you have a second?"));
            gs.GameActionQueue.push(new ActionWait(gs, 500));
            gs.GameActionQueue.push(new ActionPlayAnimation(this, 'groundskeeper_stand', false));
            gs.GameActionQueue.push(new ActionWait(gs, 1500));
            gs.GameActionQueue.push(new ActionTalk(this, "Master left me a job.  I need to finish it."));
            gs.GameActionQueue.push(new ActionTalk(gs.player as any, "I won't take long.  I'm the nephew of the previous owner."));
            gs.GameActionQueue.push(new ActionTalk(this, "Ah, so you're the new Master."));
            gs.GameActionQueue.push(new ActionTalk(this, "You will help with the harvest."));
            gs.GameActionQueue.push(new ActionWait(gs, 1500));
            gs.GameActionQueue.push(new ActionTalk(gs.player as any, "That didn't seem like a question..."));
            gs.GameActionQueue.push(new ActionTalk(this, "T'wasn't"));
            gs.GameActionQueue.push(new ActionTalk(gs.player as any, "What needs to be done for the harvest?  I don't see any crops."));
            gs.GameActionQueue.push(new ActionTalk(this, "Master left the book in Master's office.  Book has the instructions."));
            gs.GameActionQueue.push(new ActionPlayAnimation(this, 'groundskeeper_dig', false));
            gs.GameActionQueue.push(new ActionWait(gs, 1500));
            gs.GameActionQueue.push(new ActionTalk(gs.player as any, "Guess we are done talking..."));
            C.setFlag(Flag.Talk_Groundskeeper1, true);

        } else {
            gs.GameActionQueue.push(new ActionTalk(this as any, "Master left the notes in Master's office."));
        }
        gs.RunGameActions();
    }
    RightAction(gs: GameScene): void {
        let walkPoint = this.instance.fieldInstances.find(i=>i.__identifier == 'Destination');
        if(walkPoint != undefined) {
            let pt = walkPoint.__value as {cx:number, cy:number};
            gs.GameActionQueue.push(new ActionWalk(gs.player, gs.player.sprite as any, {x:pt.cx, y:pt.cy}));
            gs.GameActionQueue.push(new ActionRunFunction(gs, 0), {
                StartAction:(gs:GameScene)=> {gs.player.sprite.flipX = true;},
                Blocking:false,
                EndAction:(gs:GameScene)=>{},
                Duration:0,
                Skip:(gs:GameScene)=>{}
            });
        }
        gs.GameActionQueue.push(new ActionTalk(gs.player as any, "What are you doing?", 1500));
        gs.GameActionQueue.push(new ActionTalk(this, "Diggin."));

        gs.RunGameActions();

    }

    Disable() {

    }
}