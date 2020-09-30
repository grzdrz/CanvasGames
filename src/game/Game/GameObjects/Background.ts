import GameObject from "./GameObject";
import IObjectOptions from "./IObjectOptions";
import Game from "../Game";
import IDrawableImage from "../../DrawingSystem/IDrawableImage";

const imagePath = './src/game/Images/GameObjects/arrow1231241231.png';

class Background extends GameObject {
  constructor(view: Game, options: IObjectOptions) {
    super(view, imagePath, options);

    this.body.isStatic = true;

    this.initialize();
  }

  initialize() {
    this.layerLevel = 2;
    this.isStatic = true;

    /* const height = this.view.viewManager.canvasManager.height;
    const width = this.view.viewManager.canvasManager.width; */
    /* this.size.width = Math.max(width, height) / 4;
    this.size.height = Math.min(width, height) / 4;
    this.position.x = width / 2 - this.size.width * 0.5;
    this.position.y = height / 2 - this.size.height * 1.5; */
  }

  update(gameTime: number) {
    super.update(gameTime);
    /* this.angle = Math.PI / 2; */
  }

  draw() {
    this.view.viewManager.canvasManager.drawBodyImage(this);
  }
}

export default Background;
