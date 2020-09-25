import GameObject from "./GameObject";
import Game_2 from "../Game_2";
import IObjectOptions from "./IObjectOptions";

const imageSrc = './src/game/Images/Interface/buttonPlay.png';

class Bullet extends GameObject {
  public velocityBase = 100;
  public static damage = 20;

  constructor(options: IObjectOptions = {}, view: Game_2) {
    super(options, view, imageSrc);

    this.size.x = 10;
    this.size.y = 10;
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
