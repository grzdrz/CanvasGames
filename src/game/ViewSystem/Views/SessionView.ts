import View from "./View";
import ViewManager from "../ViewManager";
import Player from "../../GameSystem/Player";
import Vector from "../../Helpers/Vector";
import Physic from "../../GameSystem/Physic";

class SessionView extends View {
    public gameObjects = new Array<Player>();

    constructor(viewManager: ViewManager) {
        super(viewManager);

        for (let i = 0; i < 10; i++) {
            this.gameObjects.push(new Player(new Vector(150, 150), new Vector(0, 0), 1));
        }
    }


    public loadContent(): void {
        super.loadContent();

        this.gameObjects.forEach(obj => {
            this.viewManager.onMouseDown.subscribe(obj.handlerSetPosition);
            this.viewManager.onMouseMove.subscribe(obj.handlerSetPosition);

            this.viewManager.onKeyDown.subscribe(obj.handlerKeyDown);
            this.viewManager.onKeyUp.subscribe(obj.handlerKeyUp);
        });
    }

    public update(gameTime: DOMHighResTimeStamp): void {
        this.gameObjects.forEach((obj) => obj.update())
        Physic.analyzeCollisions(this.gameObjects);
        Physic.detectEdgeCollisions(this.gameObjects, this.viewManager.canvasManager.width, this.viewManager.canvasManager.height);
    }

    public draw(gameTime: DOMHighResTimeStamp): void {
        this.gameObjects.forEach(obj => {
            this.viewManager.canvasManager.drawObject(obj);
        });
    }

    public unloadContent(): void {
        super.unloadContent();
    }
}

export default SessionView;