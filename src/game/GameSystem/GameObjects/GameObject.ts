import Vector from "../../Helpers/Vector";
import EventArgs from "../../Events/EventArgs";
import IMouseData from "../IMouseData";
import IObjectOptions from "./IObjectOptions";

class GameObject {
    public width = 50;
    public height = 50;
    public position = new Vector(0, 0);

    public velocity = new Vector(0, 0);
    public mass = 1;
    public restitution = 0.9;

    public color = "red";


    public firstKeyDowned = "";
    public secondKeyDowned = "";
    public isColliding = false;

    public isGripped = false;

    constructor(options: IObjectOptions) {
        this.initialize(options);
    }

    public initialize(options: IObjectOptions): void {
        if (options.width !== undefined) this.width = options.width;
        if (options.height !== undefined) this.height = options.height;
        if (options.position !== undefined) this.position = options.position;
        if (options.velocity !== undefined) this.velocity = options.velocity;
        if (options.mass !== undefined) this.mass = options.mass;
        if (options.restitution !== undefined) this.restitution = options.restitution;
        if (options.color !== undefined) this.color = options.color;
    }

    public update(gameTime: DOMHighResTimeStamp): void {
        gameTime = gameTime * 10;
        if (!this.isGripped) {
            this.velocity.y += 9.81 * gameTime;

            this.position.x += this.velocity.x * gameTime;
            this.position.y += this.velocity.y * gameTime;
        }

        /* if (this.isColliding) this.color = "red";
        else this.color = "blue"; */
    }
}

export default GameObject;
