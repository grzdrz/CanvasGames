import GameObject from "./GameObject";
import IObjectOptions from "./IObjectOptions";
import Game from "../Game";
import Bullet from "./Bullet";
import AnimationFrames from "../../DrawingSystem/AnimationFrames";
import Vector from "../../Helpers/Vector";

const imageSrc = './src/game/Images/GameObjects/enemiesPartBeta.png';

class EnemiesPart extends GameObject {
  public activeTimeStamp = 0;
  public readonly lifeTime = 3;

  constructor(view: Game, options: IObjectOptions) {
    super(view, imageSrc, options);

    this.initialize();
  }

  initialize() {
    /* this.size.width = 30;
    this.size.height = 30; */

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

    this.updateAnimationState();
    super.update(gameTime);
  }

  public updateAnimationState() {
    super.updateAnimationState();

    const frame = <AnimationFrames>this.animationFrames.get('run');
    frame.isActive = true;
  }
}

export default EnemiesPart;