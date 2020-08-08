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

        /* this.border = new Border();
        this.blocks = new List<TestObject>(); */

        /* restartButton = new RestartButton(this, ScreenManager);
        restartButton.AddMenuItem(EntryType.Screen, this); */
        this.gameObjects.forEach(obj => {
            this.viewManager.onMouseDown.subscribe(obj.handlerSetPosition);
            this.viewManager.onMouseMove.subscribe(obj.handlerSetPosition);
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