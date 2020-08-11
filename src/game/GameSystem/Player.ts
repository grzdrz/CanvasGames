import Vector from "../Helpers/Vector";
import IDrawableObject from "./IDrawableObject";
import MouseClickEventArgs from "../Events/MouseClickEventArgs";
import EventArgs from "../Events/EventArgs";
import KeysClickEventArgs from "../Events/KeysClickEventArgs";
import IPhysicalObject from "./IPhysicalObject";

class Player implements IDrawableObject, IPhysicalObject {
    public width = 50;
    public height = 50;
    public color = "red";
    public position = new Vector(0, 0);

    public velocity = new Vector(0, 0);
    public isColliding = false;
    public mass: number;
    public restitution = 0.9;

    public firstKeyDowned = "";
    public secondKeyDowned = "";

    constructor(position: Vector, velocity: Vector, mass: number) {
        this.position = position;
        this.velocity = velocity;
        this.mass = mass;

        this.width = this.width * this.mass;
        this.height = this.height * this.mass;

        this.initialize();
    }

    public initialize(): void {

    }

    public update(): void {
        this.velocity.y += 0.1; /* g * secondsPassed */

        this.position.x += this.velocity.x /* * secondsPassed */;
        this.position.y += this.velocity.y /* * secondsPassed */;

        this.position = this.position.sum(this.velocity);
        if (this.isColliding) this.color = "red";
        else this.color = "blue";
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

export default Player;
