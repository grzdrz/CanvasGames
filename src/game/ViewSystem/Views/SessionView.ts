import View from "./View";
import ViewManager from "../ViewManager";
import GameObject from "../../GameSystem/GameObjects/GameObject";
import Vector from "../../Helpers/Vector";
import Physic from "../../GameSystem/Physic";
import MathFunctions from "../../Helpers/MathFunctions";
import Player from "../../GameSystem/GameObjects/Player";

class SessionView extends View {
    public gameObjects = new Array<GameObject>();
    public player: Player;

    constructor(viewManager: ViewManager) {
        super(viewManager);

        this.player = new Player({
            width: 40,
            height: 40,
            color: "green",
            mass: 1,
        });

        this.initialize();
    }

    public initialize() {
        const options = {
            position: new Vector(0, 0),
            velocity: new Vector(0, 0),
            mass: 1,
        };

        for (let i = 0; i < 50; i++) {
            const positionX = MathFunctions.randomInteger(0, this.viewManager.canvasManager.width);
            const positionY = MathFunctions.randomInteger(0, this.viewManager.canvasManager.height);
            options.position = new Vector(positionX, positionY);

            const velocityX = MathFunctions.randomInteger(-10, 10) / 10;
            const velocityY = MathFunctions.randomInteger(-10, 10) / 10;
            options.velocity = new Vector(velocityX, velocityY);

            this.gameObjects.push(new GameObject(options));
        }
        this.gameObjects.push(this.player);
    }

    public loadContent(): void {
        super.loadContent();

        this.viewManager.onMouseDown.subscribe(this.player.handlerSetPosition);
        this.viewManager.onMouseMove.subscribe(this.player.handlerSetPosition);
        this.viewManager.onMouseUp.subscribe(this.player.handlerUnhand);

        this.viewManager.onKeyDown.subscribe(this.player.handlerKeyDown);
        this.viewManager.onKeyUp.subscribe(this.player.handlerKeyUp);
    }

    public update(gameTime: DOMHighResTimeStamp): void {
        this.gameObjects.forEach((obj) => obj.update(gameTime))
        Physic.analyzeCollisions(this.gameObjects);
        Physic.detectEdgeCollisions(this.gameObjects, this.viewManager.canvasManager.width, this.viewManager.canvasManager.height);
    }

    public draw(): void {
        this.gameObjects.forEach(obj => {
            this.viewManager.canvasManager.drawObject(obj);
        });
    }

    public unloadContent(): void {
        super.unloadContent();
    }
}

export default SessionView;