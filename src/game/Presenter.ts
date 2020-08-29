import Model from "./Model/Model";

import ViewManager from "./ViewSystem/ViewManager";

import EventArgs from "./Events/EventArgs";
import GameComponent from "./ViewSystem/GameComponent";
import ModelData from "./Data/ModelData";
import ViewData from "./Data/ViewData";
import SessionView from "./ViewSystem/Views/SessionView";
import IModelData from "./Data/IModelData";
import IViewData from "./Data/IViewData";

import "./Styles/Game.scss";
import MainMenuView from "./ViewSystem/Views/MainMenuView";
import EntryType from "./ViewSystem/Views/EntryType";
import MenuView from "./ViewSystem/Views/MenuView";
import MenuEntry from "./ViewSystem/Views/MenuEntry";

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
    const menuView = new MenuView(this.viewManager, "some text");
    const sessioonView = new SessionView(this.viewManager);
    const sessioonView2 = new SessionView(this.viewManager);
    const sessioonView3 = new SessionView(this.viewManager);
    const sessioonView4 = new SessionView(this.viewManager);

    menuView.addMenuItem(EntryType.Screen, sessioonView);
    menuView.addMenuItem(EntryType.Screen, sessioonView2);
    menuView.addMenuItem(EntryType.Screen, sessioonView3);
    menuView.addMenuItem(EntryType.Screen, sessioonView4);
    menuView.addMenuItem(EntryType.ExitItem, sessioonView4);
    mainMenuView.addMenuItem(EntryType.Screen, menuView);
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
