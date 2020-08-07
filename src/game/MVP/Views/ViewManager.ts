import ViewData from "./Data/ViewData";

/* import OptionsPanelView from "./OptionsPanel/OptionsPanelView"; */
import ViewDataEventArgs from "../../Events/ViewDataEventArgs";
import IViewData from "./Data/IViewData";

import Event from "../../Events/Event";
import ModelData from "../Model/Data/ModelData";
import ModelDataEventArgs from "../../Events/ModelDataEventArgs";
import View from "./View";

class ViewManager {
    public canvas: HTMLElement;

    public viewData: ViewData;

    public views: View[] = new Array<View>();

    public onStatesUpdate = new Event();

    public onGetModelData = new Event();

    /* public onHandleMove = new Event();

    public onInputsChange = new Event();

    public onMouseDown = new Event();

    public onMouseMove = new Event();

    public onMouseUp = new Event(); */

    constructor(viewData: ViewData, canvas: HTMLElement) {
        this.viewData = viewData;
        this.canvas = canvas;
    }

    public initialize(): void {


        this.views.forEach((e) => e.initialize());

        this.update(this.viewData);
    }

    public update(data: IViewData): void {

    }

    public getModelData(): ModelData {
        const optionsEventArgs = new ModelDataEventArgs({});
        this.onGetModelData.invoke(optionsEventArgs);
        return <ModelData>optionsEventArgs.data;
    }

    public getData(args: ViewDataEventArgs): void {
        args.data = new ViewData(this.viewData);
    }
}

export default ViewManager;
