import Vector from "../../../Helpers/Vector";
import IDrawableObject from "./IDrawableObject";
import MouseClickEventArgs from "../../../Events/MouseClickEventArgs";
import EventArgs from "../../../Events/EventArgs";

class SomeObject implements IDrawableObject {
    public width = 50;
    public height = 50;
    public color = "red";
    public position = new Vector(0, 0);

    constructor() {
        this.initialize();
    }

    public initialize(): void {

    }

    public handlerSetPosition = (eventArgs: EventArgs) => {
        const args = <MouseClickEventArgs>(eventArgs);
        this.position.x = args.cursorPosition.x;
        this.position.y = args.cursorPosition.y;
    }
}

export default SomeObject;
