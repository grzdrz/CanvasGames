import Vector from "../../Helpers/Vector";

class Rectangle {
  public position: Vector;
  public size: Vector;

  constructor(position: Vector, size: Vector) {
    this.position = position;
    this.size = size;
  }

  public contains(point: Vector): boolean {
    const betweenX = point.x > this.position.x - this.size.width / 2 && point.x < this.position.x + this.size.width / 2;
    const betweenY = point.y > this.position.y - this.size.height / 2 && point.y < this.position.y + this.size.height / 2;
    const result = betweenX && betweenY;
    return result;
  }
}

export default Rectangle;
