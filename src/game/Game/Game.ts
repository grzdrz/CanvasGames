import {
  Engine,
  World,
  Bodies,
  Body,
  Events,
  Runner,
} from 'matter-js';

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
import Matter from 'matter-js';
import Ammunition from './GameObjects/Ammunution/Ammunition';
/* import World from "./Physic/World"; */

const enemySpawnTimeStamp = 2;

class Game extends SessionView {
  public engine = Engine.create();
  public world = this.engine.world;
  public runner = Runner.create();

  public gameObjects = new Array<GameObject>();
  public player: Player;

  public spawnTimeStamp = 0;

  constructor(viewManager: ViewManager) {
    super(viewManager);

    this.player = new Player(
      this,
      {
        size: new Vector(50, 50),
        position: new Vector(150, 150),
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
    const background = new Background(
      this,
      {
        size: new Vector(this.viewManager.canvasManager.width, 20),
        position: new Vector(this.viewManager.canvasManager.width / 2, this.viewManager.canvasManager.height - 20),
        color: 'blue',
      }
    );

    this.player = new Player(
      this,
      {
        size: new Vector(50, 50),
        position: new Vector(150, 150),
        color: "green",
        mass: 1,
        restitution: 0.9,
      },
    );

    const enemy = this.spawnEnemy();

    this.gameObjects.push(background);
    this.gameObjects.push(this.player);
    this.gameObjects.push(enemy);

    this.viewManager.onMouseDown.subscribe(this.player.handleShot);
    this.viewManager.onMouseMove.subscribe(this.player.handleShot);

    this.viewManager.onMouseDown.subscribe(this.player.handlerSetPosition);
    this.viewManager.onMouseMove.subscribe(this.player.handlerSetPosition);
    this.viewManager.onMouseUp.subscribe(this.player.handlerUnhand);

    this.viewManager.onKeyDown.subscribe(this.player.handlerKeyDown);
    this.viewManager.onKeyUp.subscribe(this.player.handlerKeyUp);

    this.viewManager.onKeyUp.subscribe(this.player.handleChangeAmmo);

    this.engine = Engine.create();
    this.world = this.engine.world;
    World.add(this.world, [this.player.body, enemy.body, background.body]);
    Runner.run(this.runner, this.engine);


    Events.on(this.engine, 'collisionStart', this.handleCollisionStartWithAmmunition);
  }

  public unloadContent(): void {
    super.unloadContent();

    Runner.stop(this.runner);
    World.clear(this.world, false);
    Engine.clear(this.engine);

    this.viewManager.onMouseDown.unsubscribe(this.player.handleShot);
    this.viewManager.onMouseMove.unsubscribe(this.player.handleShot);

    this.viewManager.onMouseDown.unsubscribe(this.player.handlerSetPosition);
    this.viewManager.onMouseMove.unsubscribe(this.player.handlerSetPosition);
    this.viewManager.onMouseUp.unsubscribe(this.player.handlerUnhand);

    this.viewManager.onKeyDown.unsubscribe(this.player.handlerKeyDown);
    this.viewManager.onKeyUp.unsubscribe(this.player.handlerKeyUp);

    this.viewManager.onKeyUp.unsubscribe(this.player.handleChangeAmmo);

    Events.off(this.engine, 'collisionStart', this.handleCollisionStartWithAmmunition);
  }

  public update(gameTime: DOMHighResTimeStamp): void {
    super.update(gameTime);
    if (this.gameState === GameState.Lose || this.gameState === GameState.Win || this.gameState === GameState.Pause) {
      this.runner.enabled = false;
      this.spawnTimeStamp = 0;
      return;
    }
    this.runner.enabled = true;

    this.spawnTimeStamp += gameTime;
    if (this.spawnTimeStamp > enemySpawnTimeStamp) {
      this.spawnTimeStamp = 0;
      const enemy = this.spawnEnemy();
      World.add(this.world, [enemy.body]);
      this.gameObjects.push(enemy);
    }

    if (this.player.body.position.y < 0) this.gameState = GameState.Win;
    if (this.player.HP <= 0) this.gameState = GameState.Lose;

    const deadEnemies = Array<GameObject>();
    this.gameObjects.forEach((object) => {
      if (object instanceof Enemy && object.HP <= 0) {
        const part1 = this.spawnEnemiesPart(object);
        World.add(this.world, [part1.body]);
        deadEnemies.push(part1);

        const part2 = this.spawnEnemiesPart(object);
        World.add(this.world, [part2.body]);
        deadEnemies.push(part2);

        const part3 = this.spawnEnemiesPart(object);
        World.add(this.world, [part3.body]);
        deadEnemies.push(part3);

        object.isDestroyed = true;
      }
    });

    this.gameObjects.push(...deadEnemies);

    this.gameObjects = this.gameObjects.filter((object) => {
      if (object.isDestroyed) World.remove(this.world, object.body);
      return !object.isDestroyed;
    });

    this.gameObjects.forEach((object) => object.update(gameTime));
  }

  public draw(): void {
    this.gameObjects.forEach(object => object.draw());
    this.player.draw();
    this.viewManager.canvasManager.drawHP(this.player.HP);
    this.viewManager.canvasManager.drawAmmoType(this.player.activeAmmunution);

    super.draw();
  }

  public spawnEnemy() {
    const options = {
      position: new Vector(0, 0),
      size: new Vector(0, 0),
      color: 'red',
    };

    /* const velocityX = MathFunctions.randomInteger(-20, 20) / 1;
    const velocityY = MathFunctions.randomInteger(-20, 20) / 1;
    options.velocity = new Vector(velocityX, velocityY); */

    options.size = new Vector(50, 50);
    const positionX = MathFunctions.randomInteger(0, this.viewManager.canvasManager.width);
    const positionY = options.size.height / 2;
    options.position = new Vector(positionX, positionY);

    return new Enemy(this, options);
  }

  public spawnEnemiesPart(enemy: GameObject) {
    const options = {
      position: new Vector(0, 0),
      size: new Vector(20, 25),
      velocity: new Vector(0, 0),
      mass: 1,
      width: 50,
      color: 'black',
    };

    const positionX = enemy.body.position.x;
    const positionY = enemy.body.position.y;
    options.position = new Vector(positionX, positionY);

    /* const velocityX = MathFunctions.randomInteger(-10, 10) / 1;
    const velocityY = MathFunctions.randomInteger(-10, 10) / 1;
    options.velocity = new Vector(velocityX, velocityY); */

    return new EnemiesPart(this, options);
  }

  public handleCollisionStartWithAmmunition = (event: Matter.IEventCollision<Engine>) => {
    const objectPairs = event.pairs.map((pair) => {
      return {
        objectA: this.gameObjects.find((object) => object.body.id === pair.bodyA.id),
        objectB: this.gameObjects.find((object) => object.body.id === pair.bodyB.id),
      };
    });

    objectPairs.forEach((pair) => {
      if (pair.objectA instanceof Ammunition && !(pair.objectB instanceof Ammunition)) {
        pair.objectA.isDestroyed = true;
      }
      if (pair.objectB instanceof Ammunition && !(pair.objectA instanceof Ammunition)) {
        pair.objectB.isDestroyed = true;
      }

      if (pair.objectA instanceof Ammunition && pair.objectB instanceof Enemy) {
        const damage = pair.objectA.damage;
        pair.objectB.getDamaged(damage);
      }
      if (pair.objectB instanceof Ammunition && pair.objectA instanceof Enemy) {
        const damage = pair.objectB.damage;
        pair.objectA.getDamaged(damage);
      }
    });
  }
}

export default Game;