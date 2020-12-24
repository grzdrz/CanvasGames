import Enemy from "../Game/GameObjects/Units/Enemy";
import GameObject from "../Game/Types/GameObject";
import Vector from "../Helpers/Vector";

const additionalSize = 10;

class AnimationFrames {
  public isActive = false;

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

  public framesTablePosition = new Vector(3, 2);
  public framesTotalCount = this.framesTablePosition.width * this.framesTablePosition.height;
  public framesCurrentCount = 1;

  constructor(object: GameObject) {
    this.object = object;

    this.size = new Vector(this.object.image.naturalWidth, this.object.image.naturalHeight);
    this.frameSize = new Vector(this.size.width / this.framesTablePosition.x, this.size.height / this.framesTablePosition.y);

    this.sizingWidthKoef = (this.object.size.width + additionalSize) / this.frameSize.width;
    this.sizingHeightKoef = (this.object.size.height + additionalSize) / this.frameSize.height;
  }

  draw() {
    const canvas = this.object.game.viewManager.canvasManager;
    if (this.object.isImageLoaded) {
      const frameWidth = this.frameSize.width * this.sizingWidthKoef;
      const frameHeight = this.frameSize.height * this.sizingHeightKoef;
      const framePositionOnCanvasX = this.object.body.position.x - frameWidth / 2;
      const framePositionOnCanvasY = this.object.body.position.y - frameHeight / 2;

      //точка вращения относительно канваса
      const frameCenterOnCanvasX = framePositionOnCanvasX + (this.object.size.width + additionalSize) / 2;
      const frameCenterOnCanvasY = framePositionOnCanvasY + (this.object.size.height + additionalSize) / 2;
      //центр объекта относительно самого себя
      const frameCenterX = -(this.object.size.width + additionalSize) / 2;
      const frameCenterY = -(this.object.size.height + additionalSize) / 2;
      canvas.context.setTransform(1, 0, 0, 1, frameCenterOnCanvasX, frameCenterOnCanvasY);
      canvas.context.rotate(this.object.body.angle);

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
      this.drawObject(this.object);
    }
  }

  update() {
    this.updateFrameSize();

    this.currentTime = Date.now();
    this.deltaTime = this.currentTime - this.startTime;
    if (this.deltaTime > this.fps) {
      this.deltaTime = 0;
      this.startTime = this.currentTime;

      if (this.framesCurrentCount >= this.framesTotalCount) {
        this.currentFrame.x = 0;
        this.currentFrame.y = 0;
        this.framesCurrentCount = 1;
      } else {

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

        this.framesCurrentCount += 1;
      }
    }
  }

  updateFrameSize() {
    this.frameSize.width = this.size.width / this.framesTablePosition.x;
    this.frameSize.height = this.size.height / this.framesTablePosition.y;

    this.sizingWidthKoef = (this.object.size.width + additionalSize) / this.frameSize.width;
    this.sizingHeightKoef = (this.object.size.height + additionalSize) / this.frameSize.height;
  }

  public drawObject(object: GameObject): void {
    const canvas = this.object.game.viewManager.canvasManager;

    canvas.context.fillStyle = object.color;
    if (object instanceof Enemy && object.isStatic) canvas.context.fillStyle = "blue";
    canvas.context.fillRect(
      object.body.position.x - (object.size.width + additionalSize) / 2,
      object.body.position.y - (object.size.height + additionalSize) / 2,
      object.size.width + additionalSize,
      object.size.height + additionalSize
    );

    canvas.drawDirection(new Vector(object.body.position.x, object.body.position.y), object.body.angle);
  }
}

export default AnimationFrames;
