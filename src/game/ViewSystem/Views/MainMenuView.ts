import View from "./View";
import ViewManager from "../ViewManager";
import MainMenuEntry from "./MainMenuEntry";
import Vector from "../../Helpers/Vector";
import Rectangle from "./Rectangle";
import EntryType from "./EntryType";
import EventArgs from "../../Events/EventArgs";
import IMouseData from "../../Data/IMouseData";
import ViewState from "../../Data/ViewState";

class MainMenuView extends View {
  private menuEntries = new Array<MainMenuEntry>();
  public selectedEntry = -1;

  constructor(viewManager: ViewManager) {
    super(viewManager);

    this.initialize();
  }

  public initialize() {
  }

  public update(gameTime: DOMHighResTimeStamp, coveredByOtherScreen: boolean): void {
    super.update(gameTime, coveredByOtherScreen);

    for (let i = 0; i < this.menuEntries.length; ++i) {
      const isSelected = i == this.selectedEntry;
      this.menuEntries[i].update(isSelected, gameTime);
    }
  }

  public draw(): void {
    for (let i = 0; i < this.menuEntries.length; ++i) {
      this.menuEntries[i].draw();
    }
  }

  public unloadContent(): void {
    super.unloadContent();

    this.viewManager.onMouseClick.unsubscribe(this.handleClick);
  }

  public addMenuItem(type: EntryType, view: View): void {
    const entry = new MainMenuEntry(this, type, view);
    this.menuEntries.push(entry);
  }

  public loadContent(): void {
    super.loadContent();

    this.viewManager.onMouseClick.subscribe(this.handleClick);
    for (let i = 0; i < this.menuEntries.length; ++i) {
      this.menuEntries[i].initialize();
    }
  }

  private getMenuEntryAt(position: Vector): number {
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

  public handleClick = (eventArgs: EventArgs<IMouseData>) => {
    if (this.viewState === ViewState.Hidden) return;
    const hoverIndex = this.getMenuEntryAt(eventArgs.data.mousePosition);
    if (hoverIndex > -1 && this.menuEntries[hoverIndex].isSelectable())
      this.selectedEntry = hoverIndex;
    else
      this.selectedEntry = -1;

    if (this.selectedEntry != -1) {
      /* if (this.menuEntries[this.selectedEntry].isExitItem())
        this.viewManager.game.exit();
      else  */
      if (this.menuEntries[this.selectedEntry].view !== undefined) {
        this.viewManager.addView(this.menuEntries[this.selectedEntry].view);
      }
    }
  }
}
export default MainMenuView;