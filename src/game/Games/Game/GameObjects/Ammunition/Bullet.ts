import Game from '../../Game';
import Ammunition from './Ammunition';
import IObjectOptions from '../../Types/IObjectOptions';
import Vector from '../../../../Helpers/Vector';

const imageSrc = './src/game/Images/GameObjects/playerBeta.png';

const defaultOptions = {
  size: new Vector(20, 10),
  position: new Vector(0, 0),
  color: 'yellow',
};

class Bullet extends Ammunition {
  public static timeStamp = 100;
  public get damage() { return 20; }

  constructor(view: Game, options: IObjectOptions = { ...defaultOptions }) {
    options.size = new Vector(20, 10);
    super(view, imageSrc, options);
  }

  initialize() {
    super.initialize();
  }
}

export default Bullet;
