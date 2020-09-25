import GameObject from "../Game_2/GameObjects/GameObject";
import Vector from "../Helpers/Vector";
import IDrawableImage from "./IDrawableImage";

class AnimationFrames {
  /* public framesImage: HTMLImageElement;
  public isImageLoaded: boolean;
  public position: Vector;
  public size: Vector;
  public angle: number; */
  public object: GameObject;

  public fps = 1000 / 60;
  public startTime = Date.now();
  public currentTime = Date.now();
  public deltaTime = 0;
  public currentFrame = Vector.zero;

  public size: Vector;
  public frameSize: Vector;

  public sizingWidthKoef: number;
  public sizingHeightKoef: number;

  constructor(object: GameObject) {
    this.object = object;

    this.size = new Vector(this.object.image.naturalWidth, this.object.image.naturalHeight);
    this.frameSize = new Vector(this.size.width / 4, this.size.height / 4);

    this.sizingWidthKoef = this.object.size.width / this.frameSize.width;
    this.sizingHeightKoef = this.object.size.height / this.frameSize.height;
  }

  draw() {
    if (!this.object.isImageLoaded) return;
    const canvas = this.object.view.viewManager.canvasManager;

    const frameWidth = this.frameSize.width * this.sizingWidthKoef;
    const frameHeight = this.frameSize.height * this.sizingHeightKoef;

    canvas.context.drawImage(
      this.object.image,
      this.currentFrame.x,
      this.currentFrame.y,
      this.frameSize.width,
      this.frameSize.height,
      this.object.position.x - frameWidth / 2,
      this.object.position.y - frameHeight / 2,
      frameWidth,
      frameHeight,
    );
  }

  update() {
    this.currentTime = Date.now();
    this.deltaTime = this.currentTime - this.startTime;
    if (this.deltaTime > this.fps) {
      this.deltaTime = 0;
      this.startTime = this.currentTime;

      if (this.currentFrame.x < this.size.width - this.frameSize.width) {
        this.currentFrame.x = this.currentFrame.x + this.frameSize.width;
      }
      else if (this.currentFrame.y < this.size.height - this.frameSize.height) {
        this.currentFrame.x = 0;
        this.currentFrame.y = this.currentFrame.y + this.frameSize.height;
      }
      else {
        this.currentFrame.x = 0;
        this.currentFrame.y = 0;
      }
    }
  }
}

export default AnimationFrames;
