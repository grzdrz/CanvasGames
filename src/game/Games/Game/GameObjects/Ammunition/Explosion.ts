import { Bodies, Body, World } from "matter-js";
import Vector from "../../../../Helpers/Vector";
import Game from "../../Game";
import GameObject from "../../Types/GameObject";
import IObjectOptions from "../../Types/IObjectOptions";

const imageSrc = './src/game/Images/GameObjects/playerBeta.png';

const defaultOptions = {
  size: new Vector(20, 20),
  position: new Vector(0, 0),
  color: 'purple',
};

class Explosion extends GameObject {
  public lifeTime = 100;
  public startLifeTime = Date.now();
  public lifeTimeStamp = 0;

  constructor(view: Game, options: IObjectOptions = defaultOptions) {
    super(view, imageSrc, options);
  }

  update(gameTime: number) {
    super.update(gameTime);

    this.iterateExplosion();
  }

  public oldTime = Date.now();
  public currentTime = Date.now();
  public timeStamp = 0;
  iterateExplosion = () => {
    this.currentTime = Date.now();

    this.timeStamp = this.currentTime - this.oldTime;
    this.lifeTimeStamp = this.currentTime - this.startLifeTime;

    if (this.timeStamp >= 10) {
      this.oldTime = Date.now();
      this.timeStamp = 0;

      this.size = this.size.multiplyByNumber(1.4);
      World.remove(this.game.model.world, this.body);
      this.body = Bodies.rectangle(this.body.position.x, this.body.position.y, this.size.width, this.size.height);
      this.body.mass = 50;
      World.add(this.game.model.world, this.body);
    }

    if (this.lifeTimeStamp >= this.lifeTime) this.isDestroyed = true;
  }
}

export default Explosion;
