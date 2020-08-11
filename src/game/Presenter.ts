import Model from "./Model/Model";

import ViewManager from "./ViewSystem/ViewManager";

import EventArgs from "./Events/EventArgs";
import ModelDataEventArgs from "./Events/ModelDataEventArgs";
import ViewDataEventArgs from "./Events/ViewDataEventArgs";
import GameComponent from "./ViewSystem/GameComponent";
import ModelData from "./Model/Data/ModelData";
import ViewData from "./ViewSystem/Data/ViewData";
import SessionView from "./ViewSystem/Views/SessionView";
import IModelData from "./Model/Data/IModelData";
import IViewData from "./ViewSystem/Data/IViewData";

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
        this.viewManager.onStatesUpdate.subscribe(this.handlerStatesUpdate);
        this.model.onStatesUpdate.subscribe(this.handlerStatesUpdate);

        this.model.onGetViewData.subscribe(this.handlerGetViewData);
        this.viewManager.onGetModelData.subscribe(this.handlerGetModelData);

        this.model.initialize();
        this.viewManager.initialize();

        let sessioonView = new SessionView(this.viewManager);
        this.viewManager.addView(sessioonView);


        this.gameComponents.forEach(component => {
            component.loadContent();
        });
        this.invokeGameCycle(0);
    }

    public invokeGameCycle = (gameTime: DOMHighResTimeStamp) => {
        this.gameComponents.forEach(component => {
            component.update(gameTime);
            component.draw(gameTime);
        });
        requestAnimationFrame(this.invokeGameCycle);
    }

    private handlerStatesUpdate = (args: EventArgs) => {
        if (args instanceof ModelDataEventArgs) this.model.setData(args.data);
        if (args instanceof ViewDataEventArgs) this.viewManager.setData(args.data);
    }

    private handlerGetModelData = (args: EventArgs) => {
        this.model.getData(<ModelDataEventArgs>args);
    }

    private handlerGetViewData = (args: EventArgs) => {
        this.viewManager.getData(<ViewDataEventArgs>args);
    }
}

export default Presenter;
