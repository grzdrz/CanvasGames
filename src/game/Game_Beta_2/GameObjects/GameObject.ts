import Vector from "../../Helpers/Vector";
import EventArgs from "../../Events/EventArgs";
import IMouseData from "../../Data/IMouseData";
import IObjectOptions from "./IObjectOptions";
import Game_Beta_2 from "../Game_Beta_2";
import Vertex from "../../Helpers/Vertex";
import IDrawablePolygon from "../../DrawingSystem/IDrawablePolygon";

class GameObject implements IDrawablePolygon {
  public view: Game_Beta_2;

  public vertices = new Array<Vertex>();
  public center = Vector.zero;
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

  constructor(options: IObjectOptions, view: Game_Beta_2) {
    this.view = view;
    this.initialize(options);
  }

  public initialize(options: IObjectOptions): void {
    if (options.vertices !== undefined) this.vertices = options.vertices;
    if (options.velocity !== undefined) this.velocity = options.velocity;
    if (options.mass !== undefined) this.mass = options.mass;
    if (options.restitution !== undefined) this.restitution = options.restitution;
    if (options.color !== undefined) this.color = options.color;
  }

  public draw() {
    this.view.viewManager.canvasManager.drawConvexPolygon(this);
  }

  public update(gameTime: DOMHighResTimeStamp): void {
    gameTime *= 10;
    if (!this.isGriped) {
      if (!this.isStatic) {
        /* this.velocity.y += 9.81 * gameTime; */
        /* this.position.x += this.velocity.x * gameTime;
        this.position.y += this.velocity.y * gameTime; */
        this.changePosition(gameTime);
      } else {
        this.velocity.x = 0;
        this.velocity.y = 0;
      }
    }

    this.angle = Math.atan2(this.velocity.y, this.velocity.x);
  }

  public findCenter() {
    let sumX = 0;
    let sumY = 0;
    this.vertices.forEach((vertex) => {
      sumX += vertex.position.x;
      sumY += vertex.position.y;
    });
    this.center.x = sumX / this.vertices.length;
    this.center.y = sumY / this.vertices.length;
  }

  public changePosition(gameTime: DOMHighResTimeStamp) {
    this.vertices.forEach((vertex) => {
      vertex.position.x += this.velocity.x * gameTime;
      vertex.position.y += this.velocity.y * gameTime;
    });
  }

  public rotateVertices() {
    this.vertices.forEach((vertex) => {
      vertex.rotate(this.center, this.angle);
    });
  }
}

export default GameObject;
