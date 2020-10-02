import Game from "../../Game";
import Ammunition from "./Ammunition";
import IObjectOptions from "../IObjectOptions";
import Vector from "../../../Helpers/Vector";

const imageSrc = './src/game/Images/GameObjects/playerBeta.png';

class Bullet extends Ammunition {
  public static timeStamp = 100;
  public get damage() { return 20; }

  constructor(view: Game, options: IObjectOptions) {
    options.size = new Vector(20, 10);
    super(view, imageSrc, options);
  }

  initialize() {
    super.initialize();

    this.color = 'yellow';
  }


}

export default Bullet;
