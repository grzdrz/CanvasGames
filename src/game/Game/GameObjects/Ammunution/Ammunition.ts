import Matter from 'matter-js';

import GameObject from "../GameObject";
import Game from "../../Game";
import IObjectOptions from "../IObjectOptions";
import AnimationFrames from "../../../DrawingSystem/AnimationFrames";

class Ammunition extends GameObject {
  public static velocityBase = 20;

  public get damage() { return 0; }

  constructor(view: Game, imageSrc: string, options: IObjectOptions) {
    super(view, imageSrc, options);

    this.initialize();
  }

  initialize() {
    const runAnimation = new AnimationFrames(this);
    this.animationFrames.set('run', runAnimation);
  }

  update(gameTime: DOMHighResTimeStamp) {
    if (this.isCollideWithBorder || this.isCollideWithEnemy) {
      this.isDestroyed = true;
    }

    this.updateAnimationState();

    super.update(gameTime);
  }

  updateAnimationState() {
    super.updateAnimationState();

    const frame = <AnimationFrames>this.animationFrames.get('run');
    frame.isActive = true;
  }
}

export default Ammunition;
