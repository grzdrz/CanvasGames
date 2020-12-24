import Vector from "../../Helpers/Vector";

interface IObjectOptions {
  // geometry
  size: Vector,
  position: Vector,

  // physic
  velocity?: Vector,
  mass?: number,
  restitution?: number,

  // visual
  color?: string,
}

export default IObjectOptions;