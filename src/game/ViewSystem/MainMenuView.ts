import Vector from '../Helpers/Vector';
import EntryType from '../States/EntryType';
import EventArgs from '../Events/EventArgs';
import IMouseData from '../Data/IMouseData';
import ViewState from '../Data/ViewState';
import ViewEntry from './ViewEntry';
import ViewManager from './ViewManager';
import View from './View';

class MainMenuView extends View {
  constructor(viewManager: ViewManager) {
    super(viewManager);

    this.initialize();
  }

  public initialize() {
  }

  public loadContent(): void {
    super.loadContent();

    this.viewManager.onMouseClick.subscribe(this.handleClick);
    for (let i = 0; i < this.menuEntries.length; ++i) {
      this.menuEntries[i].initialize();
    }
  }

  public unloadContent(): void {
    super.unloadContent();

    this.viewManager.onMouseClick.unsubscribe(this.handleClick);
  }

  public update(gameTime: DOMHighResTimeStamp, coveredByOtherScreen: boolean): void {
    super.update(gameTime, coveredByOtherScreen);

    for (let i = 0; i < this.menuEntries.length; ++i) {
      const isSelected = i == this.selectedEntry;
      this.menuEntries[i].update(isSelected, gameTime);
    }
  }

  public draw(): void {
    this.updateMenuEntryLocations();
    for (let i = 0; i < this.menuEntries.length; ++i) {
      this.menuEntries[i].draw();
    }
  }

  public addMenuItem(type: EntryType, view?: View) {
    let src = '';
    let size = Vector.zero;
    if (type === EntryType.Screen) {
      src = './src/game/Images/Interface/buttonPlay.png';
    } else if (type === EntryType.ExitItem) {
      src = './src/game/Images/Interface/buttonBack.png';
    }

    const height = this.viewManager.canvasManager.height;
    const width = this.viewManager.canvasManager.width;
    size.width = Math.min(Math.max(width, height) / 5, 200);
    size.height = Math.min(Math.max(width, height) / 5, 200);

    let entry = new ViewEntry(this, type, src, size, view);
    this.menuEntries.push(entry);
  }

  protected updateMenuEntryLocations() {
    let position = Vector.zero;
    let height = this.viewManager.canvasManager.height;
    let width = this.viewManager.canvasManager.width;

    for (let i = 0; i < this.menuEntries.length; ++i) {
      if (this.menuEntries[i].type === EntryType.ExitItem) {
        this.menuEntries[i].size.x = 100;
        this.menuEntries[i].size.y = 100;
        position.x = width - 100 - this.menuEntries[i].size.width;
        position.y = height - 100 - this.menuEntries[i].size.height / 2;
        this.menuEntries[i].position = position;
      } else {
        position.x = width / 2 - this.menuEntries[i].size.width / 2;
        position.y = height / 2 - this.menuEntries[i].size.height / 2;
      }

      this.menuEntries[i].position.x = position.x;
      this.menuEntries[i].position.y = position.y;
    }
  }

  public handleClick = (eventArgs: EventArgs<IMouseData>) => {
    if (this.viewState === ViewState.Hidden) return;
    const hoverIndex = this.getMenuEntryAt(eventArgs.data.mousePosition);
    if (hoverIndex > -1 && this.menuEntries[hoverIndex].isSelectable())
      this.selectedEntry = hoverIndex;
    else
      this.selectedEntry = -1;

    if (this.selectedEntry != -1) {
      const innerView = this.menuEntries[this.selectedEntry].view;
      if (innerView !== undefined) {
        this.viewManager.addView(innerView);
      }
    }
  }
}

export default MainMenuView;