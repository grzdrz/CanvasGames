import Model from "./Model/Model";
import ViewManager from "./ViewSystem/ViewManager";
import EventArgs from "./Events/EventArgs";
import GameComponent from "./ViewSystem/GameComponent";
import ModelData from "./Data/ModelData";
import ViewData from "./Data/ViewData";
import IModelData from "./Data/IModelData";
import IViewData from "./Data/IViewData";
import MainMenuView from "./ViewSystem/MainMenuView";
import EntryType from "./States/EntryType";
import LvlsListView from "./ViewSystem/LvlsListView";

import Game from "./Game/Game";
import Game_Beta_1 from "./Game_Beta_1/Game_Beta_1";
import Game_Beta_2 from "./Game_Beta_2/Game_Beta_2";

import "./Styles/Game.scss";



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
    document.addEventListener("contextmenu", this.hanldeContextmenu);

    this.viewManager.onSetModelData.subscribe(this.handlerSetModelData);
    this.viewManager.onSetViewData.subscribe(this.handlerSetViewData);
    this.model.onSetViewData.subscribe(this.handlerSetViewData);

    this.model.initialize();
    this.viewManager.initialize();

    const mainMenuView = new MainMenuView(this.viewManager);
    const lvlsListView = new LvlsListView(this.viewManager);
    const game = new Game(this.viewManager);
    const game_beta_1 = new Game_Beta_1(this.viewManager);
    const game_beta_2 = new Game_Beta_2(this.viewManager);

    lvlsListView.addMenuItem(EntryType.Screen, game);
    lvlsListView.addMenuItem(EntryType.Screen, game_beta_1);
    lvlsListView.addMenuItem(EntryType.Screen, game_beta_2);

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

  private hanldeContextmenu = (event: UIEvent) => {
    event.preventDefault();
  }
}

export default Presenter;
