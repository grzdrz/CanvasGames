import Vector from "../Helpers/Vector";

interface IDrawableSimpleShape {
  position: Vector,
  size: Vector,
  angle: number,
  color: string,
}

export default IDrawableSimpleShape;