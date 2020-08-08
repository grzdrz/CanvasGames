import EventArgs from "./EventArgs";
import IModelData from "../MVP/Model/Data/IModelData";
import Vector from "../Helpers/Vector";

class MouseClickEventArgs extends EventArgs {
    public cursorPosition: Vector;

    constructor(cursorPosition: Vector) {
        super();
        this.cursorPosition = cursorPosition;
    }
}

export default MouseClickEventArgs;