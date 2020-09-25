import GameObject from "./GameObject";
import IObjectOptions from "./IObjectOptions";
import Game_2 from "../Game_2";
import IDrawableImage from "../../DrawingSystem/IDrawableImage";

const imagePath = './src/game/Images/GameObjects/arrow.png';

class Background extends GameObject implements IDrawableImage {
  public image: HTMLImageElement;
  public isImageLoaded = false;

  constructor(options: IObjectOptions = {}, view: Game_2) {
    super(options, view, imagePath);
    this.layerLevel = 2;
    this.isStatic = true;

    const height = this.view.viewManager.canvasManager.height;
    const width = this.view.viewManager.canvasManager.width;
    this.size.width = Math.max(width, height) / 4;
    this.size.height = Math.min(width, height) / 4;
    this.position.x = width / 2 - this.size.width * 0.5;
    this.position.y = height / 2 - this.size.height * 1.5;

    this.image = new Image();
    this.image.src = imagePath;
    this.image.onload = () => {
      this.isImageLoaded = true;
    };
  }

  update(gameTime: number) {
    super.update(gameTime);
    this.angle = Math.PI / 2;
  }

  draw() {
    this.view.viewManager.canvasManager.drawImage(this);
    // super.draw();
  }
}

export default Background;
