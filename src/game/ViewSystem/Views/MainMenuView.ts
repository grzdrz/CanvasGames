import View from "./View";
import ViewManager from "../ViewManager";
import MainMenuEntry from "./MainMenuEntry";
import Vector from "../../Helpers/Vector";
import Rectangle from "./Rectangle";
import EntryType from "./EntryType";

class MainMenuView extends View {
  private menuEntries = new Array<MainMenuEntry>();
  public selectedEntry = 0;

  constructor(viewManager: ViewManager) {
    super(viewManager);

    this.initialize();
  }

  public initialize() {
  }

  public update(gameTime: DOMHighResTimeStamp): void {

  }

  public draw(): void {

  }

  public unloadContent(): void {
    super.unloadContent();
  }

  public addMenuItem(type: EntryType, view: View): void {
    const entry = new MainMenuEntry(this, type, view);
    this.menuEntries.push(entry);
  }

  public loadContent(): void {
    super.loadContent();

    /* Viewport viewport = ScreenManager.GraphicsDevice.Viewport;
    SpriteFont font = ScreenManager.Fonts.MenuSpriteFont; */
    const canvasManager = this.viewManager.canvasManager;

    /* _texScrollButton = ScreenManager.Content.Load<Texture2D>("Common/arrow");
    _texSlider = ScreenManager.Content.Load<Texture2D>("Common/slider"); */

    for (let i = 0; i < this.menuEntries.length; ++i) {
      this.menuEntries[i].initialize();
    }
  }

  private getMenuEntryAt(position: Vector): number {
    let index = 0;
    for (let entry of this.menuEntries) {
      const width = entry.width;
      const height = entry.height;
      const rect = new Rectangle(
        new Vector((entry.position.x - width / 2), (entry.position.y - height / 2)),
        new Vector(width, height)
      );

      if (rect.contains(new Vector(position.x, position.y)))
        return index;

      ++index;
    }
    return -1;
  }
}

export default MainMenuView;