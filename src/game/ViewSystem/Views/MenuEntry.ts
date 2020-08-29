import EntryType from "./EntryType";
import Vector from "../../Helpers/Vector";
import View from "./View";
import MenuView from "./MenuView";
import IDrawableImage from "../../DrawingSystem/IDrawableImage";
import MathFunctions from "../../Helpers/MathFunctions";

class MenuEntry implements IDrawableImage {
  public view?: View;
  public type: EntryType;
  public menu: MenuView;
  public position = Vector.zero;

  public size = new Vector(150, 150);

  public image: HTMLImageElement;
  public isImageLoaded = false;

  public isExitItem() {
    return this.type === EntryType.ExitItem;
  }

  public isSelectable() {
    return this.type !== EntryType.Separator;
  }

  constructor(menu: MenuView, type: EntryType, view?: View) {
    this.view = view;
    this.type = type;
    this.menu = menu;

    this.image = new Image();
    if (this.type === EntryType.Screen)
      this.image.src = `/src/game/Images/Interface/buttonGameLevel_${MathFunctions.randomInteger(0, 5)}stars.png`;
    else if (this.type === EntryType.ExitItem)
      this.image.src = `/src/game/Images/Interface/buttonBack.png`;
    this.image.onload = () => {
      this.isImageLoaded = true;
    };
  }

  public initialize(): void {
  }

  public update(isSelected: boolean, gameTime: DOMHighResTimeStamp) {
  }

  public draw() {
    const canvas = this.menu.viewManager.canvasManager;
    canvas.drawImage(this);
  }

}

export default MenuEntry;
