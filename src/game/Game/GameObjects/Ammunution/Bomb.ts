import Game from "../../Game";
import Ammunition from "./Ammunition";
import IObjectOptions from "../IObjectOptions";
import Vector from "../../../Helpers/Vector";

const imageSrc = './src/game/Images/GameObjects/playerBeta.png';

class Bomb extends Ammunition {
  public static timeStamp = 500;
  public get damage() { return 50; }

  constructor(view: Game, options: IObjectOptions) {
    options.size = new Vector(30, 20);
    super(view, imageSrc, options);
  }

  initialize() {
    super.initialize();

    this.color = 'orange';
  }


}

export default Bomb;