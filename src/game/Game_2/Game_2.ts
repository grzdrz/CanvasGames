import View from "../ViewSystem/View";
import ViewManager from "../ViewSystem/ViewManager";
import GameObject from "./GameObjects/GameObject";
import Vector from "../Helpers/Vector";
import Collisions from "./Collisions";
import MathFunctions from "../Helpers/MathFunctions";
import Player from "./GameObjects/Player";
import Enemy from "./GameObjects/Enemy";
import GameState from "../States/GameState";
import EventArgs from "../Events/EventArgs";
import IMouseData from "../Data/IMouseData";
import ViewState from "../Data/ViewState";
import ViewEntry from "../ViewSystem/ViewEntry";
import EntryType from "../States/EntryType";
import SessionView from "../ViewSystem/SessionView";
import Background from "./GameObjects/Background";
import EnemiesPart from "./GameObjects/EnemiesPart";

class Game_2 extends SessionView {
  public gameObjects = new Array<GameObject>();
  public player: Player;

  public spawnTimeStamp = 0;

  public collisionAnalyzer: Collisions;

  constructor(viewManager: ViewManager) {
    super(viewManager);
    this.collisionAnalyzer = new Collisions(this.viewManager);
    this.player = new Player({
      size: new Vector(40, 40),
      position: new Vector(50, 50),
      color: "green",
      mass: 1,
      restitution: 0.9,
    }, this);
  }

  public initialize() {
    super.initialize();
  }

  public loadContent(): void {
    super.loadContent();

    this.gameObjects = new Array<GameObject>();

    this.gameObjects.push(new Background({
      size: new Vector(500, 300),
      position: new Vector(400, 150),
    }, this));

    this.player = new Player({
      size: new Vector(40, 40),
      position: new Vector(50, 50),
      color: "green",
      mass: 1,
      restitution: 0.9,
    }, this);

    this.gameObjects.push(this.player);

    this.collisionAnalyzer.loadContent();

    this.viewManager.onMouseDown.subscribe(this.player.handlerSetPosition);
    this.viewManager.onMouseMove.subscribe(this.player.handlerSetPosition);
    this.viewManager.onMouseUp.subscribe(this.player.handlerUnhand);

    this.viewManager.onKeyDown.subscribe(this.player.handlerKeyDown);
    this.viewManager.onKeyDown.subscribe(this.player.handlerTopLeftKeyDown);
    this.viewManager.onKeyDown.subscribe(this.player.handlerTopRightKeyDown);
    this.viewManager.onKeyUp.subscribe(this.player.handlerKeyUp);

    this.viewManager.onMouseClick.subscribe(this.player.handleClick);

    this.spawnEnemy();
  }

  public unloadContent(): void {
    super.unloadContent();

    this.collisionAnalyzer.unloadContent();

    this.viewManager.onMouseDown.unsubscribe(this.player.handlerSetPosition);
    this.viewManager.onMouseMove.unsubscribe(this.player.handlerSetPosition);
    this.viewManager.onMouseUp.unsubscribe(this.player.handlerUnhand);

    this.viewManager.onKeyDown.unsubscribe(this.player.handlerKeyDown);
    this.viewManager.onKeyDown.unsubscribe(this.player.handlerTopLeftKeyDown);
    this.viewManager.onKeyDown.unsubscribe(this.player.handlerTopRightKeyDown);
    this.viewManager.onKeyUp.unsubscribe(this.player.handlerKeyUp);

    this.viewManager.onMouseClick.unsubscribe(this.player.handleClick);
  }

  public update(gameTime: DOMHighResTimeStamp): void {
    super.update(gameTime);
    if (this.gameState === GameState.Lose || this.gameState === GameState.Win || this.gameState === GameState.Pause) {
      return;
    }

    this.spawnTimeStamp += gameTime;
    if (this.spawnTimeStamp > 0.5) {
      this.spawnTimeStamp = 0;
      this.spawnEnemy();
    }

    this.gameObjects.forEach((obj) => {
      obj.update(gameTime);
    });
    this.collisionAnalyzer.findAllObjectsCollisions(this.gameObjects);

    if (this.player.position.y < 0) this.gameState = GameState.Win;
    if (this.player.HP <= 0) this.gameState = GameState.Lose;

    const deadEnemies = Array<GameObject>();
    this.gameObjects = this.gameObjects.filter((object) => {
      return !object.isDestroyed;
    });

    this.gameObjects = this.gameObjects.filter((object) => {
      if (object instanceof Enemy && object.HP <= 0) {
        deadEnemies.push(this.spawnEnemiesPart(object));
        deadEnemies.push(this.spawnEnemiesPart(object));
        deadEnemies.push(this.spawnEnemiesPart(object));

        return false;
      }
      return true;
    });

    this.gameObjects.push(...deadEnemies);
  }

  public draw(): void {
    this.gameObjects.forEach(obj => {
      obj.draw();
    });
    this.player.draw();

    super.draw();
  }

  public spawnEnemy() {
    const options = {
      position: new Vector(0, 0),
      size: new Vector(0, 0),
      velocity: new Vector(0, 0),
      mass: 1,
      width: 50,
    };

    const positionX = MathFunctions.randomInteger(0, this.viewManager.canvasManager.width);
    const positionY = options.width / 2;
    options.position = new Vector(positionX, positionY);

    const velocityX = MathFunctions.randomInteger(-20, 20) / 1;
    const velocityY = MathFunctions.randomInteger(-20, 20) / 1;
    options.velocity = new Vector(velocityX, velocityY);

    this.gameObjects.push(new Enemy(options, this));
  }

  public spawnEnemiesPart(enemy: GameObject) {
    const options = {
      position: new Vector(0, 0),
      size: new Vector(0, 0),
      velocity: new Vector(0, 0),
      mass: 1,
      width: 50,
    };

    const positionX = enemy.position.x;
    const positionY = enemy.position.y;
    options.position = new Vector(positionX, positionY);

    const velocityX = MathFunctions.randomInteger(-20, 20) / 1;
    const velocityY = MathFunctions.randomInteger(-20, 20) / 1;
    options.velocity = new Vector(velocityX, velocityY);

    /* this.gameObjects.push(new Enemy(options, this)); */
    return new EnemiesPart(options, this);
  }
}

export default Game_2;