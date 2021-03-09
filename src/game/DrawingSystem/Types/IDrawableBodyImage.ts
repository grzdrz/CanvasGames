import { Body } from 'matter-js';

import Vector from "../../Helpers/Vector";

interface IDrawableBodyImage {
  image: HTMLImageElement,
  isImageLoaded: boolean,
  body: Body,
  size: Vector,
  color: string,
}

export default IDrawableBodyImage;