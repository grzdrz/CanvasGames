import Vector from "../../Helpers/Vector";

class Rectangle {
  public position: Vector;
  public size: Vector;

  constructor(position: Vector, size: Vector) {
    this.position = position;
    this.size = size;
  }

  public contains(point: Vector): boolean {
    return (
      point.x > this.position.x && point.x < this.position.x + this.size.width &&
      point.y > this.position.y && point.y < this.position.y + this.size.height
    );
  }
}

export default Rectangle;
