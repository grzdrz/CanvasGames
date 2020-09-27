import Vector from "../../Helpers/Vector";
import IObjectOptions from "./IObjectOptions";
import Game_Beta_1 from "../Game_Beta_1";

class GameObject {
  public view: Game_Beta_1;

  public position = new Vector(0, 0);
  public size = new Vector(50, 50);
  public angle = 0;

  public velocity = new Vector(0, 0);
  public mass = 1;
  public restitution = 0.9;

  public color = "red";

  public firstKeyDowned = "";
  public secondKeyDowned = "";
  public isColliding = false;
  public isPreColliding = false;
  public isGriped = false;

  public isStatic = false;
  public layerLevel = 1;

  constructor(options: IObjectOptions, view: Game_Beta_1) {
    this.view = view;
    this.initialize(options);
  }

  public initialize(options: IObjectOptions): void {
    if (options.size !== undefined) this.size = options.size;
    if (options.position !== undefined) this.position = options.position;
    if (options.velocity !== undefined) this.velocity = options.velocity;
    if (options.mass !== undefined) this.mass = options.mass;
    if (options.restitution !== undefined) this.restitution = options.restitution;
    if (options.color !== undefined) this.color = options.color;
  }

  public draw() {
    this.view.viewManager.canvasManager.drawCircle(this);
  }

  public update(gameTime: DOMHighResTimeStamp): void {
    gameTime *= 10;
    if (!this.isGriped) {
      if (!this.isStatic) {
        this.velocity.y += 9.81 * gameTime;
        this.position.x += this.velocity.x * gameTime;
        this.position.y += this.velocity.y * gameTime;
      } else {
        this.velocity.x = 0;
        this.velocity.y = 0;
      }
    }

    this.angle = Math.atan2(this.velocity.y, this.velocity.x);
  }
}

export default GameObject;
