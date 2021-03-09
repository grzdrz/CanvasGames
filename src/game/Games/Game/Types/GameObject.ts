import { Bodies, Body } from 'matter-js';

import Vector from '../../../Helpers/Vector';
import Game from '../Game';
import AnimationFrames from '../../../DrawingSystem/AnimationFrames';
import IDrawableBodyImage from '../../../DrawingSystem/Types/IDrawableBodyImage';
import IGameObjectModel from './IGameObjectModel';
import IGameObjectView from './IGameObjectView';
import IObjectOptions from './IObjectOptions';

class GameObject implements IDrawableBodyImage, IGameObjectModel, IGameObjectView {
  public game: Game;

  public body: Body;
  public size: Vector;

  public color = 'red';
  public image: HTMLImageElement;
  public isImageLoaded = false;
  public animationFrames = new Map<string, AnimationFrames>();

  public isColliding = false;
  public isPreColliding = false;
  public isCollideWithEnemy = false;
  public isGriped = false;

  public isStatic = false;
  public layerLevel = 1;
  public isDestroyed = false;
  public isCollideWithBorder = false;

  constructor(game: Game, imageSrc: string, options: IObjectOptions) {
    this.game = game;

    this.image = new Image();
    this.image.src = imageSrc;
    this.image.onload = () => {
      this.isImageLoaded = true;
    };

    this.size = new Vector(options.size.width, options.size.height);
    this.body = Bodies.rectangle(options.position.x, options.position.y, options.size.width, options.size.height);

    if (options.velocity) Body.setVelocity(this.body, options.velocity);

    this.updateState(options);
  }

  public updateState(options: IObjectOptions): void {
    if (options.color !== undefined) this.color = options.color;
  }

  public draw() {
    this.animationFrames.forEach((frames) => {
      if (frames.isActive) frames.draw();
    });

    const canvas = this.game.viewManager.canvasManager;
    canvas.drawPerimeter(this);
  }

  public update(gameTime: DOMHighResTimeStamp, options?: IObjectOptions): void {
    this.animationFrames.forEach((frames) => {
      if (frames.isActive) frames.update();
    });
  }

  public updateAnimationState() {
    this.animationFrames.forEach((frame) => frame.isActive = false);
  }
}

export default GameObject;
