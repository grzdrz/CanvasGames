import ViewManager from "../ViewSystem/ViewManager";
import GameObject from "./GameObjects/GameObject";
import Vector from "../Helpers/Vector";
import MathFunctions from "../Helpers/MathFunctions";
import Player from "./GameObjects/Player";
import Enemy from "./GameObjects/Enemy";
import GameState from "../States/GameState";
import SessionView from "../ViewSystem/SessionView";
import Background from "./GameObjects/Background";
import EnemiesPart from "./GameObjects/EnemiesPart";
import World from "./Physic/World";

const enemySpawnTimeStamp = 2;

class Game extends SessionView {
  public world: World;
  public gameObjects = new Array<GameObject>();
  public player: Player;

  public spawnTimeStamp = 0;

  constructor(viewManager: ViewManager) {
    super(viewManager);

    this.world = new World(this);
    this.player = new Player(
      this,
      {
        size: new Vector(40, 40),
        position: new Vector(50, 50),
        color: "green",
        mass: 1,
        restitution: 0.9,
      },
    );
  }

  public initialize() {
    super.initialize();
  }

  public loadContent(): void {
    super.loadContent();

    this.gameObjects = new Array<GameObject>();

    this.gameObjects.push(
      new Background(
        this,
        {
          size: new Vector(500, 300),
          position: new Vector(400, 150),
        }
      ),
    );

    this.player = new Player(
      this,
      {
        size: new Vector(40, 40),
        position: new Vector(50, 50),
        color: "green",
        mass: 1,
        restitution: 0.9,
      },
    );

    this.gameObjects.push(this.player);

    this.world.loadContent();

    this.viewManager.onMouseDown.subscribe(this.player.handleShot);
    this.viewManager.onMouseMove.subscribe(this.player.handleShot);

    this.viewManager.onMouseDown.subscribe(this.player.handlerSetPosition);
    this.viewManager.onMouseMove.subscribe(this.player.handlerSetPosition);
    this.viewManager.onMouseUp.subscribe(this.player.handlerUnhand);

    this.viewManager.onKeyDown.subscribe(this.player.handlerKeyDown);
    this.viewManager.onKeyUp.subscribe(this.player.handlerKeyUp);

    this.spawnEnemy();
  }

  public unloadContent(): void {
    super.unloadContent();

    this.world.unloadContent();

    this.viewManager.onMouseDown.unsubscribe(this.player.handleShot);
    this.viewManager.onMouseMove.unsubscribe(this.player.handleShot);

    this.viewManager.onMouseDown.unsubscribe(this.player.handlerSetPosition);
    this.viewManager.onMouseMove.unsubscribe(this.player.handlerSetPosition);
    this.viewManager.onMouseUp.unsubscribe(this.player.handlerUnhand);

    this.viewManager.onKeyDown.unsubscribe(this.player.handlerKeyDown);
    this.viewManager.onKeyUp.unsubscribe(this.player.handlerKeyUp);
  }

  public update(gameTime: DOMHighResTimeStamp): void {
    super.update(gameTime);
    if (this.gameState === GameState.Lose || this.gameState === GameState.Win || this.gameState === GameState.Pause) {
      return;
    }

    this.spawnTimeStamp += gameTime;
    if (this.spawnTimeStamp > enemySpawnTimeStamp) {
      this.spawnTimeStamp = 0;
      this.spawnEnemy();
    }

    /* this.gameObjects.forEach((obj) => {
      obj.update(gameTime);
    }); */
    /* this.world.collisions.findAllObjectsCollisions(this.gameObjects); */

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

    this.world.update(gameTime);
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

    this.gameObjects.push(new Enemy(this, options));
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

    return new EnemiesPart(this, options);
  }
}

export default Game;