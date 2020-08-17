import GameObject from "./GameObject";
import Vector from "../../Helpers/Vector";
import EventArgs from "../../Events/EventArgs";
import IObjectOptions from "./IObjectOptions";
import IMouseData from "../IMouseData";

class Player extends GameObject {
    constructor(options: IObjectOptions) {
        super(options);
    }

    public handlerKeyDown = (eventArgs: EventArgs<IKeyData>) => {
        if (this.firstKeyDowned === "") this.firstKeyDowned = eventArgs.data.key;
        else if (eventArgs.data.key !== this.firstKeyDowned) this.secondKeyDowned = eventArgs.data.key;

        if (this.firstKeyDowned !== "" && this.secondKeyDowned === "") {
            if (this.firstKeyDowned === "KeyD") this.velocity.x += 5;
            if (this.firstKeyDowned === "KeyA") this.velocity.x -= 5;
            if (this.firstKeyDowned === "KeyS") this.velocity.y += 5;
            if (this.firstKeyDowned === "KeyW") this.velocity.y -= 5;
        } else if (this.firstKeyDowned !== "" && this.secondKeyDowned !== "") {
            if ((this.firstKeyDowned === "KeyD" && this.secondKeyDowned === "KeyW") ||
                (this.firstKeyDowned === "KeyW" && this.secondKeyDowned === "KeyD")) {
                this.velocity.x += 5;
                this.velocity.y -= 5;
            }
            if ((this.firstKeyDowned === "KeyD" && this.secondKeyDowned === "KeyS") ||
                (this.firstKeyDowned === "KeyS" && this.secondKeyDowned === "KeyD")) {
                this.velocity.x += 5;
                this.velocity.y += 5;
            }
            if ((this.firstKeyDowned === "KeyA" && this.secondKeyDowned === "KeyW") ||
                (this.firstKeyDowned === "KeyW" && this.secondKeyDowned === "KeyA")) {
                this.velocity.x -= 5;
                this.velocity.y -= 5;
            }
            if ((this.firstKeyDowned === "KeyA" && this.secondKeyDowned === "KeyS") ||
                (this.firstKeyDowned === "KeyS" && this.secondKeyDowned === "KeyA")) {
                this.velocity.x -= 5;
                this.velocity.y += 5;
            }
        }
    }

    public handlerKeyUp = (/* eventArgs: EventArgs<IKeyData> */) => {
        if (this.secondKeyDowned === "") this.firstKeyDowned = "";
        else this.secondKeyDowned = "";
    }

    public handlerSetPosition = (eventArgs: EventArgs<IMouseData>) => {
        this.isGripped = true;
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.position.x = eventArgs.data.mousePosition.x;
        this.position.y = eventArgs.data.mousePosition.y;
    }

    public handlerUnhand = (eventArgs: EventArgs<IMouseData>) => {
        this.isGripped = false;
    }
}

export default Player;