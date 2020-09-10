import Vector from "../../Helpers/Vector";
import EventArgs from "../../Events/EventArgs";
import IMouseData from "../../Data/IMouseData";
import IObjectOptions from "./IObjectOptions";
import Game_2 from "../Game_2";
import IDrawableSquare from "../../DrawingSystem/IDrawableSquare";

class GameObject implements IDrawableSquare {
  public view: Game_2;

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
  public isCollideWithEnemy = false;
  public isGriped = false;

  public isStatic = false;
  public layerLevel = 1;
  public isDestroyed = false;

  constructor(options: IObjectOptions, view: Game_2) {
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
    this.view.viewManager.canvasManager.drawSquareObject(this);
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
