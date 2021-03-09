import LvlsListView from "./ViewSystem/Views/LvlsListView";
import ViewManager from "./ViewSystem/ViewManager";
import MainMenuView from "./ViewSystem/Views/MainMenuView";
import GameComponent from "./ViewSystem/Base/GameComponent";
import ModelData from "./Data/ModelData";
import ViewData from "./Data/ViewData";
import EntryType from "./States/EntryType";

import Game from "./Games/Game/Game";

import "./Styles/Game.scss";

const defaultModelData = {};
const defaultViewData = {};

class Presenter {
  public viewManager: ViewManager;
  public gameComponents: GameComponent[] = new Array<GameComponent>();

  constructor() {
    const canvas = <HTMLElement>document.querySelector(".game");

    const modelData = new ModelData(defaultModelData);
    const viewData = new ViewData(defaultViewData);

    this.viewManager = new ViewManager(viewData, canvas);

    this.gameComponents.push(this.viewManager);

    this.initialize();
  }

  private initialize(): void {
    document.addEventListener("contextmenu", this.handleContextmenu);

    this.viewManager.initialize();

    const mainMenuView = new MainMenuView(this.viewManager);
    const lvlsListView = new LvlsListView(this.viewManager);
    const game = new Game(this.viewManager);

    lvlsListView.addMenuItem(EntryType.Screen, game);

    mainMenuView.addMenuItem(EntryType.Screen, lvlsListView);
    this.viewManager.addView(mainMenuView);

    this.gameComponents.forEach((component) => {
      component.loadContent();
    });
    this.invokeGameCycle(0);
  }

  secondsPassed = 0;
  oldTimeStamp = 0;
  public invokeGameCycle = (gameTime: DOMHighResTimeStamp) => {
    this.secondsPassed = (gameTime - this.oldTimeStamp) / 1000;
    this.secondsPassed = Math.min(this.secondsPassed, 0.1);
    this.oldTimeStamp = gameTime;

    this.gameComponents.forEach((component) => {
      component.update(this.secondsPassed);
      component.draw();
    });
    requestAnimationFrame(this.invokeGameCycle);
  };

  private handleContextmenu = (event: UIEvent) => {
    event.preventDefault();
  };
}

export default Presenter;
