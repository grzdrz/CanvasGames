import Vector from "../Helpers/Vector";
import ViewManager from "../ViewSystem/ViewManager";
import GameObject from "../GameSystem/GameObjects/GameObject";
import EventArgs from "../Events/EventArgs";
import IMouseData from "../Data/IMouseData";
import Enemy from "../GameSystem/GameObjects/Enemy";

interface IMouseEventArgs {
  handlerMouseMove: (event: UIEvent) => void,
  handlerMouseUp: (event: UIEvent) => void,
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
    /* this.context.canvas.clientWidth 
    this.context.canvas.clientHeight */

    this.setDragAndDropHandlers();
  }

  public drawObject(object: GameObject): void {
    this.context.fillStyle = object.color;
    if (object instanceof Enemy && object.isStatic) this.context.fillStyle = "blue";
    // this.context.fillRect(object.position.x, object.position.y, object.width, object.height);
    this.context.beginPath();
    this.context.arc(object.position.x, object.position.y, object.width / 2, 0, 2 * Math.PI);
    this.context.fill();

    //////TEST of velocity vector
    this.context.beginPath();       // Начинает новый путь
    this.context.moveTo(object.position.x, object.position.y);    // Рередвигает перо в точку (30, 50)
    const test = new Vector(50, 0).rotateVector(object.radians);
    const vectorTo = object.position.sum(test);
    this.context.lineTo(vectorTo.x, vectorTo.y);  // Рисует линию до точки (150, 100)
    this.context.stroke();          // Отображает путь
  }

  public drawEndGame() {
    this.context.fillStyle = "rgb(37, 53, 73)";
    const windowWidth = 500;
    const windowHeight = 300;
    this.context.fillRect(this.width / 2 - windowWidth / 2, this.height / 2 - windowHeight / 2, windowWidth, windowHeight);

    this.context.fillStyle = "white";
    this.context.font = "30px san-serif";
    this.context.fillText("Game end", this.width / 2 - 60, this.height / 2);
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
  }

  // d&d
  private handlerMouseDown(event: UIEvent): void {
    event.preventDefault();
    if ((<MouseEvent>event).button !== 2) return;

    const optionsForMouseEvents = {
      handlerMouseMove: (_event: UIEvent): void => { },
      handlerMouseUp: (_event: UIEvent): void => { },
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
    this.viewManager.onMouseMove.invoke(new EventArgs<IMouseData>({ mousePosition }));
  }

  private handlerMouseMove(optionsFromMouseDown: IMouseEventArgs, event: UIEvent): void {
    const mousePosition = this.calculateMouseGlobalPosition(event);
    this.viewManager.onMouseMove.invoke(new EventArgs<IMouseData>({ mousePosition }));
  }

  private handlerMouseUp(optionsFromMouseDown: IMouseEventArgs, event: UIEvent): void {
    document.removeEventListener("mousemove", optionsFromMouseDown.handlerMouseMove);
    document.removeEventListener("mouseup", optionsFromMouseDown.handlerMouseUp);
    document.removeEventListener("touchmove", optionsFromMouseDown.handlerMouseMove);
    document.removeEventListener("touchend", optionsFromMouseDown.handlerMouseUp);

    const mousePosition = this.calculateMouseGlobalPosition(event);
    this.viewManager.onMouseUp.invoke(new EventArgs<IMouseData>({ mousePosition }));
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
    // y = (document.documentElement.clientHeight + window.pageYOffset) - y;

    return new Vector(x, y);
  };

  private handlerKeyDown = (event: KeyboardEvent) => {
    /* event.preventDefault(); */

    this.viewManager.onKeyDown.invoke(new EventArgs<IKeyData>({ key: event.code }));
  }

  private handlerKeyUp = (event: KeyboardEvent) => {
    /* event.preventDefault(); */

    this.viewManager.onKeyUp.invoke(new EventArgs<IKeyData>({ key: event.code }));
  }

  private handleMouseClick = (event: UIEvent) => {
    if ((<MouseEvent>event).button !== 0) return;
    const mousePosition = this.calculateMouseGlobalPosition(event);
    this.viewManager.onMouseClick.invoke(new EventArgs<IMouseData>({ mousePosition }));
  }
}

export default CanvasManager;