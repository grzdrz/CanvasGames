import Vector from "../Helpers/Vector";

interface IDrawableImage {
  image: HTMLImageElement,
  isImageLoaded: boolean,
  position: Vector,
  size: Vector,
}

export default IDrawableImage;
