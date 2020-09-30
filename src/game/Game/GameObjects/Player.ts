import GameObject from './GameObject';
import Vector from '../../Helpers/Vector';
import EventArgs from '../../Events/EventArgs';
import IObjectOptions from './IObjectOptions';
import IMouseData from '../../Data/IMouseData';
import Game from '../Game';
import Bullet from './Bullet';
import AnimationFrames from '../../DrawingSystem/AnimationFrames';
import { Body } from 'matter-js';

const imageSrc = './src/game/Images/GameObjects/playerBeta.png';

class Player extends GameObject {
  public HP = 100;
  public damageTimeStamp = 0;

  public pressedKeys = new Set<string>();

  constructor(view: Game, options: IObjectOptions) {
    super(view, imageSrc, options);

    this.initialize();
  }

  initialize() {
    /* this.size.width = 150;
    this.size.height = 150; */

    const standAnimation = new AnimationFrames(this);
    standAnimation.framesTotalCount = 1;
    this.animationFrames.set('stand', standAnimation);

    const runAnimation = new AnimationFrames(this);
    this.animationFrames.set('run', runAnimation);
  }

  public draw() {
    super.draw();
    this.view.viewManager.canvasManager.drawHP(this.HP);
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

    /* this.angle = 0; */

    this.updateAnimationState();
  }

  public updateAnimationState() {
    super.updateAnimationState();

    const velocityVector = new Vector(this.body.velocity.x, this.body.velocity.y);
    const velocityUnitVector = velocityVector.getUnitVector();
    if (Math.abs(velocityUnitVector.y) === 1) {
      const frame = <AnimationFrames>this.animationFrames.get('stand');
      frame.isActive = true;
    } else {
      const frame = <AnimationFrames>this.animationFrames.get('run');
      frame.isActive = true;
    }
  }

  public handlerKeyDown = (eventArgs: EventArgs<IKeyData>) => {
    this.pressedKeys.add(eventArgs.data.key);

    if (/* this.isPreColliding &&  */this.pressedKeys.has('Space')) this.body.velocity.y = -50;
    if (this.pressedKeys.has('KeyD')) this.body.velocity.x = 40;
    if (this.pressedKeys.has('KeyA')) this.body.velocity.x = -40;

    if (this.body.velocity.x <= -40) this.body.velocity.x = -40;
    if (this.body.velocity.x >= 40) this.body.velocity.x = 40;
    if (this.body.velocity.y <= -50) this.body.velocity.y = -50;
  }

  public handlerKeyUp = (eventArgs: EventArgs<IKeyData>) => {
    this.pressedKeys.delete(eventArgs.data.key);
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

    this.currentShotTime = Date.now();
    this.shotTimeStamp = this.currentShotTime - this.oldShotTime;
    if (this.shotTimeStamp >= 100) {
      this.oldShotTime = Date.now();
      this.shotTimeStamp = 0;
    } else return;

    /* const vectorToClickPoint = eventArgs.data.mousePosition.subtract(this.position);
    const unitVector = vectorToClickPoint.getUnitVector();

    const bullet = new Bullet(this.view);

    const velocity = unitVector.multiplyByNumber(bullet.velocityBase);
    const position = new Vector(this.position.x, this.position.y);
    bullet.velocity = velocity;
    bullet.position = position;

    this.view.gameObjects.push(bullet); */
  }
}

export default Player;