import { Body } from 'matter-js';

import AnimationFrames from '../../../DrawingSystem/AnimationFrames';
import Vector from '../../../Helpers/Vector'
import GameObject from '../../Types/GameObject';
import IObjectOptions from '../../Types/IObjectOptions';
import Game from '../../Game';;

const imageSrc = './src/game/Images/GameObjects/enemiesPartBeta.png';
const enemyVelocityCoefficient = 0.1;

class Enemy extends GameObject {
  public HP = 150;

  public collideObjects = Array<GameObject>();
  public readonly lifeTime = 3;
  public activeTimeStamp = 0;

  constructor(view: Game, options: IObjectOptions = {
    size: new Vector(100, 100),
    position: new Vector(0, 0),
    color: 'red',
    mass: 1,
    restitution: 0.9,
  }) {
    super(view, imageSrc, options);

    this.initialize();
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

  public damage(damage: number) {
    this.HP -= damage;
  }

  public moveToPlayer() {
    const { player } = this.game.model;

    const playerPosition = new Vector(player.body.position.x, player.body.position.y);
    const thisPosition = new Vector(this.body.position.x, this.body.position.y);
    const deltaPositions = playerPosition.subtract(thisPosition);
    const unitDeltaPositions = deltaPositions.getUnitVector();

    const velocityToPlayer = unitDeltaPositions.multiplyByNumber(enemyVelocityCoefficient);
    const currentVelocity = new Vector(this.body.velocity.x, this.body.velocity.y);
    Body.setVelocity(this.body, currentVelocity.sum(velocityToPlayer));
  }
}

export default Enemy;