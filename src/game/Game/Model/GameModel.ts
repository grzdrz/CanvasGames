import {
  Engine,
  World,
  Bodies,
  Body,
  Events,
  Runner,
} from 'matter-js';
import Matter from 'matter-js';

import GameObject from '../Types/GameObject';
import Vector from '../../Helpers/Vector';
import MathFunctions from '../../Helpers/MathFunctions';
import Player from '../GameObjects/Units/Player';
import Enemy from '../GameObjects/Units/Enemy';
import GameState from '../../States/GameState';
import EnemiesPart from '../GameObjects/Units/EnemiesPart';
import Ammunition from '../GameObjects/Ammunition/Ammunition';
import Game from '../Game';
import Border from '../GameObjects/Terrain/Border';
import IShotData from '../Types/IShotData';
import EventArgs from '../../Events/EventArgs';
import Bullet from '../GameObjects/Ammunition/Bullet';
import AmmunitionType from '../GameObjects/Ammunition/Ammunition.types';
import Bomb from '../GameObjects/Ammunition/Bomb';

const enemySpawnTimeStamp = 2;

class Model {
  public game: Game;

  // physic
  public engine = Engine.create();
  public world = this.engine.world;
  public runner = Runner.create();

  // objects
  public gameObjects: GameObject[] = [];
  public player!: Player;
  public border!: Border;

  public spawnTimeStamp = 0;

  constructor(game: Game) {
    this.game = game;
  }

  public initialize(): void {
    this.gameObjects = [];

    this.border = new Border(
      this.game,
      {
        size: new Vector(this.game.viewManager.canvasManager.width, 20),
        position: new Vector(this.game.viewManager.canvasManager.width / 2, this.game.viewManager.canvasManager.height - 20),
        color: 'blue',
      }
    );
    this.player = new Player(this.game);

    this.gameObjects.push(this.border);
    this.gameObjects.push(this.player);
  }

  public loadContent(): void {
    this.initialize();

    this.engine = Engine.create();
    this.world = this.engine.world;
    World.add(this.world, [this.player.body, this.border.body,]);
    Runner.run(this.runner, this.engine);

    Events.on(this.engine, 'collisionStart', this.handleCollisionStartWithAmmunition);
  }

  public unloadContent(): void {
    this.gameObjects = [];

    Runner.stop(this.runner);
    World.clear(this.world, false);
    Engine.clear(this.engine);

    Events.off(this.engine, 'collisionStart', this.handleCollisionStartWithAmmunition);
  }

  public update(gameTime: DOMHighResTimeStamp): void {
    if (this.game.gameState === GameState.Lose || this.game.gameState === GameState.Win || this.game.gameState === GameState.Pause) {
      this.runner.enabled = false;
      this.spawnTimeStamp = 0;
      return;
    }
    this.runner.enabled = true;

    this.spawnTimeStamp += gameTime;
    this.spawnEnemy();

    if (this.player.body.position.y < 0) this.game.gameState = GameState.Win;
    if (this.player.HP <= 0) this.game.gameState = GameState.Lose;

    this.spawnEnemiesPart();

    this.removeDestroyedObjects();

    this.gameObjects.forEach((object) => object.update(gameTime));
  }

  public spawnEnemy(): void {
    if (this.spawnTimeStamp > enemySpawnTimeStamp) {
      this.spawnTimeStamp = 0;

      const enemy = new Enemy(this.game);

      const positionX = MathFunctions.randomInteger(0, this.game.viewManager.canvasManager.width);
      const positionY = enemy.size.height / 2;
      const position = new Vector(positionX, positionY);
      Body.setPosition(enemy.body, position);
      World.add(this.world, [enemy.body]);
      this.gameObjects.push(enemy);
    }
  }

  public spawnEnemiesPart() {
    this.gameObjects.forEach((enemy) => {
      if (enemy instanceof Enemy && enemy.HP <= 0) {
        for (let i = 0; i < 3; i += 1) {
          const enemiesPart = new EnemiesPart(this.game);

          const positionX = enemy.body.position.x;
          const positionY = enemy.body.position.y;
          const position = new Vector(positionX, positionY);
          Body.setPosition(enemiesPart.body, position);
          World.add(this.world, [enemiesPart.body]);
          this.gameObjects.push(enemiesPart);
        }

        enemy.isDestroyed = true;
      }
    });
  }

  public removeDestroyedObjects() {
    this.gameObjects = this.gameObjects.filter((object) => {
      if (object.isDestroyed) World.remove(this.world, object.body);
      return !object.isDestroyed;
    });
  }

  public playerTakeAShot = (args?: EventArgs<IShotData>) => {
    if (args) {
      const {
        unit,
        ammoType,
        mousePosition,
      } = args.data;

      const playerPosition = new Vector(unit.body.position.x, unit.body.position.y);
      const vectorToClickPoint = mousePosition.subtract(playerPosition);
      const unitVector = vectorToClickPoint.getUnitVector();
      const velocity = unitVector.multiplyByNumber(Bullet.velocityBase);
      const position = playerPosition;

      let ammo;
      switch (ammoType) {
        case AmmunitionType.Bomb: {
          ammo = new Bomb(this.game);
          break;
        }
        default: ammo = new Bullet(this.game);
      }

      Body.setVelocity(ammo.body, velocity);
      Body.setPosition(ammo.body, position);

      World.add(this.game.model.world, ammo.body);
      this.game.model.gameObjects.push(ammo);
    }
  };

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

export default Model;