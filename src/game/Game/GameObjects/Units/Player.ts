import { Body, World } from 'matter-js';

import AnimationFrames from '../../../DrawingSystem/AnimationFrames';
import Vector from '../../../Helpers/Vector';
import EventArgs from '../../../Events/EventArgs';
import IMouseData from '../../../Data/IMouseData';
import GameObject from '../../Types/GameObject';
import IObjectOptions from '../../Types/IObjectOptions';
import Game from '../../Game';
import AmmunitionType from '../Ammunition/Ammunition.types';
import Bullet from '../Ammunition/Bullet';
import Bomb from '../Ammunition/Bomb';

const imageSrc = './src/game/Images/GameObjects/playerBeta.png';

class Player extends GameObject {
  public HP = 100;
  public damageTimeStamp = 0;

  public pressedKeys = new Set<string>();

  public activeAmmunition = AmmunitionType.Bullet;

  public angle = 0;

  constructor(game: Game, options: IObjectOptions = {
    size: new Vector(50, 65),
    position: new Vector(150, 150),
    color: "green",
    mass: 1,
    restitution: 0.9,
  }) {
    super(game, imageSrc, options);

    this.initialize();
  }

  initialize() {
    const standAnimation = new AnimationFrames(this);
    standAnimation.framesTotalCount = 1;
    this.animationFrames.set('stand', standAnimation);

    const runAnimation = new AnimationFrames(this);
    this.animationFrames.set('run', runAnimation);
  }

  public draw() {
    super.draw();
  }

  public update(gameTime: DOMHighResTimeStamp) {
    super.update(gameTime);
    /* if (this.isCollideWithEnemy && this.damageTimeStamp === 0) {
      this.HP -= 5;
      this.damageTimeStamp += gameTime;
    } */

    if (this.damageTimeStamp !== 0) {
      this.damageTimeStamp += gameTime;
      if (this.damageTimeStamp >= 1) {
        this.damageTimeStamp = 0;
      }
    }

    Body.setAngle(this.body, 0);

    this.updateAnimationState();
  }

  public updateAnimationState() {
    super.updateAnimationState();

    const velocityVector = new Vector(this.body.velocity.x, this.body.velocity.y);
    const velocityUnitVector = velocityVector.getUnitVector();
    if (this.pressedKeys.has('KeyD') || this.pressedKeys.has('KeyA')) {
      const frame = <AnimationFrames>this.animationFrames.get('run');
      frame.isActive = true;
    } else {
      const frame = <AnimationFrames>this.animationFrames.get('stand');
      frame.isActive = true;
    }
  }

  public handlerKeyDown = (eventArgs: EventArgs<IKeyData>) => {
    this.pressedKeys.add(eventArgs.data.key);

    const velocity = { ...this.body.velocity };
    if (/* this.isPreColliding &&  */this.pressedKeys.has('Space')) velocity.y -= 10;
    if (this.pressedKeys.has('KeyD')) {
      velocity.x = 10;
      this.angle = 0;
    }
    if (this.pressedKeys.has('KeyA')) {
      velocity.x = -10;
      this.angle = Math.PI;
    }

    if (this.body.velocity.x <= -10) velocity.x = -10;
    if (this.body.velocity.x >= 10) velocity.x = 10;
    if (this.body.velocity.y <= -10) velocity.y = -10;

    Body.setVelocity(this.body, velocity);
  }

  public handlerKeyUp = (eventArgs: EventArgs<IKeyData>) => {
    this.pressedKeys.delete(eventArgs.data.key);
  }

  public handleChangeAmmo = (eventArgs: EventArgs<IKeyData>) => {
    const key = eventArgs.data.key;
    switch (key) {
      case 'Digit1': {
        this.activeAmmunition = AmmunitionType.Bullet;
        break;
      }
      case 'Digit2': {
        this.activeAmmunition = AmmunitionType.Bomb;
        break;
      }
    }
  }

  public handlerSetPosition = (eventArgs: EventArgs<IMouseData>) => {
    if (eventArgs.data.button !== 2) return;
    this.isGriped = true;

    Body.setVelocity(this.body, { x: 0, y: 0 });
    Body.setPosition(this.body, { x: eventArgs.data.mousePosition.x, y: eventArgs.data.mousePosition.y });
  }

  public handlerUnhand = (eventArgs: EventArgs<IMouseData>) => {
    this.isGriped = false;
  }

  public oldShotTime = Date.now();
  public currentShotTime = Date.now();
  public shotTimeStamp = 0;
  public handleShot = (eventArgs: EventArgs<IMouseData>) => {
    if (eventArgs.data.button !== 0) return;

    // периодичность между выстрелами(мили секунды)
    let timeStamp = 0;
    if (this.activeAmmunition === AmmunitionType.Bullet)
      timeStamp = Bullet.timeStamp;
    else
      timeStamp = Bomb.timeStamp;

    this.currentShotTime = Date.now();
    this.shotTimeStamp = this.currentShotTime - this.oldShotTime;
    if (this.shotTimeStamp >= timeStamp) {
      this.oldShotTime = Date.now();
      this.shotTimeStamp = 0;
    } else return;

    const playerPosition = new Vector(this.body.position.x, this.body.position.y);
    const vectorToClickPoint = eventArgs.data.mousePosition.subtract(playerPosition);
    const unitVector = vectorToClickPoint.getUnitVector();

    const velocity = unitVector.multiplyByNumber(Bullet.velocityBase);
    const position = playerPosition;
    let ammo;
    if (this.activeAmmunition === AmmunitionType.Bullet) {
      ammo = new Bullet(this.game);
    }
    else {
      ammo = new Bomb(this.game);
    }
    Body.setVelocity(ammo.body, velocity);
    Body.setPosition(ammo.body, position);

    World.add(this.game.model.world, ammo.body);
    this.game.model.gameObjects.push(ammo);
  }
}

export default Player;