import Vector from "../../Helpers/Vector";

interface IObjectOptions {
  size: Vector,
  position: Vector,

  velocity?: Vector,
  mass?: number,
  restitution?: number,

  color?: string,
}

export default IObjectOptions;