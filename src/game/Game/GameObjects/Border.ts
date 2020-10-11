import GameObject from "./GameObject";
import IObjectOptions from "./IObjectOptions";
import Game from "../Game";
import IDrawableImage from "../../DrawingSystem/IDrawableImage";

const imagePath = './src/game/Images/GameObjects/arrow1231241231.png';

class Border extends GameObject {
  constructor(view: Game, options: IObjectOptions) {
    super(view, imagePath, options);

    this.body.isStatic = true;

    this.initialize();
  }

  initialize() {
    this.body.collisionFilter.category = 0x0002;

    this.layerLevel = 2;
    this.isStatic = true;
  }

  update(gameTime: number) {
    super.update(gameTime);
    /* this.angle = Math.PI / 2; */
  }

  draw() {
    super.draw();
    /* this.view.viewManager.canvasManager.drawBodyImage(this); */
  }
}

export default Border;
