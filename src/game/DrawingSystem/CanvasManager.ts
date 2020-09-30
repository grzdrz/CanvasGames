import Vector from "../Helpers/Vector";
import ViewManager from "../ViewSystem/ViewManager";
import IDrawableBodyImage from "./IDrawableBodyImage";
import IDrawableImage from "./IDrawableImage";
import IDrawablePolygon from "./IDrawablePolygon";
import IDrawableSimpleShape from "./IDrawableSimpleShape";

class CanvasManager {
  public viewManager: ViewManager;
  public width: number;
  public height: number;

  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;

  constructor(viewManager: ViewManager, element: HTMLElement, width: number, height: number) {
    this.viewManager = viewManager;

    this.canvas = <HTMLCanvasElement>(element);

    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;

    this.context = <CanvasRenderingContext2D>(this.canvas.getContext("2d"));
  }

  public drawCircle(object: IDrawableSimpleShape): void {
    this.context.fillStyle = object.color;
    this.context.beginPath();
    this.context.arc(object.position.x, object.position.y, object.size.width / 2, 0, 2 * Math.PI);
    this.context.fill();

    this.drawDirection(object.position, object.angle);
  }

  public drawSquare(position: Vector, size: Vector, color: string) {
    this.context.fillStyle = color;
    this.context.fillRect(position.x, position.y, size.width, size.height);
  }

  public drawConvexPolygon = (object: IDrawablePolygon) => {
    this.context.fillStyle = object.isStatic ? "blue" : object.isColliding ? "purple" : object.color;
    this.context.beginPath();
    object.vertices.forEach((vertex, index) => {
      if (index === 0) this.context.moveTo(vertex.position.x, vertex.position.y);
      else this.context.lineTo(vertex.position.x, vertex.position.y);
    });
    this.context.closePath();
    this.context.fill();
  }

  public drawPerimeter = (object: IDrawableBodyImage) => {
    const position = new Vector(object.body.position.x, object.body.position.y);
    const size = object.size;

    this.context.beginPath();

    var vertices = object.body.vertices;
    this.context.moveTo(vertices[0].x, vertices[0].y);
    for (var j = 1; j < vertices.length; j += 1) {
      this.context.lineTo(vertices[j].x, vertices[j].y);
    }

    this.context.lineTo(vertices[0].x, vertices[0].y);

    this.context.lineWidth = 1;
    this.context.strokeStyle = object.color;
    this.context.stroke();
  }

  public drawBodyImage(object: IDrawableBodyImage) {
    if (object.isImageLoaded) {
      //точка вращения относительно канваса
      const x = object.body.position.x + object.size.width / 2;
      const y = object.body.position.y + object.size.height / 2;
      //центр объекта относительно самого себя
      const objCenterX = -object.size.width / 2;
      const objCenterY = -object.size.height / 2;
      this.context.setTransform(1, 0, 0, 1, x, y);
      this.context.rotate(object.body.angle);
      this.context.drawImage(object.image, objCenterX, objCenterY, object.size.width, object.size.height);
      this.context.resetTransform();
    } else { // заглушка, до подгрузки изображения
      const position = new Vector(object.body.position.x, object.body.position.y);
      this.drawSquare(position, object.size, "rgb(12, 123, 222)");
    }
  }

  public drawImage(object: IDrawableImage) {
    if (object.isImageLoaded) {
      //точка вращения относительно канваса
      const x = object.position.x + object.size.width / 2;
      const y = object.position.y + object.size.height / 2;
      //центр объекта относительно самого себя
      const objCenterX = -object.size.width / 2;
      const objCenterY = -object.size.height / 2;
      this.context.setTransform(1, 0, 0, 1, x, y);
      this.context.rotate(object.angle);
      this.context.drawImage(object.image, objCenterX, objCenterY, object.size.width, object.size.height);
      this.context.resetTransform();
    } else { // заглушка, до подгрузки изображения
      const position = new Vector(object.position.x, object.position.y);
      this.drawSquare(position, object.size, "rgb(12, 123, 222)");
    }
  }

  public drawDirection(position: Vector, angle: number) {
    this.context.beginPath();
    this.context.moveTo(position.x, position.y);
    let direction = new Vector(50, 0);
    direction.rotateVector(angle);
    const vectorTo = position.sum(direction);
    this.context.lineTo(vectorTo.x, vectorTo.y);
    this.context.stroke();
  }

  public drawHP(HP: number) {
    this.context.fillStyle = "black";
    this.context.font = "30px san-serif";
    this.context.fillText(`HP: ${HP}`, 60, 60);
  }

  public drawPause() {
    this.context.fillStyle = "rgba(200, 200, 200, 0.5)";
    this.context.fillRect(0, 0, this.width / 4.5, this.height);
  }

  public drawEndGame(isWin: boolean) {
    this.context.fillStyle = "rgb(37, 53, 73)";
    const windowWidth = 500;
    const windowHeight = 300;
    this.context.fillRect(this.width / 2 - windowWidth / 2, this.height / 2 - windowHeight / 2, windowWidth, windowHeight);

    this.context.fillStyle = "white";
    this.context.font = "30px san-serif";
    this.context.fillText(`Game ${isWin ? "win" : "lose"}`, this.width / 2 - 60, this.height / 2);
  }

  public clear(): void {
    this.context.fillStyle = "gray";
    this.context.fillRect(0, 0, this.width, this.height);
  }
}

export default CanvasManager;