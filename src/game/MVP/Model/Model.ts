import Event from "../../Events/Event";

import IModelData from "./Data/IModelData";
import ModelData from "./Data/ModelData";
import ModelDataEventArgs from "../../Events/ModelDataEventArgs";
import ViewDataEventArgs from "../../Events/ViewDataEventArgs";
import ViewData from "../Views/Data/ViewData";
import CreatureModel from "./CreatureModel";
import TerrainModel from "./TerrainModel";

class Model {
    private data: ModelData;

    public onGetViewData = new Event();

    public onStatesUpdate = new Event();

    public creature: CreatureModel;

    public terrain: TerrainModel;

    constructor(data: ModelData) {
        this.data = data;

        this.creature = new CreatureModel();
        this.terrain = new TerrainModel();
    }

    public initialize(): void {
        this.update(this.data);
    }

    public update(data: IModelData): void {

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
