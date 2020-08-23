import View from "./View";
import ViewManager from "../ViewManager";
import GameObject from "../../GameSystem/GameObjects/GameObject";
import Vector from "../../Helpers/Vector";
import Physic from "../../GameSystem/Physic";
import MathFunctions from "../../Helpers/MathFunctions";
import Player from "../../GameSystem/GameObjects/Player";
import Enemy from "../../GameSystem/GameObjects/Enemy";
import GameState from "./GameState";
import EventArgs from "../../Events/EventArgs";
import IMouseData from "../../Data/IMouseData";

class SessionView extends View {
  public gameState = GameState.Active;
  public gameObjects = new Array<GameObject>();
  public player: Player;

  public spawnTimeStamp = 0;

  constructor(viewManager: ViewManager) {
    super(viewManager);

    this.player = new Player({
      width: 40,
      height: 40,
      color: "green",
      mass: 1,
      restitution: 0.9,
    }, this);

    this.initialize();
  }

  public initialize() {
    /* const options = {
        position: new Vector(0, 0),
        velocity: new Vector(0, 0),
        mass: 1,
    }; */

    /* for (let i = 0; i < 100; i++) {
        const positionX = MathFunctions.randomInteger(0, this.viewManager.canvasManager.width);
        const positionY = MathFunctions.randomInteger(0, this.viewManager.canvasManager.height);
        options.position = new Vector(positionX, positionY);

        const velocityX = MathFunctions.randomInteger(-10, 10) / 10;
        const velocityY = MathFunctions.randomInteger(-10, 10) / 10;
        options.velocity = new Vector(velocityX, velocityY);

        this.gameObjects.push(new Enemy(options, this));
    } */
    this.gameObjects.push(this.player);
  }

  public loadContent(): void {
    super.loadContent();

    this.viewManager.onMouseDown.subscribe(this.player.handlerSetPosition);
    this.viewManager.onMouseMove.subscribe(this.player.handlerSetPosition);
    this.viewManager.onMouseUp.subscribe(this.player.handlerUnhand);

    this.viewManager.onKeyDown.subscribe(this.player.handlerKeyDown);
    this.viewManager.onKeyUp.subscribe(this.player.handlerKeyUp);

    this.viewManager.onMouseClick.subscribe(this.player.handleClick);
  }

  public update(gameTime: DOMHighResTimeStamp): void {
    if (this.gameState === GameState.Lose || this.gameState === GameState.Win) {
      return;
    }

    this.spawnTimeStamp += gameTime;
    if (this.spawnTimeStamp > 1) {
      this.spawnTimeStamp = 0;
      this.spawnEnemy();
    }

    this.gameObjects.forEach((obj) => obj.update(gameTime))
    Physic.analyzeCollisions(this.gameObjects);
    Physic.detectEdgeCollisions(this.gameObjects, this.viewManager.canvasManager.width, this.viewManager.canvasManager.height);

    if (this.player.position.y < 0) this.gameState = GameState.Win;
    if (this.player.HP <= 0) this.gameState = GameState.Lose;
  }

  public draw(): void {
    if (this.gameState === GameState.Lose) {
      this.viewManager.canvasManager.drawEndGame(false);
      return;
    }
    if (this.gameState === GameState.Win) {
      this.viewManager.canvasManager.drawEndGame(true);
      return;
    }

    this.gameObjects.forEach(obj => {
      obj.draw();
    });
    this.player.draw();
  }

  public unloadContent(): void {
    super.unloadContent();
  }

  public spawnEnemy() {
    const options = {
      position: new Vector(0, 0),
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
}

export default SessionView;