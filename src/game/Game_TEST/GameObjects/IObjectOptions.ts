import Vector from "../../Helpers/Vector";
import Vertex from "../../Helpers/Vertex";

interface IObjectOptions {
  vertices: Array<Vertex>;
  velocity?: Vector,
  mass?: number,
  restitution?: number,

  color?: string,
}

export default IObjectOptions;