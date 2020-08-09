import Vector from "../../../Helpers/Vector";
import IDrawableObject from "./IDrawableObject";
import MouseClickEventArgs from "../../../Events/MouseClickEventArgs";
import EventArgs from "../../../Events/EventArgs";
import KeysClickEventArgs from "../../../Events/KeysClickEventArgs";

class SomeObject implements IDrawableObject {
    public width = 50;
    public height = 50;
    public color = "red";
    public position = new Vector(0, 0);


    public firstKeyDowned = "";
    public secondKeyDowned = "";

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

    public handlerKeyDown = (eventArgs: EventArgs) => {
        const args = <KeysClickEventArgs>(eventArgs);

        if (this.firstKeyDowned === "") this.firstKeyDowned = args.key;
        else if (args.key !== this.firstKeyDowned) this.secondKeyDowned = args.key;

        if (this.firstKeyDowned !== "" && this.secondKeyDowned === "") {
            if (this.firstKeyDowned === "KeyD") this.position.x += 10;
            if (this.firstKeyDowned === "KeyA") this.position.x -= 10;
            if (this.firstKeyDowned === "KeyS") this.position.y += 10;
            if (this.firstKeyDowned === "KeyW") this.position.y -= 10;
        } else if (this.firstKeyDowned !== "" && this.secondKeyDowned !== "") {
            if ((this.firstKeyDowned === "KeyD" && this.secondKeyDowned === "KeyW") ||
                (this.firstKeyDowned === "KeyW" && this.secondKeyDowned === "KeyD")) {
                this.position.x += 10;
                this.position.y -= 10;
            }
            if ((this.firstKeyDowned === "KeyD" && this.secondKeyDowned === "KeyS") ||
                (this.firstKeyDowned === "KeyS" && this.secondKeyDowned === "KeyD")) {
                this.position.x += 10;
                this.position.y += 10;
            }
            if ((this.firstKeyDowned === "KeyA" && this.secondKeyDowned === "KeyW") ||
                (this.firstKeyDowned === "KeyW" && this.secondKeyDowned === "KeyA")) {
                this.position.x -= 10;
                this.position.y -= 10;
            }
            if ((this.firstKeyDowned === "KeyA" && this.secondKeyDowned === "KeyS") ||
                (this.firstKeyDowned === "KeyS" && this.secondKeyDowned === "KeyA")) {
                this.position.x -= 10;
                this.position.y += 10;
            }
        }
    }

    public handlerKeyUp = (eventArgs: EventArgs) => {
        if (this.secondKeyDowned === "") this.firstKeyDowned = "";
        else this.secondKeyDowned = "";
    }
}

export default SomeObject;
