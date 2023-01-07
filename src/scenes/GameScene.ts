import { C } from "../C";
import { BaseEntity } from "../entities/BaseEntity";
import { BaseInventory } from "../entities/BaseInventory";
import { ChangeScreenEntity } from "../entities/ChangeScreenEntity";
import { Player } from "../entities/Player";
import { GameEvents } from "../events/GameEvents";
import { TextOverlay } from "../gamestuff/TextOverlay";
import { EntityFactory } from "../helpers/EntityFactory";
import { IEntity } from "../interfaces/IEntity";
import { IGameAction } from "../interfaces/IGameCommand";
import { EntityInstance, LdtkReader } from "../map/LDtkReader";

export class GameScene extends Phaser.Scene {
       reader:LdtkReader;
       bg:Phaser.GameObjects.Image;
       to:TextOverlay;
       player:Player;
       speech:Phaser.GameObjects.BitmapText;
       CurrentOverlayObject:string = '';
       debug:Phaser.GameObjects.Graphics;
       BGLayer:Phaser.GameObjects.Layer;
       EntityLayer:Phaser.GameObjects.Layer;
       DisplayLayer:Phaser.GameObjects.Layer;
       myDebug:boolean = true;

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
              //@ts-ignore
              let tiles = screen.layerInstances.find((l) => l.__identifier == 'Tiles');
              this.bg = this.add.image(0,0, 'bgs', tiles.gridTiles[0].t).setOrigin(0,0);
              this.BGLayer.add(this.bg);
              // this.bg = this.add.sprite(0,0, 'bgs', 0).setOrigin(0,0);
              entities.entityInstances.forEach(e => {
                     if(e.__identifier == 'Entity') {
                            console.log(`Found Entity type : ${e.fieldInstances.find(i=>i.__identifier == 'ID').__value}`);
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
                     } else if (e.__identifier == 'ChangeScreen') {
                            let be = new ChangeScreenEntity(e);
                            be.create(this, e);
                     } if(e.__identifier == 'Actor') {
                            console.log(`Found Entity type : ${e.fieldInstances.find(i=>i.__identifier == 'Name').__value}`);
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
              // this.events.on

              this.CreateInventory();

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
       }

       private CreateLayersAndDisplay() {
              this.BGLayer = this.add.layer().setDepth(0);
              this.EntityLayer = this.add.layer().setDepth(1);
              this.DisplayLayer = this.add.layer().setDepth(2);

              this.to = new TextOverlay(this);
              this.speech = this.add.bitmapText(0,0,'6px', '');
              this.DisplayLayer.add(this.to.c);
              
       }

       private StartOverlay(e:IEntity) {
              this.to.Reveal(e);
       }
       EndOverlay(e:IEntity = null) {
              this.to.Hide();
       }

       /**
        * Helper function to load and then run the queue.  This is the same as pushing multiple actions into the GameActionQueue  
        * and then calling RunGameAction.
        * @param actions Array of actions.
        */
       LoadAndRunGameActions(actions:IGameAction[]) {
              this.GameActionQueue = actions;
              this.RunGameActions();
       }

       /**Runs the game actions in the queue. If called, this will run through the queue until it is complete.  */
       RunGameActions() {
              if(this.GameActionQueue.length == 0) {
                     this.RestartInteractions();
                     return;
              }
              let next = this.GameActionQueue.shift();
              next.StartAction(this);
              if(next.Duration > 0) {
                     this.time.addEvent({
                            delay:next.Duration,
                            callbackScope:this,
                            callback:() =>{
                                   next.EndAction(this);
                                   this.RunGameActions();
                            }
                     });
       
              } else {
                     this.RunGameActions();
              }
       }

       private StopInteractions() {
              this.AllowPlayerInteractions = false;
              //Listen for interrupts
              this.input.on('mousedown', () => {
                     console.log('Trying to skip.  Can\'t do that yet.');
              });
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
    
}