import ViewManager from "../ViewSystem/ViewManager";
import SessionView from "../ViewSystem/SessionView";
import GameModel from './Model/GameModel';

class Game extends SessionView {
  public model: GameModel = new GameModel(this);

  constructor(viewManager: ViewManager) {
    super(viewManager);
  }

  public initialize() {
    super.initialize();
  }

  public loadContent(): void {
    super.loadContent();
    this.model = new GameModel(this);
    this.model.loadContent();

    this.viewManager.onMouseDown.subscribe(this.model.player.handleShot);
    this.viewManager.onMouseMove.subscribe(this.model.player.handleShot);

    this.viewManager.onMouseDown.subscribe(this.model.player.handlerSetPosition);
    this.viewManager.onMouseMove.subscribe(this.model.player.handlerSetPosition);
    this.viewManager.onMouseUp.subscribe(this.model.player.handlerUnhand);

    this.viewManager.onKeyDown.subscribe(this.model.player.handlerKeyDown);
    this.viewManager.onKeyUp.subscribe(this.model.player.handlerKeyUp);

    this.viewManager.onKeyUp.subscribe(this.model.player.handleChangeAmmo);
  }

  public unloadContent(): void {
    super.unloadContent();

    this.viewManager.onMouseDown.unsubscribe(this.model.player.handleShot);
    this.viewManager.onMouseMove.unsubscribe(this.model.player.handleShot);

    this.viewManager.onMouseDown.unsubscribe(this.model.player.handlerSetPosition);
    this.viewManager.onMouseMove.unsubscribe(this.model.player.handlerSetPosition);
    this.viewManager.onMouseUp.unsubscribe(this.model.player.handlerUnhand);

    this.viewManager.onKeyDown.unsubscribe(this.model.player.handlerKeyDown);
    this.viewManager.onKeyUp.unsubscribe(this.model.player.handlerKeyUp);

    this.viewManager.onKeyUp.unsubscribe(this.model.player.handleChangeAmmo);

    this.model.unloadContent();
    // this.model = undefined;
  }

  public update(gameTime: DOMHighResTimeStamp): void {
    super.update(gameTime);

    this.model.update(gameTime);
  }

  public draw(): void {
    this.model.gameObjects.forEach(object => object.draw());
    this.model.player.draw();

    this.viewManager.canvasManager.drawHP(this.model.player.HP);
    this.viewManager.canvasManager.drawAmmoType(this.model.player.activeAmmunition);

    super.draw();
  }
}

export default Game;