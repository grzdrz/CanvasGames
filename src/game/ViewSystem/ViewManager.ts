import ViewData from "../Data/ViewData";
import IViewData from "../Data/IViewData";
import Event from "../Events/Event";
import ModelData from "../Data/ModelData";
import View from "./View";
import CanvasManager from "../DrawingSystem/CanvasManager";
import ViewState from "../Data/ViewState";
import GameComponent from "./GameComponent";
import IModelData from "../Data/IModelData";
import IMouseData from "../Data/IMouseData";
import EventArgs from "../Events/EventArgs";
import Vector from "../Helpers/Vector";

interface IMouseEventArgs {
  handlerMouseMove: (event: UIEvent) => void,
  handlerMouseUp: (event: UIEvent) => void,
  button: number,
}

class ViewManager extends GameComponent {
  public canvasManager: CanvasManager;

  public viewData: ViewData;

  public views: View[] = new Array<View>();
  public viewsToUpdate: View[] = new Array<View>();


  public isGameActive: boolean;
  public isInitialized: boolean = false;

  public onSetViewData = new Event<IViewData>();
  public onSetModelData = new Event<IModelData>();
  public onGetModelData = new Event<IModelData>();
  public onHandleMove = new Event<IModelData>();
  public onInputsChange = new Event<IModelData>();
  public onMouseDown = new Event<IMouseData>();
  public onMouseMove = new Event<IMouseData>();
  public onMouseUp = new Event<IMouseData>();
  public onKeyDown = new Event<IKeyData>();
  public onKeyUp = new Event<IKeyData>();
  public onMouseClick = new Event<IMouseData>();

  constructor(viewData: ViewData, canvas: HTMLElement) {
    super();
    this.viewData = viewData;
    const viewportWidth = this.canvasManager = new CanvasManager(
      this,
      canvas,
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    );

    this.isGameActive = true;

    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
  }

  public initialize(): void {
    this.isInitialized = true;

    this.setDragAndDropHandlers();
    this.setData(this.viewData);
  }

  public setDragAndDropHandlers(): void {
    this.canvasManager.canvas.ondragstart = () => false;
    this.canvasManager.canvas.addEventListener("mousedown", this.handlerMouseDown.bind(this));
    this.canvasManager.canvas.addEventListener("touchstart", this.handlerMouseDown.bind(this));

    window.addEventListener("keydown", this.handlerKeyDown);
    window.addEventListener("keyup", this.handlerKeyUp);

    this.canvasManager.canvas.addEventListener("click", this.handleMouseClick);
    this.canvasManager.canvas.addEventListener("touchstart", this.handleMouseClick);
  }

  public loadContent(): void {
    for (let view of this.views) {
      view.loadContent();
    }
  }

  public unloadContent(): void {
    for (let view of this.views) {
      view.unloadContent();
    }
  }

  public update(gameTime: DOMHighResTimeStamp): void {
    this.viewsToUpdate = [];

    for (let view of this.views) {
      this.viewsToUpdate.push(view);
    }

    let coveredByOtherScreen = false;

    while (this.viewsToUpdate.length > 0) {
      let view = this.viewsToUpdate[this.viewsToUpdate.length - 1];

      this.viewsToUpdate.pop();

      // Update the screen.
      view.update(gameTime, coveredByOtherScreen);

      if (view.viewState === ViewState.Active) {
        if (!view.isPopup)
          coveredByOtherScreen = true;
      }
    }
  }

  public draw(): void {
    this.canvasManager.clear();

    for (let view of this.views) {
      if (view.viewState === ViewState.Hidden)
        continue;

      view.draw();
    }
    //input.draw();
  }

  public addView(view: View): void {
    view.viewManager = this;

    if (this.isInitialized)
      view.loadContent();

    this.views.push(view);

    this.views.forEach((view) => view.viewState = ViewState.Hidden);
    this.views[this.views.length - 1].viewState = ViewState.Active;
  }

  public removeView(view: View): void {
    if (this.isInitialized)
      view.unloadContent();

    let index = this.views.indexOf(view);
    if (index > -1) {
      this.views.splice(index, 1);
    }

    index = this.viewsToUpdate.indexOf(view);
    if (index > -1) {
      this.viewsToUpdate.splice(index, 1);
    }
  }

  public setData(data: IViewData): void {
    /* if (data.sliderStripThickness !== undefined) this.viewData.sliderStripThickness = data.sliderStripThickness; */
  }

  public getModelData(): ModelData {
    const optionsEventArgs = new EventArgs<IModelData>({});
    this.onGetModelData.invoke(optionsEventArgs);
    return <ModelData>optionsEventArgs.data;
  }

  public getData(args: EventArgs<IViewData>): void {
    args.data = new ViewData(this.viewData);
  }

  private calculateMouseGlobalPosition = (event: UIEvent) => {
    let x;
    let y;
    if (event instanceof TouchEvent) {
      const touchEvent = event;
      x = touchEvent.changedTouches[0].pageX;
      y = touchEvent.changedTouches[0].pageY;
    } else {
      const mouseEvent = <MouseEvent>event;
      x = mouseEvent.clientX;
      y = mouseEvent.clientY;
    }

    return new Vector(x, y);
  };

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
    this.onMouseMove.invoke(new EventArgs<IMouseData>({
      mousePosition,
      button: (<MouseEvent>event).button,
    }));
  }

  private handlerMouseMove(optionsFromMouseDown: IMouseEventArgs, event: UIEvent): void {
    const mousePosition = this.calculateMouseGlobalPosition(event);
    this.onMouseMove.invoke(new EventArgs<IMouseData>({
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
    this.onMouseUp.invoke(new EventArgs<IMouseData>({
      mousePosition,
      button: optionsFromMouseDown.button,
    }));
  }

  private handlerKeyDown = (event: KeyboardEvent) => {
    this.onKeyDown.invoke(new EventArgs<IKeyData>({ key: event.code }));
  }

  private handlerKeyUp = (event: KeyboardEvent) => {
    this.onKeyUp.invoke(new EventArgs<IKeyData>({ key: event.code }));
  }

  private handleMouseClick = (event: UIEvent) => {
    if ((<MouseEvent>event).button !== 0 && !(<TouchEvent>event)) return;
    const mousePosition = this.calculateMouseGlobalPosition(event);
    this.onMouseClick.invoke(new EventArgs<IMouseData>({
      mousePosition,
      button: (<MouseEvent>event).button,
    }));
  }
}

export default ViewManager;
