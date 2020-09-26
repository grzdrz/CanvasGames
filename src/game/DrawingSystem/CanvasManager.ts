import Vector from "../Helpers/Vector";
import ViewManager from "../ViewSystem/ViewManager";
import GameObject from "../Game_1/GameObjects/GameObject";
import EventArgs from "../Events/EventArgs";
import IMouseData from "../Data/IMouseData";
import Enemy from "../Game_1/GameObjects/Enemy";
import IDrawableImage from "./IDrawableImage";
import IDrawablePolygon from "./IDrawablePolygon";
import IDrawableSquare from "./IDrawableSquare";

interface IMouseEventArgs {
  handlerMouseMove: (event: UIEvent) => void,
  handlerMouseUp: (event: UIEvent) => void,
  button: number,
}

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

    this.setDragAndDropHandlers();
  }

  public drawObject(object: GameObject): void {
    this.context.fillStyle = object.color;
    if (object instanceof Enemy && object.isStatic) this.context.fillStyle = "blue";
    // this.context.fillRect(object.position.x, object.position.y, object.width, object.height);
    this.context.beginPath();
    this.context.arc(object.position.x, object.position.y, object.size.width / 2, 0, 2 * Math.PI);
    this.context.fill();

    //////TEST of velocity vector
    this.context.beginPath();       // Начинает новый путь
    this.context.moveTo(object.position.x, object.position.y);    // Рередвигает перо в точку (30, 50)
    let test = new Vector(50, 0);
    test.rotateVector(object.angle);
    const vectorTo = object.position.sum(test);
    this.context.lineTo(vectorTo.x, vectorTo.y);  // Рисует линию до точки (150, 100)
    this.context.stroke();          // Отображает путь
  }

  public drawSquareObject(object: IDrawableSquare): void {
    this.context.fillStyle = object.color;
    this.context.fillRect(object.position.x - object.size.width / 2, object.position.y - object.size.height / 2, object.size.width, object.size.height);
    /* this.context.beginPath();
    this.context.arc(object.position.x, object.position.y, object.size.width / 2, 0, 2 * Math.PI);
    this.context.fill(); */

    //////TEST of velocity vector
    this.context.beginPath();       // Начинает новый путь
    this.context.moveTo(object.position.x, object.position.y);    // Рередвигает перо в точку (30, 50)
    let test = new Vector(50, 0);
    test.rotateVector(object.angle);
    const vectorTo = object.position.sum(test);
    this.context.lineTo(vectorTo.x, vectorTo.y);  // Рисует линию до точки (150, 100)
    this.context.stroke();          // Отображает путь
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

  public drawPause() {
    this.context.fillStyle = "rgba(200, 200, 200, 0.5)";
    this.context.fillRect(0, 0, this.width / 4.5, this.height);
  }

  public drawHP(HP: number) {
    this.context.fillStyle = "black";
    this.context.font = "30px san-serif";
    this.context.fillText(`HP: ${HP}`, 60, 60);
  }

  public drawSquare(position: Vector, size: Vector, color: string) {
    this.context.fillStyle = color;
    this.context.fillRect(position.x, position.y, size.width, size.height);
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
      this.drawSquare(object.position, object.size, "rgb(12, 123, 222)");
    }
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

  public clear(): void {
    this.context.fillStyle = "gray";
    this.context.fillRect(0, 0, this.width, this.height);
  }

  private setDragAndDropHandlers(): void {
    this.canvas.ondragstart = () => false;
    this.canvas.addEventListener("mousedown", this.handlerMouseDown.bind(this));
    this.canvas.addEventListener("touchstart", this.handlerMouseDown.bind(this));

    window.addEventListener("keydown", this.handlerKeyDown);
    window.addEventListener("keyup", this.handlerKeyUp);

    this.canvas.addEventListener("click", this.handleMouseClick);
    this.canvas.addEventListener("touchstart", this.handleMouseClick);
  }

  // d&d
  private handlerMouseDown(event: UIEvent): void {
    event.preventDefault();
    /* if ((<MouseEvent>event).button !== 2) return; */

    const optionsForMouseEvents = {
      handlerMouseMove: (_event: UIEvent): void => { },
      handlerMouseUp: (_event: UIEvent): void => { },
      button: (<MouseEvent>event).button,
    };
    const handlerMouseMove = this.handlerMouseMove.bind(this, optionsForMouseEvents);
    optionsForMouseEvents.handlerMouseMove = handlerMouseMove;

    const handlerMouseUp = this.handlerMouseUp.bind(this, optionsForMouseEvents);
    optionsForMouseEvents.handlerMouseUp = handlerMouseUp;// чтобы обработчик mouseMove можно было отписать

    document.addEventListener("mousemove", handlerMouseMove);
    document.addEventListener("mouseup", handlerMouseUp);
    document.addEventListener("touchmove", handlerMouseMove);
    document.addEventListener("touchend", handlerMouseUp);

    const mousePosition = this.calculateMouseGlobalPosition(event);
    this.viewManager.onMouseMove.invoke(new EventArgs<IMouseData>({
      mousePosition,
      button: (<MouseEvent>event).button,
    }));
  }

  private handlerMouseMove(optionsFromMouseDown: IMouseEventArgs, event: UIEvent): void {
    const mousePosition = this.calculateMouseGlobalPosition(event);
    this.viewManager.onMouseMove.invoke(new EventArgs<IMouseData>({
      mousePosition,
      button: optionsFromMouseDown.button,
    }));
  }

  private handlerMouseUp(optionsFromMouseDown: IMouseEventArgs, event: UIEvent): void {
    document.removeEventListener("mousemove", optionsFromMouseDown.handlerMouseMove);
    document.removeEventListener("mouseup", optionsFromMouseDown.handlerMouseUp);
    document.removeEventListener("touchmove", optionsFromMouseDown.handlerMouseMove);
    document.removeEventListener("touchend", optionsFromMouseDown.handlerMouseUp);

    const mousePosition = this.calculateMouseGlobalPosition(event);
    this.viewManager.onMouseUp.invoke(new EventArgs<IMouseData>({
      mousePosition,
      button: optionsFromMouseDown.button,
    }));
  }

  private calculateMouseGlobalPosition = (event: UIEvent) => {
    let x;
    let y;
    if (event instanceof TouchEvent) {
      const touchEvent = /* <TouchEvent> */event;
      x = touchEvent.changedTouches[0].pageX;
      y = touchEvent.changedTouches[0].pageY;
    } else {
      const mouseEvent = <MouseEvent>event;
      x = mouseEvent.clientX;
      y = mouseEvent.clientY;
    }

    return new Vector(x, y);
  };

  private handlerKeyDown = (event: KeyboardEvent) => {
    this.viewManager.onKeyDown.invoke(new EventArgs<IKeyData>({ key: event.code }));
  }

  private handlerKeyUp = (event: KeyboardEvent) => {
    this.viewManager.onKeyUp.invoke(new EventArgs<IKeyData>({ key: event.code }));
  }

  private handleMouseClick = (event: UIEvent) => {
    if ((<MouseEvent>event).button !== 0 && !(<TouchEvent>event)) return;
    const mousePosition = this.calculateMouseGlobalPosition(event);
    this.viewManager.onMouseClick.invoke(new EventArgs<IMouseData>({
      mousePosition,
      button: (<MouseEvent>event).button,
    }));
  }
}

export default CanvasManager;