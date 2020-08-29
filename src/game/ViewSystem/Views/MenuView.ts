import View from "./View";
import Vector from "../../Helpers/Vector";
import MenuEntry from "./MenuEntry";
import Rectangle from "./Rectangle";
import EventArgs from "../../Events/EventArgs";
import IMouseData from "../../Data/IMouseData";
import EntryType from "./EntryType";
import ViewState from "../../Data/ViewState";
import ViewManager from "../ViewManager";

class MenuView extends View {
  private NumEntries = 15;
  private menuEntries = new Array<MenuEntry>();
  private menuTitle = "";
  private titlePosition = Vector.zero;
  private titleOrigin = Vector.zero;
  private selectedEntry = 0;
  private menuBorderTop = 0;
  private menuBorderBottom = 0;
  private menuBorderMargin = 0;
  private menuOffset = 0;
  private maxOffset = 0;

  public playerGamesInfo = "";

  constructor(viewManager: ViewManager, menuTitle: string) {
    super(viewManager);
    this.menuTitle = menuTitle;

    const exitButton = new MenuEntry(this, EntryType.ExitItem);
  }

  public addMenuItem(type: EntryType, view: View) {
    const entry = new MenuEntry(this, type, view);
    this.menuEntries.push(entry);
  }

  public loadContent() {
    super.loadContent();
    this.viewManager.onKeyUp.subscribe(this.handleKeyClick);

    this.viewManager.onMouseClick.subscribe(this.handleClick);

    for (let i = 0; i < this.menuEntries.length; ++i) {
      this.menuEntries[i].initialize();
    }

    this.menuBorderMargin = 10;///
    this.menuBorderTop = 10;
    this.menuBorderBottom = 10;

    this.menuOffset = 0;
    this.maxOffset = 0;
  }

  public unloadContent(): void {
    super.unloadContent();
    this.viewManager.onKeyUp.unsubscribe(this.handleKeyClick);
    this.viewManager.onMouseClick.unsubscribe(this.handleClick);
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

  protected updateMenuEntryLocations() {
    let position = Vector.zero;
    let height = this.viewManager.canvasManager.height;
    let width = this.viewManager.canvasManager.width;
    let borderWidthHeight = 30 + ((width) / 10) / 2;
    position.x = borderWidthHeight;
    position.y = this.menuBorderTop - this.menuOffset;/////////////////

    for (let i = 0; i < this.menuEntries.length; ++i) {
      if (this.menuEntries[i].type === EntryType.ExitItem) {
        position.x = width - 100 - this.menuEntries[i].size.width;
        position.y = height - 100 - this.menuEntries[i].size.height / 2;
        this.menuEntries[i].position = position;
      } else {
        if (position.x >= width - borderWidthHeight) {
          position.x = borderWidthHeight;
          position.y += (this.menuEntries[i].size.height + 50);
          position.x += (this.menuEntries[i].size.width + 50);
        } else {
          position.x += (this.menuEntries[i].size.width + 50);
        }

        this.menuEntries[i].position.x = position.x;
        this.menuEntries[i].position.y = position.y;
      }
    }
  }

  public update(gameTime: DOMHighResTimeStamp, coveredByOtherScreen: boolean): void {
    super.update(gameTime, coveredByOtherScreen);

    for (let i = 0; i < this.menuEntries.length; ++i) {
      const isSelected = /* IsActive && */ (i == this.selectedEntry);
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

export default MenuView;
