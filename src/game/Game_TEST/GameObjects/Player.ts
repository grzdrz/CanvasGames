/* import GameObject from "./GameObject";
import Vector from "../../Helpers/Vector";
import EventArgs from "../../Events/EventArgs";
import IObjectOptions from "./IObjectOptions";
import IMouseData from "../../Data/IMouseData";
import Game_TEST from "../Game_TEST";

class Player extends GameObject {
  public HP = 100;

  public damageTimeStamp = 0;

  constructor(options: IObjectOptions, view: Game_TEST) {
    super(options, view);
  }

  public draw() {
    super.draw();
    this.view.viewManager.canvasManager.drawHP(this.HP);
  }

  public update(gameTime: DOMHighResTimeStamp) {
    super.update(gameTime);
    if (this.isColliding && this.damageTimeStamp === 0) {
      this.HP -= 5;
      this.damageTimeStamp += gameTime;
    }

    if (this.damageTimeStamp !== 0) {
      this.damageTimeStamp += gameTime;
      if (this.damageTimeStamp >= 1) {
        this.damageTimeStamp = 0;
      }
    }
  }

  public handlerKeyDown = (eventArgs: EventArgs<IKeyData>) => {
    if (this.firstKeyDowned === "") this.firstKeyDowned = eventArgs.data.key;
    else if (eventArgs.data.key !== this.firstKeyDowned) this.secondKeyDowned = eventArgs.data.key;

    if (this.isPreColliding && this.firstKeyDowned === "Space") {
      if (this.firstKeyDowned === "Space") this.velocity.y -= 30;
    }
    if (this.velocity.x <= 20 && this.firstKeyDowned === "KeyD") this.velocity.x += 10;
    if (this.velocity.x >= -20 && this.firstKeyDowned === "KeyA") this.velocity.x -= 10;

  }

  public handlerKeyUp = () => {
    if (this.secondKeyDowned === "") this.firstKeyDowned = "";
    else this.secondKeyDowned = "";
  }

  public handlerSetPosition = (eventArgs: EventArgs<IMouseData>) => {
    this.isGriped = true;
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.position.x = eventArgs.data.mousePosition.x;
    this.position.y = eventArgs.data.mousePosition.y;
  }

  public handlerUnhand = (eventArgs: EventArgs<IMouseData>) => {
    this.isGriped = false;
  }

  public handleClick = (eventArgs: EventArgs<IMouseData>) => {
    if (this.isPreColliding) {
      const vectorToClickPoint = eventArgs.data.mousePosition.subtract(this.position);
      const lengthToClickPoint = Math.min(vectorToClickPoint.length, 500);
      const unitVector = vectorToClickPoint.getUnitVector();
      const velocity = unitVector.multiplyByNumber(lengthToClickPoint / 10);
      this.velocity = this.velocity.sum(velocity);
    }
  }
}

export default Player; */