import { Tilemaps } from "phaser";
import { start } from "repl";
import { C } from "../C";
import { BaseEntity } from "../entities/BaseEntity";
import { BaseInventory } from "../entities/BaseInventory";
import { ChangeScreenEntity } from "../entities/ChangeScreenEntity";
import { Player } from "../entities/Player";
import { GameEvents } from "../events/GameEvents";
import { SpeechBox } from "../gamestuff/SpeechBox";
import { TextOverlay } from "../gamestuff/TextOverlay";
import { EntityFactory } from "../helpers/EntityFactory";
import { MoveHelper, P } from "../helpers/MoveHelper";
import { IEntity } from "../interfaces/IEntity";
import { IGameAction } from "../interfaces/IGameCommand";
import { EntityInstance, LdtkReader } from "../map/LDtkReader";

export class GameScene extends Phaser.Scene {
       reader:LdtkReader;
       bg:Phaser.GameObjects.Image;
       to:TextOverlay;
       player:Player;
       speech:SpeechBox;
       CurrentOverlayObject:string = '';
       debug:Phaser.GameObjects.Graphics;
       BGLayer:Phaser.GameObjects.Layer;
       EntityLayer:Phaser.GameObjects.Layer;
       DisplayLayer:Phaser.GameObjects.Layer;
       LightGraphic:Phaser.GameObjects.Graphics;
       myDebug:boolean = false;
       MoveGrid:Phaser.Tilemaps.TilemapLayer;
       RunningAction:IGameAction;

       InventoryCount:number = 0;

       //If this flag is false, the player shouldn't be allowed to interact with the world (someone is talking, an event is happening, etc.)
       //Right now I'm relying on each individual Entity to enforce this, but that is wrong...  No time to refactor it.
       AllowPlayerInteractions:boolean = true;

       GameActionQueue:IGameAction[] = [];

       Entities:IEntity[] = [];
       create() {
              
              this.input.mouse.disableContextMenu();
              this.CreateLayersAndDisplay();
              this.reader = new LdtkReader(this,this.cache.json.get('screens'));
              let screen = this.reader.ldtk.levels.find((l:any)=> l.identifier === C.currentScreen);
              let entities = screen.layerInstances.find((l) => l.__identifier == 'Entities');
              //@ts-ignore
              let movement = screen.layerInstances.find((l) => l.__identifier == 'Movement');
               this.MoveGrid =this.reader.CreateIntGridLayer(movement, 'mapts');
              //@ts-ignore
              let tiles = screen.layerInstances.find((l) => l.__identifier == 'Tiles');
              this.bg = this.add.image(0,0, 'bgs', tiles.gridTiles[0].t).setOrigin(0,0);
              this.BGLayer.add(this.bg);
              // this.bg = this.add.sprite(0,0, 'bgs', 0).setOrigin(0,0);
              entities.entityInstances.forEach(e => {
                     if(e.__identifier == 'Entity') {
                            this.Entities.push(EntityFactory.CreateEntity(e, this));
                     } else if (e.__identifier == 'POI') {
                            let be = new BaseEntity();
                            be.create(this, e);
                            be.Description = e.fieldInstances.find(i=>i.__identifier == 'Description').__value as string;
                            this.Entities.push(be);
                     } else if (e.__identifier == 'EntryPoint') {
                            if(e.fieldInstances.find(i=>i.__identifier == 'ID').__value == C.EntryPoint) {
                                   this.CreatePlayer(e);
                            }
                     } else if (e.__identifier == 'Image') {
                            let frame = e.fieldInstances.find(i=>i.__identifier == 'frame').__value;
                            let depthOffset = e.fieldInstances.find(i=>i.__identifier == 'DepthOffset').__value as number;
                            let i = this.add.image(e.px[0], e.px[1], 'atlas', frame).setDepth(e.px[1]-depthOffset).setOrigin(e.__pivot[0],e.__pivot[1]);
                            // let i = this.add.image(e.px[0]+(e.width/2), e.px[1]+ e.height, 'atlas', frame).setDepth(e.px[1]-depthOffset).setOrigin(e.__pivot[0],e.__pivot[1]);
                            this.EntityLayer.add(i);
                     } else if (e.__identifier == 'ChangeScreen') {
                            let be = new ChangeScreenEntity(e);
                            be.create(this, e);
                     } if(e.__identifier == 'Actor') {
                            // console.log(`Found Entity type : ${e.fieldInstances.find(i=>i.__identifier == 'Name').__value}`);
                            this.Entities.push(EntityFactory.CreateActor(e, this));
                     }
              });
              //If the player hasn't been created it means that the current level doesn't have an Entry Point that matches the C.EntryPoint value.  
              //Warn and maybe create a default player later...
              if(this.player == null)
                     throw `EntryPoint ${C.EntryPoint} does not exist in screen ${C.currentScreen}`;

              if(this.myDebug) {
                     this.DrawDebug();
              }

              this.events.on(GameEvents.START_TEXT_OVERLAY, this.StartOverlay, this);
              this.events.on(GameEvents.END_TEXT_OVERLAY, this.EndOverlay, this);
              this.events.on(GameEvents.FINISH_STEP, this.RunGameActions, this);
              this.events.on(GameEvents.LAUNCH_LEFT_ACTION, this.LeftAction, this);
              this.events.on(GameEvents.LAUNCH_RIGHT_ACTION, this.RightAction, this);
              // this.events.on
              this.input.on('pointerdown', this.PointerDown, this);

              this.CreateInventory();

       }

       private PointerDown(p:Phaser.Input.Pointer) {
              if(!this.AllowPlayerInteractions) {
                     // console.log('Interrupt');
                     this.RunningAction.Skip(this);
                     return;
              }
              // console.log('Scene click event fired'); 
              let px = p.worldX;
              let py = p.worldY;
              let startTile = this.MoveGrid.getTileAtWorldXY(px, py);
              let playerTile = this.MoveGrid.getTileAtWorldXY(this.player.sprite.x, this.player.sprite.y);
              // console.log(`Clicked on tile ${startTile.x}, ${startTile.y}: ${startTile.index}`);
              if(startTile.index == 1) {
                     let resultTiles = MoveHelper.FindMovementTiles(this.MoveGrid, {x:startTile.x, y:startTile.y});
                     let bestPath = MoveHelper.FindMovementPath(resultTiles, {x:playerTile.x, y:playerTile.y});
                     this.player.StartMove(bestPath, 100);
                     // if(this.myDebug) {
                     //        this.debug.clear();
                     //        bestPath.forEach(t => {
                     //               this.add.text(t.x * 16, t.y * 16, t.move + '').setFontSize(10);
                     //        }, this);
                     // }

                     
              }
       }

       private CreateInventory() {
              for (let i = 0; i < C.Inventory.length; i++) {
                     const element = C.Inventory[i];
                     this.AddInventory(element, true);
              }
              
       }

       private DrawDebug() {
              this.debug = this.add.graphics().setAlpha(.5).lineStyle(1, 0xff0000);
              this.Entities.forEach(e => {
                     if (e instanceof BaseEntity ) {
                            let be = e as BaseEntity;
                            this.debug.strokeRect(be.interactZone.x, be.interactZone.y, be.interactZone.width, be.interactZone.height);
                     } else if (e instanceof BaseInventory ) {
                            let be = e as BaseInventory;
                            this.debug.strokeRect(be.interactZone.x, be.interactZone.y, be.interactZone.width, be.interactZone.height);
                     } 

              });
       }

       private CreatePlayer(e:EntityInstance) {
              this.player = new Player(this, e.px[0], e.px[1]);
              this.EntityLayer.add(this.player.sprite);
       }

       private CreateLayersAndDisplay() {
              this.BGLayer = this.add.layer().setDepth(0);
              this.EntityLayer = this.add.layer().setDepth(1);
              this.DisplayLayer = this.add.layer().setDepth(2);

              this.to = new TextOverlay(this);
              this.speech = new SpeechBox(this);
              this.DisplayLayer.add(this.to.c);
              
       }

       private StartOverlay(e:IEntity) {
              if(this.AllowPlayerInteractions)
              this.to.Reveal(e);
       }
       EndOverlay(e:IEntity = null) {
              console.log('Leaving entity');
              this.to.Hide();
       }

       /**
        * Helper function to load and then run the queue.  This is the same as pushing multiple actions into the GameActionQueue  
        * and then calling RunGameAction.
        * @param actions Array of actions.
        */
       LoadAndRunGameActions(actions:IGameAction[]) {
              actions.forEach(element => {
                     this.GameActionQueue.push(element);
              });
              // this.GameActionQueue = actions;s
              this.RunGameActions();
       }

       timer:Phaser.Time.TimerEvent;
       /**Runs the game actions in the queue. If called, this will run through the queue until it is complete.  */
       RunGameActions() {
              if(this.timer != null)
                     this.timer.destroy();
              this.to.Hide();
              if(this.GameActionQueue.length == 0) {
                     this.RestartInteractions();
                     return;
              }
              this.RunningAction = this.GameActionQueue.shift();
              this.RunningAction.StartAction(this);
              // if(next.Blocking)
              this.StopInteractions();
              if(this.RunningAction.Duration > 0) {
                     this.timer = this.time.addEvent({
                            delay:this.RunningAction.Duration,
                            callbackScope:this,
                            callback:() =>{
                                   this.RunningAction.EndAction(this);
                                   this.RunGameActions();
                            }
                     });
       
              } else {
                     this.RunGameActions();
              }
       }

       private StopInteractions() {
              this.AllowPlayerInteractions = false;
       }

       private RestartInteractions() {
              this.AllowPlayerInteractions = true;
       }

       public AddInventory(type:string, recreated:boolean = false) {
              if(!recreated)
                     C.Inventory.push(type);
              this.Entities.push(EntityFactory.CreateInventory(type, this.InventoryCount, this));
              this.InventoryCount++;
       }

       MovePlayerToTile(tilex:number, tiley:number) {
              // let tiles = MoveHelper.FindMovementTiles();
       }

       DisplayText(x:number, y:number, text:string) {
              //Offset the coord to make room for the textbox
              this.speech.Reveal(x,y,text);
       }

       HideText() {
              this.speech.Hide();
       }

       LeftAction(e:BaseEntity) {
              if(this.AllowPlayerInteractions)
                     e.LeftAction(this);
       }
       RightAction(e:BaseEntity) {
              if(this.AllowPlayerInteractions)
                     e.RightAction(this);
       }

    
}