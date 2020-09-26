import GameObject from './GameObject';
import Vector from '../../Helpers/Vector';
import EventArgs from '../../Events/EventArgs';
import IObjectOptions from './IObjectOptions';
import IMouseData from '../../Data/IMouseData';
import Game_2 from '../Game_2';
import Bullet from './Bullet';
import AnimationFrames from '../../DrawingSystem/AnimationFrames';

const imageSrc = './src/game/Images/GameObjects/playerBeta.png';

class Player extends GameObject {
  public HP = 100;
  public damageTimeStamp = 0;
  /* public isCollideWithEnemy = false; */

  public pressedKeys = new Set<string>();

  constructor(options: IObjectOptions, view: Game_2) {
    super(options, view, imageSrc);

    const height = this.view.viewManager.canvasManager.height;
    const width = this.view.viewManager.canvasManager.width;
    /* this.size.width = Math.min(Math.max(width, height) / 10, 150);
    this.size.height = Math.min(Math.max(width, height) / 10, 150); */
    this.size.width = 150;
    this.size.height = 150;

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

    this.angle = 0;

    this.updateAnimationState();
  }

  public updateAnimationState() {
    this.animationFrames.forEach((frame) => frame.isActive = false);

    const velocityUnitVector = this.velocity.getUnitVector();
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

    if (/* this.isPreColliding &&  */this.pressedKeys.has('Space')) this.velocity.y = -50;
    if (this.pressedKeys.has('KeyD')) this.velocity.x = 40;
    if (this.pressedKeys.has('KeyA')) this.velocity.x = -40;

    if (this.velocity.x <= -40) this.velocity.x = -40;
    if (this.velocity.x >= 40) this.velocity.x = 40;
    if (this.velocity.y <= -50) this.velocity.y = -50;
  }

  public handlerKeyUp = (eventArgs: EventArgs<IKeyData>) => {
    this.pressedKeys.delete(eventArgs.data.key);
  }

  public handlerSetPosition = (eventArgs: EventArgs<IMouseData>) => {
    if (eventArgs.data.button !== 2) return;
    this.isGriped = true;
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.position.x = eventArgs.data.mousePosition.x;
    this.position.y = eventArgs.data.mousePosition.y;
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

    const vectorToClickPoint = eventArgs.data.mousePosition.subtract(this.position);
    const unitVector = vectorToClickPoint.getUnitVector();

    const bullet = new Bullet({}, this.view);

    const velocity = unitVector.multiplyByNumber(bullet.velocityBase);
    const position = new Vector(this.position.x, this.position.y);
    bullet.velocity = velocity;
    bullet.position = position;

    this.view.gameObjects.push(bullet);
    /* if (this.isPreColliding) {
      const vectorToClickPoint = eventArgs.data.mousePosition.subtract(this.position);
      const lengthToClickPoint = Math.max(vectorToClickPoint.length, 500);
      const unitVector = vectorToClickPoint.getUnitVector();
      const velocity = unitVector.multiplyByNumber(lengthToClickPoint / 10);
      this.velocity = this.velocity.sum(velocity);
    } */
  }
}

export default Player;