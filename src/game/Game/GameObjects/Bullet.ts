import Matter from 'matter-js';

import GameObject from "./GameObject";
import Game from "../Game";
import IObjectOptions from "./IObjectOptions";
import AnimationFrames from "../../DrawingSystem/AnimationFrames";

const imageSrc = './src/game/Images/GameObjects/playerBeta.png';

class Bullet extends GameObject {
  public static velocityBase = 20;
  public static damage = 20;

  constructor(view: Game, options: IObjectOptions) {
    super(view, imageSrc, options);

    this.initialize();
  }

  initialize() {
    /* this.size.x = 30;
    this.size.y = 20;
    this.mass = 0.00001; */
    this.color = "yellow";

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

export default Bullet;
