import GameObject from "./GameObject";
import IObjectOptions from "./IObjectOptions";
import Game_2 from "../Game_2";

class Enemy extends GameObject {
  public collideObjects = Array<GameObject>();
  public readonly lifeTime = 3;
  public activeTimeStamp = 0;

  constructor(options: IObjectOptions, view: Game_2) {
    super(options, view);

    const height = this.view.viewManager.canvasManager.height;
    const width = this.view.viewManager.canvasManager.width;
    this.size.width = Math.min(Math.max(width, height) / 25, 50);
    this.size.height = Math.min(Math.max(width, height) / 25, 50);
  }

  update(gameTime: DOMHighResTimeStamp) {
    if (this.activeTimeStamp < this.lifeTime) {
      this.activeTimeStamp += gameTime;
    } else {
      this.isStatic = true;
      this.restitution = 1.4;
    }

    if (this.isStatic) {
      this.color = "blue";
    }
    /* if (this.isColliding) {
      this.color = "purple";
    } else {
      this.color = "red";
    } */

    super.update(gameTime);
  }
}

export default Enemy;