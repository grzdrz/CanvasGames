import View from "./View";
import ViewManager from "./ViewManager";
import SomeObject from "./GameObjects/SomeObject";

class SessionView extends View {
    public gameObjects = new Array<SomeObject>(); // ///

    constructor(viewManager: ViewManager) {
        super(viewManager);

        this.gameObjects.push(new SomeObject()); // ///
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