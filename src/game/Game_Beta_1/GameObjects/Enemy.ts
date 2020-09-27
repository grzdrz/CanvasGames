import GameObject from "./GameObject";
import IObjectOptions from "./IObjectOptions";
import Game_Beta_1 from "../Game_Beta_1";

class Enemy extends GameObject {
  public collideObjects = Array<GameObject>();
  public readonly lifeTime = 3;
  public activeTimeStamp = 0;

  constructor(options: IObjectOptions, view: Game_Beta_1) {
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

    super.update(gameTime);
  }
}

export default Enemy;