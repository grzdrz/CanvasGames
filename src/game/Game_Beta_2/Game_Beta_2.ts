import ViewManager from "../ViewSystem/ViewManager";
import GameObject from "./GameObjects/GameObject";
import Vector from "../Helpers/Vector";
import Collisions from "./Collisions";
import MathFunctions from "../Helpers/MathFunctions";
import Player from "./GameObjects/Player";
import Enemy from "./GameObjects/Enemy";
import GameState from "../States/GameState";
import SessionView from "../ViewSystem/SessionView";
import Vertex from "../Helpers/Vertex";

class Game_Beta_2 extends SessionView {
  public gameObjects = new Array<GameObject>();
  public player: Player;

  public spawnTimeStamp = 0;

  public collisionAnalyzer: Collisions;

  constructor(viewManager: ViewManager) {
    super(viewManager);
    this.collisionAnalyzer = new Collisions(this.viewManager);
    this.player = new Player(this);
  }

  public initialize() {
    super.initialize();
  }

  public loadContent(): void {
    super.loadContent();

    this.gameObjects = new Array<GameObject>();
    this.player = new Player(this);

    this.gameObjects.push(this.player);

    this.collisionAnalyzer.loadContent();

    this.viewManager.onMouseDown.subscribe(this.player.handlerSetPosition);
    this.viewManager.onMouseMove.subscribe(this.player.handlerSetPosition);
    this.viewManager.onMouseUp.subscribe(this.player.handlerUnhand);
    /* this.viewManager.onKeyDown.subscribe(this.player.handlerKeyDown);
    this.viewManager.onKeyUp.subscribe(this.player.handlerKeyUp);
    this.viewManager.onMouseClick.subscribe(this.player.handleClick); */
  }

  public unloadContent(): void {
    super.unloadContent();

    this.collisionAnalyzer.unloadContent();

    this.viewManager.onMouseDown.unsubscribe(this.player.handlerSetPosition);
    this.viewManager.onMouseMove.unsubscribe(this.player.handlerSetPosition);
    this.viewManager.onMouseUp.unsubscribe(this.player.handlerUnhand);
    /* this.viewManager.onKeyDown.unsubscribe(this.player.handlerKeyDown);
    this.viewManager.onKeyUp.unsubscribe(this.player.handlerKeyUp);
    this.viewManager.onMouseClick.unsubscribe(this.player.handleClick); */
  }

  public update(gameTime: DOMHighResTimeStamp): void {
    super.update(gameTime);
    if (this.gameState === GameState.Lose || this.gameState === GameState.Win || this.gameState === GameState.Pause) {
      return;
    }

    this.spawnTimeStamp += gameTime;
    if (this.spawnTimeStamp > 0.5 && this.gameObjects.length <= 20) {
      this.spawnTimeStamp = 0;
      this.spawnEnemy();
    }

    this.gameObjects.forEach((obj) => obj.update(gameTime));
    this.collisionAnalyzer.findAllObjectsCollisions(this.gameObjects);
  }

  public draw(): void {
    this.gameObjects.forEach(obj => {
      obj.draw();
    });
    /* this.player.draw(); */

    super.draw();
  }

  public spawnEnemy() {
    const options = {
      vertices: [
        new Vertex(new Vector(50, 50)),
        new Vertex(new Vector(80, 50)),
        new Vertex(new Vector(100, 100)),
        new Vertex(new Vector(30, 80)),
      ],
      velocity: new Vector(0, 0),
      mass: 1,
      width: 50,
    };

    const velocityX = MathFunctions.randomInteger(-50, 50) / 1;
    const velocityY = MathFunctions.randomInteger(-50, 50) / 1;
    options.velocity = new Vector(velocityX, velocityY);

    this.gameObjects.push(new Enemy(options, this));
  }
}

export default Game_Beta_2;