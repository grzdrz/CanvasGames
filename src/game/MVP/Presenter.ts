import Model from "./Model/Model";

import ViewManager from "./Views/ViewManager";

import EventArgs from "../Events/EventArgs";
import ModelDataEventArgs from "../Events/ModelDataEventArgs";
import ViewDataEventArgs from "../Events/ViewDataEventArgs";

class Presenter {
    public model: Model;

    public viewManager: ViewManager;

    constructor(model: Model, viewManager: ViewManager) {
        this.model = model;
        this.viewManager = viewManager;

        this.handlerGetModelData = this.handlerGetModelData.bind(this);
        this.handlerGetViewData = this.handlerGetViewData.bind(this);
        this.handlerHandleMove = this.handlerHandleMove.bind(this);
        this.handlerViewsUpdate = this.handlerViewsUpdate.bind(this);
        this.handlerStatesUpdate = this.handlerStatesUpdate.bind(this);

        this.initialize();
    }

    private initialize(): void {
        this.viewManager.onStatesUpdate.subscribe(this.handlerStatesUpdate);
        this.viewManager.onStatesUpdate.subscribe(this.handlerViewsUpdate);
        this.model.onStatesUpdate.subscribe(this.handlerStatesUpdate);

        /* this.viewManager.onHandleMove.subscribe(this.handlerStatesUpdate);
        this.viewManager.onHandleMove.subscribe(this.handlerHandleMove);

        this.viewManager.onInputsChange.subscribe(this.handlerStatesUpdate);
        this.viewManager.onInputsChange.subscribe(this.handlerHandleMove); */

        this.model.onGetViewData.subscribe(this.handlerGetViewData);
        this.viewManager.onGetModelData.subscribe(this.handlerGetModelData);

        this.model.initialize();
        this.viewManager.initialize();
    }

    private handlerStatesUpdate(args: EventArgs): void {
        if (args instanceof ModelDataEventArgs) this.model.update(args.data);
        if (args instanceof ViewDataEventArgs) this.viewManager.update(args.data);
    }

    private handlerGetModelData(args: EventArgs): void {
        this.model.getData(<ModelDataEventArgs>args);
    }

    private handlerGetViewData(args: EventArgs): void {
        this.viewManager.getData(<ViewDataEventArgs>args);
    }

    private handlerViewsUpdate(): void {
        this.viewManager.views.forEach((e) => e.update(true));
    }

    private handlerHandleMove(): void {
        this.viewManager.views.forEach((e) => e.update(false));
    }
}

export default Presenter;
