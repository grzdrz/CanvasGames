import GameObject from "./GameObject";
import IObjectOptions from "./IObjectOptions";
import Game from "../Game";
import Bullet from "./Bullet";
import AnimationFrames from "../../DrawingSystem/AnimationFrames";
import Vector from "../../Helpers/Vector";

const imageSrc = './src/game/Images/GameObjects/enemiesPartBeta.png';

class Enemy extends GameObject {
  public HP = 100;

  public collideObjects = Array<GameObject>();
  public readonly lifeTime = 3;
  public activeTimeStamp = 0;

  constructor(view: Game, options: IObjectOptions) {
    super(view, imageSrc, options);

    this.initialize();
  }

  initialize() {
    /* const height = this.view.viewManager.canvasManager.height;
    const width = this.view.viewManager.canvasManager.width;
    this.size.width = Math.min(Math.max(width, height) / 25, 50);
    this.size.height = Math.min(Math.max(width, height) / 25, 50); */

    const runAnimation = new AnimationFrames(this);
    runAnimation.framesTablePosition = new Vector(5, 2);
    this.animationFrames.set('run', runAnimation);
  }

  update(gameTime: DOMHighResTimeStamp) {
    if (this.activeTimeStamp < this.lifeTime) {
      this.activeTimeStamp += gameTime;
    } /* else {
      // this.isStatic = true;
      this.restitution = 1.4;
    } */

    if (this.isCollideWithEnemy && !this.isStatic) {
      this.HP -= Bullet.damage;
    }
    if (this.HP <= 0) this.isStatic = true;

    this.updateAnimationState();
    super.update(gameTime);
  }

  public updateAnimationState() {
    super.updateAnimationState();

    const frame = <AnimationFrames>this.animationFrames.get('run');
    frame.isActive = true;
  }
}

export default Enemy;