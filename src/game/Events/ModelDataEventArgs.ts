import EventArgs from "./EventArgs";
import IModelData from "../Model/Data/IModelData";

class ModelDataEventArgs extends EventArgs {
    public data: IModelData;

    constructor(data: IModelData) {
        super();
        this.data = data;
    }
}

export default ModelDataEventArgs;
