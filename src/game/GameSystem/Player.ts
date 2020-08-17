import Vector from "../Helpers/Vector";
import IDrawableObject from "./IDrawableObject";
import EventArgs from "../Events/EventArgs";
import IPhysicalObject from "./IPhysicalObject";
import IMouseData from "./IMouseData";

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

    public update(gameTime: DOMHighResTimeStamp): void {
        gameTime = gameTime * 10;
        this.velocity.y += 9.81 * gameTime;

        this.position.x += this.velocity.x * gameTime;
        this.position.y += this.velocity.y * gameTime;

        if (this.isColliding) this.color = "red";
        else this.color = "blue";
    }

    public handlerSetPosition = (eventArgs: EventArgs<IMouseData>) => {
        this.position.x = eventArgs.data.mousePosition.x;
        this.position.y = eventArgs.data.mousePosition.y;
    }

    public handlerKeyDown = (eventArgs: EventArgs<IKeyData>) => {
        if (this.firstKeyDowned === "") this.firstKeyDowned = eventArgs.data.key;
        else if (eventArgs.data.key !== this.firstKeyDowned) this.secondKeyDowned = eventArgs.data.key;

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

    public handlerKeyUp = (/* eventArgs: EventArgs<IKeyData> */) => {
        if (this.secondKeyDowned === "") this.firstKeyDowned = "";
        else this.secondKeyDowned = "";
    }
}

export default Player;
