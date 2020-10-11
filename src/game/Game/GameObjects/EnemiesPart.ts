import GameObject from "./GameObject";
import IObjectOptions from "./IObjectOptions";
import Game from "../Game";
import Ammunition from "./Ammunution/Ammunition";
import AnimationFrames from "../../DrawingSystem/AnimationFrames";
import Vector from "../../Helpers/Vector";

const imageSrc = './src/game/Images/GameObjects/enemiesPartBeta.png';

class EnemiesPart extends GameObject {
  public HP = 50;
  public activeTimeStamp = 0;
  public readonly lifeTime = 3;

  constructor(view: Game, options: IObjectOptions) {
    super(view, imageSrc, options);

    this.initialize();
  }

  public static create(view: Game) {
    return new EnemiesPart(view, {
      size: new Vector(50, 60),
      position: new Vector(0, 0),
      color: "black",
      mass: 1,
      restitution: 0.9,
    });
  }

  initialize() {
    this.body.collisionFilter.category = 0x0002;

    const runAnimation = new AnimationFrames(this);
    runAnimation.framesTablePosition = new Vector(5, 2);
    this.animationFrames.set('run', runAnimation);
  }

  update(gameTime: DOMHighResTimeStamp) {
    if (this.activeTimeStamp < this.lifeTime) {
      this.activeTimeStamp += gameTime;
    } /* else {
      // this.isStatic = true;
    } */

    if (this.HP <= 0) this.isDestroyed = true;

    this.updateAnimationState();
    super.update(gameTime);
  }

  public updateAnimationState() {
    super.updateAnimationState();

    const frame = <AnimationFrames>this.animationFrames.get('run');
    frame.isActive = true;
  }

  public damage(damage: number) {
    this.HP -= damage;
  }

}

export default EnemiesPart;