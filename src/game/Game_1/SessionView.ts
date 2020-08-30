import View from "../ViewSystem/View";
import ViewManager from "../ViewSystem/ViewManager";
import GameObject from "./GameObjects/GameObject";
import Vector from "../Helpers/Vector";
import Collisions from "./Collisions";
import MathFunctions from "../Helpers/MathFunctions";
import Player from "./GameObjects/Player";
import Enemy from "./GameObjects/Enemy";
import GameState from "../States/GameState";
import EventArgs from "../Events/EventArgs";
import IMouseData from "../Data/IMouseData";
import ViewState from "../Data/ViewState";
import ViewEntry from "../ViewSystem/ViewEntry";
import EntryType from "../States/EntryType";

class SessionView extends View {
  public gameState = GameState.Active;
  public gameObjects = new Array<GameObject>();
  public player: Player;

  public spawnTimeStamp = 0;

  public collisionAnalyzer: Collisions;

  constructor(viewManager: ViewManager) {
    super(viewManager);
    this.collisionAnalyzer = new Collisions(this.viewManager);
    this.player = new Player({
      size: new Vector(40, 40),
      position: new Vector(50, 50),
      color: "green",
      mass: 1,
      restitution: 0.9,
    }, this);
  }

  public initialize() {
    this.gameObjects = new Array<GameObject>();
    this.player = new Player({
      size: new Vector(40, 40),
      position: new Vector(50, 50),
      color: "green",
      mass: 1,
      restitution: 0.9,
    }, this);

    this.gameObjects.push(this.player);

    this.addMenuItem(EntryType.ExitItem, new Vector(50, 50), new Vector(150, 150));
    this.addMenuItem(EntryType.Restart, new Vector(50, 250), new Vector(150, 150));

    this.gameState = GameState.Active;
  }

  public loadContent(): void {
    super.loadContent();
    this.initialize();

    this.collisionAnalyzer.loadContent();

    this.viewManager.onKeyUp.subscribe(this.handleKeyClick);
    this.viewManager.onMouseClick.subscribe(this.handleMouseClick);
    this.viewManager.onMouseDown.subscribe(this.player.handlerSetPosition);
    this.viewManager.onMouseMove.subscribe(this.player.handlerSetPosition);
    this.viewManager.onMouseUp.subscribe(this.player.handlerUnhand);
    this.viewManager.onKeyDown.subscribe(this.player.handlerKeyDown);
    this.viewManager.onKeyUp.subscribe(this.player.handlerKeyUp);
    this.viewManager.onMouseClick.subscribe(this.player.handleClick);
  }

  public unloadContent(): void {
    super.unloadContent();

    this.collisionAnalyzer.unloadContent();

    this.viewManager.onKeyUp.unsubscribe(this.handleKeyClick);
    this.viewManager.onMouseClick.unsubscribe(this.handleMouseClick);
    this.viewManager.onMouseDown.unsubscribe(this.player.handlerSetPosition);
    this.viewManager.onMouseMove.unsubscribe(this.player.handlerSetPosition);
    this.viewManager.onMouseUp.unsubscribe(this.player.handlerUnhand);
    this.viewManager.onKeyDown.unsubscribe(this.player.handlerKeyDown);
    this.viewManager.onKeyUp.unsubscribe(this.player.handlerKeyUp);
    this.viewManager.onMouseClick.unsubscribe(this.player.handleClick);
  }

  public addMenuItem(type: EntryType, position: Vector, size: Vector, view?: View) {
    let src = "";
    if (type === EntryType.ExitItem) {
      src = `./src/game/Images/Interface/buttonBack.png`;
    } else if (type === EntryType.Restart) {
      src = `./src/game/Images/Interface/buttonRestart.png`;
    }

    let entry = new ViewEntry(this, type, src, view);
    entry.position = position;
    entry.size = size;
    this.menuEntries.push(entry);
  }

  public update(gameTime: DOMHighResTimeStamp): void {
    if (this.gameState === GameState.Lose || this.gameState === GameState.Win || this.gameState === GameState.Pause) {
      return;
    }

    this.spawnTimeStamp += gameTime;
    if (this.spawnTimeStamp > 0.5) {
      this.spawnTimeStamp = 0;
      this.spawnEnemy();
    }

    this.gameObjects.forEach((obj) => obj.update(gameTime));
    this.collisionAnalyzer.findAllObjectsCollisions(this.gameObjects);

    if (this.player.position.y < 0) this.gameState = GameState.Win;
    if (this.player.HP <= 0) this.gameState = GameState.Lose;
  }

  public draw(): void {
    this.gameObjects.forEach(obj => {
      obj.draw();
    });
    this.player.draw();

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

  public spawnEnemy() {
    const options = {
      position: new Vector(0, 0),
      velocity: new Vector(0, 0),
      mass: 1,
      width: 50,
    };

    const positionX = MathFunctions.randomInteger(0, this.viewManager.canvasManager.width);
    const positionY = options.width / 2;
    options.position = new Vector(positionX, positionY);

    const velocityX = MathFunctions.randomInteger(-20, 20) / 1;
    const velocityY = MathFunctions.randomInteger(-20, 20) / 1;
    options.velocity = new Vector(velocityX, velocityY);

    this.gameObjects.push(new Enemy(options, this));
  }

  public handleKeyClick = (args: EventArgs<IKeyData>) => {
    if (this.viewState === ViewState.Hidden) return;
    if (args.data.key === "Escape") {
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