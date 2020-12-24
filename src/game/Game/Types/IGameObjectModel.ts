import IObjectOptions from './IObjectOptions';

interface IGameObjectModel {
  update(gameTime: DOMHighResTimeStamp, options?: IObjectOptions): void;
}

export default IGameObjectModel;