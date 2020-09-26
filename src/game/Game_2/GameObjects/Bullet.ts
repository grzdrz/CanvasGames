import GameObject from "./GameObject";
import Game_2 from "../Game_2";
import IObjectOptions from "./IObjectOptions";
import AnimationFrames from "../../DrawingSystem/AnimationFrames";

const imageSrc = './src/game/Images/GameObjects/playerBeta.png';

class Bullet extends GameObject {
  public velocityBase = 100;
  public static damage = 20;

  constructor(options: IObjectOptions = {}, view: Game_2) {
    super(options, view, imageSrc);

    this.size.x = 30;
    this.size.y = 20;
    this.color = "yellow";
    this.mass = 0.00001;

    const runAnimation = new AnimationFrames(this);
    this.animationFrames.set('run', runAnimation);
  }

  update(gameTime: DOMHighResTimeStamp) {
    if (this.isColliding) {
      this.isDestroyed = true;
    }

    this.updateAnimationState();

    super.update(gameTime);
  }

  /* draw() {
    this.view.viewManager.canvasManager.drawSquare(this.position, this.size, this.color);
  } */

  public updateAnimationState() {
    this.animationFrames.forEach((frame) => frame.isActive = false);

    const frame = <AnimationFrames>this.animationFrames.get('run');
    frame.isActive = true;
  }
}

export default Bullet;
