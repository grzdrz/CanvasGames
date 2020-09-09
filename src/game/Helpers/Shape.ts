import Vector from "./Vector";
import Vertex from "./Vertex";

class Shape {
  public vertices = new Array<Vertex>();
  public center = Vector.zero;
  public angle = 0;
  constructor() {

  }

  calculateNormals() {
    let axes = new Array<Vector>();
    for (let i = 0; i < this.vertices.length; i++) {
      let p1 = this.vertices[i];
      let p2 = this.vertices[i + 1 == this.vertices.length ? 0 : i + 1];
      let edge = p1.position.subtract(p2.position);
      edge.rotateVector(Math.PI / 2);
      axes[i] = edge;
    }
  }
}