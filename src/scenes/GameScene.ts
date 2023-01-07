import { C } from "../C";
import { BaseEntity } from "../entities/BaseEntity";
import { GameEvents } from "../events/GameEvents";
import { TextOverlay } from "../gamestuff/TextOverlay";
import { EntityFactory } from "../helpers/EntityFactory";
import { IEntity } from "../interfaces/IEntity";
import { LdtkReader } from "../map/LDtkReader";

export class GameScene extends Phaser.Scene {
       reader:LdtkReader;
       bg:Phaser.GameObjects.Image;
       to:TextOverlay;
       speech:Phaser.GameObjects.BitmapText;
       CurrentOverlayObject:string = '';
       debug:Phaser.GameObjects.Graphics;
       BGLayer:Phaser.GameObjects.Layer;
       EntityLayer:Phaser.GameObjects.Layer;
       DisplayLayer:Phaser.GameObjects.Layer;

       Entities:IEntity[] = [];
       create() {

              this.input.mouse.disableContextMenu();
              this.CreateLayersAndDisplay();
              this.reader = new LdtkReader(this,this.cache.json.get('screens'));
              let screen = this.reader.ldtk.levels.find((l:any)=> l.identifier === "Level_0");
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
                     }
              });
              


              this.debug = this.add.graphics().setAlpha(.5).lineStyle(1,0xff0000);
              this.Entities.forEach(e => {
                     if( e instanceof BaseEntity) {
                            let be = e as BaseEntity;
                            this.debug.strokeRect(be.interactZone.x, be.interactZone.y, be.interactZone.width, be.interactZone.height);
                     }

              });

              this.events.on(GameEvents.START_TEXT_OVERLAY, this.StartOverlay, this);
              this.events.on(GameEvents.END_TEXT_OVERLAY, this.EndOverlay, this);
              // this.events.on

       }

       CreateLayersAndDisplay() {
              this.BGLayer = this.add.layer().setDepth(0);
              this.EntityLayer = this.add.layer().setDepth(1);
              this.DisplayLayer = this.add.layer().setDepth(2);

              this.to = new TextOverlay(this);
              this.speech = this.add.bitmapText(0,0,'6px', '');
              this.DisplayLayer.add(this.to.c);
              
       }

       StartOverlay(e:IEntity) {
              this.to.Reveal(e);
       }
       EndOverlay(e:IEntity) {
              this.to.Hide();

       }

    
}