import View from "./View";
import ViewManager from "./ViewManager";

class SessionView extends View {
    constructor(viewManager: ViewManager) {
        super(viewManager);
    }


    public loadContent(): void {
        super.loadContent();

        /* this.border = new Border();
        this.blocks = new List<TestObject>(); */

        /* restartButton = new RestartButton(this, ScreenManager);
        restartButton.AddMenuItem(EntryType.Screen, this); */
    }

    public update(): void {

    }

    public draw(): void {

    }

    public unloadContent(): void {
        super.unloadContent();
    }
}

export default SessionView;