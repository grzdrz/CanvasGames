import Model from "./Model/Model";
import ViewManager from "./ViewSystem/ViewManager";
import EventArgs from "./Events/EventArgs";
import GameComponent from "./ViewSystem/GameComponent";
import ModelData from "./Data/ModelData";
import ViewData from "./Data/ViewData";
import Game_1 from "./Game_1/Game_1";
import IModelData from "./Data/IModelData";
import IViewData from "./Data/IViewData";
import MainMenuView from "./ViewSystem/MainMenuView";
import EntryType from "./States/EntryType";
import LvlsListView from "./ViewSystem/LvlsListView";

import "./Styles/Game.scss";
import Game_TEST from "./Game_TEST/Game_TEST";

const defaultModelData = {};
const defaultViewData = {};

class Presenter {
  public model: Model;
  public viewManager: ViewManager;
  public gameComponents: GameComponent[] = new Array<GameComponent>();

  constructor() {
    const canvas = <HTMLElement>(document.querySelector(".game"));

    const modelData = new ModelData(defaultModelData);
    const viewData = new ViewData(defaultViewData);

    this.model = new Model(modelData);
    this.viewManager = new ViewManager(viewData, canvas);

    this.gameComponents.push(this.viewManager);

    this.initialize();
  }

  private initialize(): void {
    this.viewManager.onSetModelData.subscribe(this.handlerSetModelData);
    this.viewManager.onSetViewData.subscribe(this.handlerSetViewData);
    this.model.onSetViewData.subscribe(this.handlerSetViewData);

    this.model.initialize();
    this.viewManager.initialize();

    const mainMenuView = new MainMenuView(this.viewManager);
    const lvlsListView = new LvlsListView(this.viewManager);
    const game1 = new Game_1(this.viewManager);
    const gameTEST = new Game_TEST(this.viewManager);

    lvlsListView.addMenuItem(EntryType.Screen, game1);
    lvlsListView.addMenuItem(EntryType.Screen, gameTEST);// тест физики

    // ТЕСТ позиционирования иконок
    for (let i = 0; i < 10; i++) {
      lvlsListView.addMenuItem(EntryType.Screen, new Game_1(this.viewManager));
    }

    mainMenuView.addMenuItem(EntryType.Screen, lvlsListView);
    this.viewManager.addView(mainMenuView);

    this.gameComponents.forEach(component => {
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

    this.gameComponents.forEach(component => {
      component.update(this.secondsPassed);
      component.draw();
    });
    requestAnimationFrame(this.invokeGameCycle);
  }

  private handlerSetModelData = (args: EventArgs<IModelData>) => {
    this.model.update(args.data);
  };

  private handlerSetViewData = (args: EventArgs<IViewData>) => {
    this.viewManager.setData(args.data);
  };

  private handlerGetModelData = (args: EventArgs<IModelData>) => {
    this.model.getData(args);
  }

  private handlerGetViewData = (args: EventArgs<IViewData>) => {
    this.viewManager.getData(args);
  }
}

export default Presenter;
