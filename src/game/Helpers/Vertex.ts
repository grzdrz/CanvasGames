import Vector from "./Vector";

class Vertex {
  position: Vector;

  constructor(position: Vector) {
    this.position = position;
  }

  public rotate(origin: Vector, angle: number) {
    let originVector = this.position.subtract(origin);
    originVector.rotateVector(angle);
    const result = origin.sum(originVector);
    this.position.x = result.x;
    this.position.y = result.y;
  }
}

export default Vertex;
