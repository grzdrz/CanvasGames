import { Body } from 'matter-js';

import Vector from "../../Helpers/Vector";

interface IDrawableImage {
  image: HTMLImageElement,
  isImageLoaded: boolean,
  position: Vector,
  size: Vector,
  angle: number,
}

export default IDrawableImage;
