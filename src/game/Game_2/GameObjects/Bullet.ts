import GameObject from "./GameObject";
import Game_2 from "../Game_2";
import IObjectOptions from "./IObjectOptions";

const imageSrc = './src/game/Images/Interface/***.png';

class Bullet extends GameObject {
  public velocityBase = 100;
  public static damage = 20;

  constructor(options: IObjectOptions = {}, view: Game_2) {
    super(options, view, imageSrc);

    this.size.x = 30;
    this.size.y = 20;
    this.color = "yellow";
    this.mass = 0.00001;
  }

  update(gameTime: DOMHighResTimeStamp) {
    if (this.isColliding) {
      this.isDestroyed = true;
    }
    super.update(gameTime);
  }

  /* draw() {
    this
  } */
}

export default Bullet;
