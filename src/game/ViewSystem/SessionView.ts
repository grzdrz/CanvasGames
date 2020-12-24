import EntryType from '../States/EntryType';
import GameState from '../States/GameState';
import IMouseData from '../Data/IMouseData';
import ViewState from '../Data/ViewState';
import Vector from '../Helpers/Vector';
import EventArgs from '../Events/EventArgs';
import ViewManager from './ViewManager';
import ViewEntry from './ViewEntry';
import View from './View';

class SessionView extends View {
  public gameState = GameState.Active;

  constructor(viewManager: ViewManager) {
    super(viewManager);
  }

  public initialize() { }

  public loadContent(): void {
    this.viewManager.onKeyUp.subscribe(this.handleKeyClick);
    this.viewManager.onMouseClick.subscribe(this.handleMouseClick);

    this.addMenuItem(EntryType.ExitItem);
    this.addMenuItem(EntryType.Restart);

    this.gameState = GameState.Active;
  }

  public unloadContent(): void {
    this.viewManager.onKeyUp.unsubscribe(this.handleKeyClick);
    this.viewManager.onMouseClick.unsubscribe(this.handleMouseClick);

    this.removeMenuItems();
  }

  public update(gameTime: DOMHighResTimeStamp): void {
    super.update(gameTime, false);
  }

  public draw(): void {
    super.draw();

    if (this.gameState === GameState.Lose) {
      this.viewManager.canvasManager.drawEndGame(false);
      this.viewManager.canvasManager.drawPause();
    } else if (this.gameState === GameState.Win) {
      this.viewManager.canvasManager.drawEndGame(true);
      this.viewManager.canvasManager.drawPause();
    } else if (this.gameState === GameState.Pause) {
      this.viewManager.canvasManager.drawPause();
    }
    if (this.gameState === GameState.Lose || this.gameState === GameState.Win || this.gameState === GameState.Pause) {
      for (let i = 0; i < this.menuEntries.length; ++i) {
        this.menuEntries[i].draw();
      }
    }
  }

  public addMenuItem(type: EntryType, view?: View) {
    const height = this.viewManager.canvasManager.height;
    const width = this.viewManager.canvasManager.width;

    let src = '';
    let size = Vector.zero;
    let position = Vector.zero;
    if (type === EntryType.ExitItem) {
      src = `./src/game/Images/Interface/buttonBack.png`;
      position.x = Math.min(Math.min(width, height) / 10, 150) / 2;
      position.y = Math.min(Math.max(width, height) / 10, 150) * 0.3;
    } else if (type === EntryType.Restart) {
      src = `./src/game/Images/Interface/buttonRestart.png`;
      position.x = Math.min(Math.min(width, height) / 10, 150) / 2;
      position.y = Math.min(Math.max(width, height) / 10, 150) * 1.5;
    }

    size.width = Math.min(Math.max(width, height) / 10, 150);
    size.height = Math.min(Math.max(width, height) / 10, 150);

    let entry = new ViewEntry(this, type, src, size, view);
    entry.position = position;
    entry.size = size;
    this.menuEntries.push(entry);
  }

  public removeMenuItems() {
    this.menuEntries = new Array<ViewEntry>();
  }

  public handleKeyClick = (args: EventArgs<IKeyData>) => {
    if (this.viewState === ViewState.Hidden) return;
    if (args.data.key === 'Escape') {
      switch (this.gameState) {
        case GameState.Win: {
          this.viewManager.removeView(this);
          break;
        }
        case GameState.Lose: {
          this.viewManager.removeView(this);
          break;
        }
        case GameState.Pause: {
          this.gameState = GameState.Active;
          break;
        }
        case GameState.Active: {
          this.gameState = GameState.Pause;
          break;
        }
      }
    }
  }

  public handleMouseClick = (eventArgs: EventArgs<IMouseData>) => {
    if (this.viewState === ViewState.Hidden) return;
    if (this.gameState === GameState.Pause || this.gameState === GameState.Win || this.gameState === GameState.Lose) {
      const hoverIndex = this.getMenuEntryAt(eventArgs.data.mousePosition);
      if (hoverIndex > -1 && this.menuEntries[hoverIndex].isSelectable())
        this.selectedEntry = hoverIndex;
      else
        this.selectedEntry = -1;

      if (this.selectedEntry != -1) {
        if (this.menuEntries[this.selectedEntry].isExitItem()) {
          this.exitView();
        } else if (this.menuEntries[this.selectedEntry].type === EntryType.Restart) {
          this.unloadContent();
          this.loadContent();
        }
      }
    }
  }
}

export default SessionView;

