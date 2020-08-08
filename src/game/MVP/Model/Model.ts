import Event from "../../Events/Event";

import IModelData from "./Data/IModelData";
import ModelData from "./Data/ModelData";
import ModelDataEventArgs from "../../Events/ModelDataEventArgs";
import ViewDataEventArgs from "../../Events/ViewDataEventArgs";
import ViewData from "../Views/Data/ViewData";

class Model {
    private data: ModelData;

    public onGetViewData = new Event();

    public onStatesUpdate = new Event();

    constructor(data: ModelData) {
        this.data = data;
    }

    public initialize(): void {
        this.setData(this.data);
    }

    public setData(data: IModelData): void {

    }

    public getViewData(): ViewData {
        const eventArgs = new ViewDataEventArgs({});
        this.onGetViewData.invoke(eventArgs);
        return <ViewData>eventArgs.data;
    }

    public getData(args: ModelDataEventArgs): void {
        args.data = new ModelData(this.data);
    }
}

export default Model;
