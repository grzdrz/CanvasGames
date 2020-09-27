import Vector from "../../Helpers/Vector";
import EventArgs from "../../Events/EventArgs";
import IMouseData from "../../Data/IMouseData";
import IObjectOptions from "./IObjectOptions";
import Game from "../Game";
import IDrawableSimpleShape from "../../DrawingSystem/IDrawableSimpleShape";
import IDrawableImage from "../../DrawingSystem/IDrawableImage";
import AnimationFrames from "../../DrawingSystem/AnimationFrames";

class GameObject implements IDrawableSimpleShape, IDrawableImage {
  public view: Game;

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

  constructor(view: Game, imageSrc: string, options: IObjectOptions) {
    this.view = view;

    this.image = new Image();
    this.image.src = imageSrc;
    this.image.onload = () => {
      this.isImageLoaded = true;

    };

    this.updateState(options);
  }

  public updateState(options: IObjectOptions): void {
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
    this.angle = Math.atan2(this.velocity.y, this.velocity.x);
    this.animationFrames.forEach((frames) => {
      if (frames.isActive) frames.update();
    });
  }

  public updateAnimationState() {
    this.animationFrames.forEach((frame) => frame.isActive = false);
  }
}

export default GameObject;
