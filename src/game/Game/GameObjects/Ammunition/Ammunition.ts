import GameObject from '../../Types/GameObject';
import Game from '../../Game';
import IObjectOptions from '../../Types/IObjectOptions';
import AnimationFrames from '../../../DrawingSystem/AnimationFrames';

class Ammunition extends GameObject {
  public static velocityBase = 20;

  public get damage() { return 0; }

  constructor(view: Game, imageSrc: string, options: IObjectOptions) {
    super(view, imageSrc, options);

    this.initialize();
  }

  initialize() {
    /* this.body.collisionFilter.category = 0x0002; */
    this.body.collisionFilter.mask = 0x0002;

    const runAnimation = new AnimationFrames(this);
    this.animationFrames.set('run', runAnimation);
  }

  update(gameTime: DOMHighResTimeStamp) {
    this.updateAnimationState();

    super.update(gameTime);
  }

  updateAnimationState() {
    super.updateAnimationState();

    const frame = <AnimationFrames>this.animationFrames.get('run');
    frame.isActive = true;
  }

  destroy() {
    this.isDestroyed = true;
  }
}

export default Ammunition;
