import ViewData from "../Data/ViewData";
import IViewData from "../Data/IViewData";
import Event from "../Events/Event";
import ModelData from "../Data/ModelData";
import View from "./Views/View";
import CanvasManager from "../DrawingSystem/CanvasManager";
import ViewState from "../Data/ViewState";
import GameComponent from "./GameComponent";
import IModelData from "../Data/IModelData";
import IMouseData from "../Data/IMouseData";
import EventArgs from "../Events/EventArgs";

class ViewManager extends GameComponent {
  public canvasManager: CanvasManager;

  public viewData: ViewData;

  public views: View[] = new Array<View>();
  public viewsToUpdate: View[] = new Array<View>();


  public isGameActive: boolean;
  public isInitialized: boolean = false;

  // public assets

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

    this.setData(this.viewData);
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
}

export default ViewManager;
