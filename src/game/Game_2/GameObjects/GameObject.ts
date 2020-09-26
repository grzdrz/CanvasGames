import Vector from "../../Helpers/Vector";
import EventArgs from "../../Events/EventArgs";
import IMouseData from "../../Data/IMouseData";
import IObjectOptions from "./IObjectOptions";
import Game_2 from "../Game_2";
import IDrawableSquare from "../../DrawingSystem/IDrawableSquare";
import IDrawableImage from "../../DrawingSystem/IDrawableImage";
import AnimationFrames from "../../DrawingSystem/AnimationFrames";

class GameObject implements IDrawableSquare,/* implements */ IDrawableImage {
  public view: Game_2;

  public position = new Vector(0, 0);
  public size = new Vector(50, 50);
  public angle = 0;

  public velocity = new Vector(0, 0);
  public mass = 1;
  public restitution = 0.9;

  public color = "red";
  public image: HTMLImageElement;
  public isImageLoaded = false;
  public animationFrames = new Map<string, AnimationFrames>();

  public isColliding = false;
  public isPreColliding = false;
  public isCollideWithEnemy = false;
  public isGriped = false;

  public isStatic = false;
  public layerLevel = 1;
  public isDestroyed = false;
  public isCollideWithBorder = false;

  constructor(options: IObjectOptions, view: Game_2, imageSrc: string) {
    this.view = view;

    this.image = new Image();
    this.image.src = imageSrc;
    this.image.onload = () => {
      this.isImageLoaded = true;

    };

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
    this.animationFrames.forEach((frames) => {
      if (frames.isActive) frames.draw();
    });
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

    this.animationFrames.forEach((frames) => {
      if (frames.isActive) frames.update();
    });
  }
}

export default GameObject;
