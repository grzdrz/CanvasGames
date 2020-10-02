import GameObject from "./GameObject";
import IObjectOptions from "./IObjectOptions";
import Game from "../Game";
import Ammunition from "./Ammunution/Ammunition";
import AnimationFrames from "../../DrawingSystem/AnimationFrames";
import Vector from "../../Helpers/Vector";
import Player from "./Player";
import { Body, Engine, World } from "matter-js";

const imageSrc = './src/game/Images/GameObjects/enemiesPartBeta.png';
const enemyVelocityCoefficient = 0.2;

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

    /* if (this.isCollideWithEnemy && !this.isStatic) {
      this.HP -= Ammunition.damage;
    } */
    /* if (this.HP <= 0) this.isStatic = true; */

    this.moveToPlayer();

    this.updateAnimationState();
    super.update(gameTime);
  }

  public updateAnimationState() {
    super.updateAnimationState();

    const frame = <AnimationFrames>this.animationFrames.get('run');
    frame.isActive = true;
  }

  public getDamaged(damage: number) {
    this.HP -= damage;
  }

  public moveToPlayer() {
    const { player } = this.view;

    const playerPosition = new Vector(player.body.position.x, player.body.position.y);
    const thisPosition = new Vector(this.body.position.x, this.body.position.y);
    const deltaPositions = playerPosition.subtract(thisPosition);
    const unitDeltaPositions = deltaPositions.getUnitVector();

    const velocityToPlayer = unitDeltaPositions.multiplyByNumber(enemyVelocityCoefficient);
    const currentVelocity = new Vector(this.body.velocity.x, this.body.velocity.y);
    Body.setVelocity(this.body, currentVelocity.sum(velocityToPlayer));
    /* const velocityToPlayer = unitDeltaPositions.multiplyByNumber(enemyVelocityCoefficient);
    const currentPosition = new Vector(this.body.position.x, this.body.position.y);
    Body.setPosition(this.body, currentPosition.sum(velocityToPlayer)); */
  }
}

export default Enemy;