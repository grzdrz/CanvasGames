import View from "./View";
import Vector from "../Helpers/Vector";
import EventArgs from "../Events/EventArgs";
import IMouseData from "../Data/IMouseData";
import EntryType from "../States/EntryType";
import ViewState from "../Data/ViewState";
import ViewManager from "./ViewManager";
import ViewEntry from "./ViewEntry";
import MathFunctions from "../Helpers/MathFunctions";

class LvlsListView extends View {
  public playerGamesInfo = "";

  constructor(viewManager: ViewManager) {
    super(viewManager);

    this.addMenuItem(EntryType.ExitItem);
  }

  public loadContent() {
    super.loadContent();
    this.viewManager.onKeyUp.subscribe(this.handleKeyClick);

    this.viewManager.onMouseClick.subscribe(this.handleClick);

    for (let i = 0; i < this.menuEntries.length; ++i) {
      this.menuEntries[i].initialize();
    }
  }

  public unloadContent(): void {
    super.unloadContent();
    this.viewManager.onKeyUp.unsubscribe(this.handleKeyClick);
    this.viewManager.onMouseClick.unsubscribe(this.handleClick);
  }

  public addMenuItem(type: EntryType, view?: View) {
    let src = "";
    if (type === EntryType.Screen)
      src = `./src/game/Images/Interface/buttonGameLevel_${MathFunctions.randomInteger(0, 5)}stars.png`;
    else if (type === EntryType.ExitItem)
      src = `./src/game/Images/Interface/buttonBack.png`;

    const entry = new ViewEntry(this, type, src, view);
    this.menuEntries.push(entry);
  }

  public entryPosition = new Vector(0, 0);
  protected updateMenuEntryLocations() {
    let height = this.viewManager.canvasManager.height;
    let width = this.viewManager.canvasManager.width;
    const gameIconSize = 170;
    const menuBorderTop = 50;
    const menuOffset = 50;
    let borderWidthHeight = 40;
    this.entryPosition.x = borderWidthHeight;
    this.entryPosition.y = menuBorderTop;

    for (let i = 0; i < this.menuEntries.length; ++i) {
      if (this.menuEntries[i].type === EntryType.ExitItem) {
        this.menuEntries[i].position.x = width - 50 - this.menuEntries[i].size.width;
        this.menuEntries[i].position.y = height - 50 - this.menuEntries[i].size.height;
        this.menuEntries[i].size.width = 150;
        this.menuEntries[i].size.height = 150;
      } else {
        if (this.entryPosition.x >= width - this.menuEntries[i].size.width - borderWidthHeight) {
          this.entryPosition.x = borderWidthHeight;
          this.entryPosition.y += (this.menuEntries[i].size.height + menuOffset);
          this.menuEntries[i].position.x = this.entryPosition.x;
          this.menuEntries[i].position.y = this.entryPosition.y;
          this.entryPosition.x += (this.menuEntries[i].size.width + menuOffset);
        } else {
          this.menuEntries[i].position.x = this.entryPosition.x;
          this.menuEntries[i].position.y = this.entryPosition.y;
          this.entryPosition.x += (this.menuEntries[i].size.width + menuOffset);
        }
        this.menuEntries[i].size.width = 170;
        this.menuEntries[i].size.height = 170;
      }
    }
  }

  public update(gameTime: DOMHighResTimeStamp, coveredByOtherScreen: boolean): void {
    super.update(gameTime, coveredByOtherScreen);

    for (let i = 0; i < this.menuEntries.length; ++i) {
      const isSelected = (i == this.selectedEntry);
      this.menuEntries[i].update(isSelected, gameTime);
    }
  }

  public draw() {
    this.updateMenuEntryLocations();
    for (let i = 0; i < this.menuEntries.length; ++i) {
      this.menuEntries[i].draw();
    }
  }

  public handleClick = (eventArgs: EventArgs<IMouseData>) => {
    if (this.viewState === ViewState.Hidden) return;
    let hoverIndex = this.getMenuEntryAt(eventArgs.data.mousePosition);
    if (hoverIndex > -1 && this.menuEntries[hoverIndex].isSelectable())
      this.selectedEntry = hoverIndex;
    else
      this.selectedEntry = -1;

    if (this.selectedEntry !== -1) {
      const innerView = this.menuEntries[this.selectedEntry].view;
      if (this.menuEntries[this.selectedEntry].isExitItem()) {
        this.exitView();
      } else if (innerView !== undefined) {
        this.viewManager.addView(innerView);
      }
    }
  }

  public handleKeyClick = (args: EventArgs<IKeyData>) => {
    if (this.viewState === ViewState.Hidden) return;
    if (args.data.key === "Escape") {
      this.viewManager.removeView(this);
    }
  }
}

export default LvlsListView;
