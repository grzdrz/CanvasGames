import GameObject from "./GameObject";
import IObjectOptions from "./IObjectOptions";
import Game_2 from "../Game_2";
import Bullet from "./Bullet";
import AnimationFrames from "../../DrawingSystem/AnimationFrames";
import Vector from "../../Helpers/Vector";

const imageSrc = './src/game/Images/GameObjects/enemiesPartBeta.png';

class EnemiesPart extends GameObject {
  public activeTimeStamp = 0;
  public readonly lifeTime = 3;

  constructor(options: IObjectOptions = {}, view: Game_2) {
    super(options, view, imageSrc);

    const height = this.view.viewManager.canvasManager.height;
    const width = this.view.viewManager.canvasManager.width;
    /* this.size.width = Math.min(Math.max(width, height) / 30, 50);
    this.size.height = Math.min(Math.max(width, height) / 30, 50); */
    this.size.width = 30;
    this.size.height = 30;

    const runAnimation = new AnimationFrames(this);
    runAnimation.framesTablePosition = new Vector(5, 2);
    this.animationFrames.set('run', runAnimation);
  }

  update(gameTime: DOMHighResTimeStamp) {
    if (this.activeTimeStamp < this.lifeTime) {
      this.activeTimeStamp += gameTime;
    } else {
      this.isStatic = true;
      this.restitution = 1.4;
    }

    if (this.isStatic) {
      this.color = "blue";
    }

    this.updateAnimationState();

    super.update(gameTime);
  }

  public updateAnimationState() {
    this.animationFrames.forEach((frame) => frame.isActive = false);

    const frame = <AnimationFrames>this.animationFrames.get('run');
    frame.isActive = true;
  }
}

export default EnemiesPart;