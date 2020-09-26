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

  public fps = 1000 / 10;
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
    this.frameSize = new Vector(this.size.width / 4, this.size.height / 2);

    this.sizingWidthKoef = this.object.size.width / this.frameSize.width;
    this.sizingHeightKoef = this.object.size.height / this.frameSize.height;
  }

  draw() {
    const canvas = this.object.view.viewManager.canvasManager;
    if (this.object.isImageLoaded) {
      const frameWidth = this.frameSize.width * this.sizingWidthKoef;
      const frameHeight = this.frameSize.height * this.sizingHeightKoef;
      const framePositionOnCanvasX = this.object.position.x - frameWidth / 2;
      const framePositionOnCanvasY = this.object.position.y - frameHeight / 2;

      //точка вращения относительно канваса
      const frameCenterOnCanvasX = framePositionOnCanvasX + this.object.size.width / 2;
      const frameCenterOnCanvasY = framePositionOnCanvasY + this.object.size.height / 2;
      //центр объекта относительно самого себя
      const frameCenterX = -this.object.size.width / 2;
      const frameCenterY = -this.object.size.height / 2;
      canvas.context.setTransform(1, 0, 0, 1, frameCenterOnCanvasX, frameCenterOnCanvasY);
      canvas.context.rotate(this.object.angle);

      canvas.context.drawImage(
        this.object.image,
        this.currentFrame.x,
        this.currentFrame.y,
        this.frameSize.width,
        this.frameSize.height,
        frameCenterX,
        frameCenterY,
        frameWidth,
        frameHeight,
      );

      canvas.context.resetTransform();
    } else { // заглушка, до подгрузки изображения
      canvas.drawSquare(this.object.position, this.object.size, "rgb(12, 123, 222)");
    }
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
