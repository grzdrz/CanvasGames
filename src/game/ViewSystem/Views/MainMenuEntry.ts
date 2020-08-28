import MainMenuView from "./MainMenuView";
import View from "./View";
import EntryType from "./EntryType";
import Texture from "./Texture";
import Vector from "../../Helpers/Vector";

class MainMenuEntry {
  public view: View;
  public type: EntryType;
  public menu: MainMenuView;
  public position = Vector.zero;

  public size = new Vector(100, 100);
  public color = "rgb(10, 100, 200)";

  public isExitItem() {
    return this.type === EntryType.ExitItem;
  }

  public isSelectable() {
    return this.type !== EntryType.Separator;
  }

  constructor(menu: MainMenuView, type: EntryType, view: View) {
    this.view = view;
    this.type = type;
    this.menu = menu;

    const canvas = this.view.viewManager.canvasManager;
    this.position = new Vector(canvas.width / 2 - this.size.width / 2, canvas.height / 2 - this.size.height / 2);
  }

  public initialize(): void {
  }

  public update(isSelected: boolean, gameTime: DOMHighResTimeStamp) {
  }

  public draw() {
    const canvas = this.view.viewManager.canvasManager;
    canvas.drawSquare(this.position, this.size, this.color);
  }

}

export default MainMenuEntry;
