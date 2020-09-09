import GameObject from "./GameObject";
import Vector from "../../Helpers/Vector";
import EventArgs from "../../Events/EventArgs";
import IObjectOptions from "./IObjectOptions";
import IMouseData from "../../Data/IMouseData";
import Game_TEST from "../Game_TEST";
import Vertex from "../../Helpers/Vertex";

class Player extends GameObject {
  public HP = 100;

  public damageTimeStamp = 0;

  constructor(view: Game_TEST) {
    super({
      vertices: [
        new Vertex(new Vector(50, 50)),
        new Vertex(new Vector(80, 50)),
        new Vertex(new Vector(100, 70)),
        new Vertex(new Vector(120, 100)),
        new Vertex(new Vector(60, 150)),
        new Vertex(new Vector(30, 110)),
      ],
      velocity: new Vector(50, 50),
      color: "green",
      mass: 1,
      restitution: 0.9,
    }, view);
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

  public handlerSetPosition = (eventArgs: EventArgs<IMouseData>) => {
    this.isGriped = true;
    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  public handlerUnhand = (eventArgs: EventArgs<IMouseData>) => {
    this.isGriped = false;
  }
}

export default Player;