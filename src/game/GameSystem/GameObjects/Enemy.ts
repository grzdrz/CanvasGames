import GameObject from "./GameObject";
import IObjectOptions from "./IObjectOptions";
import SessionView from "../../ViewSystem/Views/SessionView";

class Enemy extends GameObject {
  public collideObjects = Array<GameObject>();
  public activeTimeStamp = 0;

  constructor(options: IObjectOptions, view: SessionView) {
    super(options, view);
  }

  update(gameTime: DOMHighResTimeStamp) {
    if (this.activeTimeStamp < 10) {
      this.activeTimeStamp += gameTime;
    } else {
      this.isStatic = true;
      this.restitution = 1.4;
    }

    super.update(gameTime);
  }
}

export default Enemy;