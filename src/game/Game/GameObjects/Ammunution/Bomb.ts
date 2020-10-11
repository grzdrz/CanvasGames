import Game from "../../Game";
import Ammunition from "./Ammunition";
import IObjectOptions from "../IObjectOptions";
import Vector from "../../../Helpers/Vector";
import Explosion from "./Explosion";
import { Body, World } from "matter-js";

const imageSrc = './src/game/Images/GameObjects/playerBeta.png';

const defaultOptions = {
  size: new Vector(30, 30),
  position: new Vector(0, 0),
  color: 'orange',
};

class Bomb extends Ammunition {
  public static timeStamp = 500;
  public get damage() { return 50; }

  constructor(view: Game, options: IObjectOptions = defaultOptions) {
    super(view, imageSrc, options);
  }

  initialize() {
    super.initialize();
  }

  update(gameTime: number) {
    super.update(gameTime);
  }

  destroy() {
    super.destroy();
    this.detonate();
  }

  detonate = () => {
    const explosion = new Explosion(this.view);
    Body.setPosition(explosion.body, this.body.position);

    this.view.gameObjects.push(explosion);
    World.add(this.view.world, [explosion.body]);
  }
}

export default Bomb;