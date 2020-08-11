import EventArgs from "./EventArgs";
import IViewData from "../ViewSystem/Data/IViewData";

class ViewDataEventArgs extends EventArgs {
    public data: IViewData;

    constructor(data: IViewData) {
        super();
        this.data = data;
    }
}

export default ViewDataEventArgs;
