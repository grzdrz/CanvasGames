import { Body, World } from 'matter-js';

import Vector from '../../../Helpers/Vector';
import IObjectOptions from '../../Types/IObjectOptions';
import Game from '../../Game';
import Explosion from './Explosion';
import Ammunition from './Ammunition';

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
    const explosion = new Explosion(this.game);
    Body.setPosition(explosion.body, this.body.position);

    this.game.model.gameObjects.push(explosion);
    World.add(this.game.model.world, [explosion.body]);
  }
}

export default Bomb;