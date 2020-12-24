import Vector from '../Helpers/Vector';
import EntryType from '../States/EntryType';
import View from './View';

class ViewEntry {
  public view?: View;
  public type: EntryType;
  public parentView: View;
  public position = Vector.zero;

  public size = new Vector(0, 0);
  public angle = 0;

  public image: HTMLImageElement;
  public isImageLoaded = false;

  public isExitItem() {
    return this.type === EntryType.ExitItem;
  }

  public isSelectable() {
    return this.type !== EntryType.Separator;
  }

  constructor(parentView: View, type: EntryType, imageSrc: string, size: Vector, view?: View) {
    this.view = view;
    this.type = type;
    this.parentView = parentView;

    this.size = size;

    this.image = new Image();
    this.image.src = imageSrc;
    this.image.onload = () => {
      this.isImageLoaded = true;
    };
  }

  public initialize(): void {
  }

  public update(isSelected: boolean, gameTime: DOMHighResTimeStamp) {
  }

  public draw() {
    const canvas = this.parentView.viewManager.canvasManager;
    canvas.drawImage(this);
  }
}

export default ViewEntry;
