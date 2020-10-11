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
import Border from "./GameObjects/Border";
import EnemiesPart from "./GameObjects/EnemiesPart";
import Matter from 'matter-js';
import Ammunition from './GameObjects/Ammunution/Ammunition';

const enemySpawnTimeStamp = 2;

class Game extends SessionView {
  public engine = Engine.create();
  public world = this.engine.world;
  public runner = Runner.create();

  public gameObjects = new Array<GameObject>();
  public player = Player.create(this);

  public spawnTimeStamp = 0;

  constructor(viewManager: ViewManager) {
    super(viewManager);
  }

  public initialize() {
    super.initialize();
  }

  public loadContent(): void {
    super.loadContent();

    this.gameObjects = new Array<GameObject>();
    const border = new Border(
      this,
      {
        size: new Vector(this.viewManager.canvasManager.width, 20),
        position: new Vector(this.viewManager.canvasManager.width / 2, this.viewManager.canvasManager.height - 20),
        color: 'blue',
      }
    );

    this.player = Player.create(this);

    const enemy = this.spawnEnemy();

    this.gameObjects.push(border);
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
    World.add(this.world, [this.player.body, enemy.body, border.body]);
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
    const enemy = Enemy.create(this);

    const positionX = MathFunctions.randomInteger(0, this.viewManager.canvasManager.width);
    const positionY = enemy.size.height / 2;
    const position = new Vector(positionX, positionY);
    Body.setPosition(enemy.body, position);

    return enemy;
  }

  public spawnEnemiesPart(enemy: GameObject) {
    const enemiesPart = EnemiesPart.create(this);

    const positionX = enemy.body.position.x;
    const positionY = enemy.body.position.y;
    const position = new Vector(positionX, positionY);
    Body.setPosition(enemiesPart.body, position);

    return enemiesPart;
  }

  public handleCollisionStartWithAmmunition = (event: Matter.IEventCollision<Engine>) => {
    const objectPairs = this.formObjectPairs(event.pairs);

    objectPairs.forEach((pair) => {
      if (pair.objectA instanceof Ammunition && !(pair.objectB instanceof Ammunition)) {
        pair.objectA.destroy();
      }
      if (pair.objectB instanceof Ammunition && !(pair.objectA instanceof Ammunition)) {
        pair.objectB.destroy();
      }

      if (pair.objectA instanceof Ammunition && pair.objectB instanceof Enemy) {
        const damage = pair.objectA.damage;
        pair.objectB.damage(damage);
      }
      if (pair.objectB instanceof Ammunition && pair.objectA instanceof Enemy) {
        const damage = pair.objectB.damage;
        pair.objectA.damage(damage);
      }

      if (pair.objectA instanceof Ammunition && pair.objectB instanceof EnemiesPart) {
        const damage = pair.objectA.damage;
        pair.objectB.damage(damage);
      }
      if (pair.objectB instanceof Ammunition && pair.objectA instanceof EnemiesPart) {
        const damage = pair.objectB.damage;
        pair.objectA.damage(damage);
      }
    });
  }

  public formObjectPairs(pairs: Matter.IPair[]) {
    const objectPairs = pairs.map((pair) => {
      return {
        objectA: this.gameObjects.find((object) => object.body.id === pair.bodyA.id),
        objectB: this.gameObjects.find((object) => object.body.id === pair.bodyB.id),
      };
    });

    return objectPairs;
  }
}

export default Game;