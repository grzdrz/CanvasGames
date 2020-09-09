import Vector from "../Helpers/Vector";
import Vertex from "../Helpers/Vertex";

interface IDrawablePolygon {
  /* image: HTMLImageElement,
  isImageLoaded: boolean, */
  vertices: Array<Vertex>;
  color: string;
  isStatic: boolean;
  isColliding: boolean;
}

export default IDrawablePolygon;