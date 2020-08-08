import IModelData from "../Model/Data/IModelData";
import Vector from "../../Helpers/Vector";

import ViewManager from "./ViewManager";

import ViewState from "./Data/ViewState";

abstract class View {
    public viewManager: ViewManager;
    public isPopup: boolean = false;
    public viewState = ViewState.Active;
    public get IsActive() { return this.viewState == ViewState.Active; }

    constructor(viewManager: ViewManager) {
        this.viewManager = viewManager;
    }

    public update(/* GameTime gameTime,  */coveredByOtherScreen: boolean): void {
        if (coveredByOtherScreen) {
            this.viewState = ViewState.Hidden;
        }
        else {
            this.viewState = ViewState.Active;
        }
    }

    public draw(/* GameTime gameTime */): void { }

    public loadContent(): void { }

    public unloadContent(): void { }

    public exitScreen() {
        this.viewManager.removeView(this);
    }
}

export default View;
