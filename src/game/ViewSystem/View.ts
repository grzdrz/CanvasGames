import Vector from "../Helpers/Vector";
import ViewManager from "./ViewManager";
import ViewState from "../Data/ViewState";
import ViewEntry from "./ViewEntry";
import Rectangle from "../Helpers/Rectangle";

abstract class View {
  public viewManager: ViewManager;
  public isPopup: boolean = false;
  public viewState = ViewState.Active;

  public menuEntries = new Array<ViewEntry>();
  public selectedEntry = 0;

  constructor(viewManager: ViewManager) {
    this.viewManager = viewManager;
  }

  public initialize(): void {

  }

  public loadContent(): void { }

  public unloadContent(): void { }

  public update(gameTime: DOMHighResTimeStamp, coveredByOtherScreen: boolean): void {
    if (coveredByOtherScreen) {
      this.viewState = ViewState.Hidden;
    }
    else {
      this.viewState = ViewState.Active;
    }
  }

  public draw(): void { }

  public exitView() {
    this.viewManager.removeView(this);
  }

  public getMenuEntryAt(position: Vector): number {
    let index = 0;
    for (let entry of this.menuEntries) {
      const rect = new Rectangle(
        new Vector((entry.position.x + entry.size.width / 2), (entry.position.y + entry.size.height / 2)),
        new Vector(entry.size.width, entry.size.height)
      );

      if (rect.contains(new Vector(position.x, position.y)))
        return index;

      ++index;
    }
    return -1;
  }
}

export default View;
