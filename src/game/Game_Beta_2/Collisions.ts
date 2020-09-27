import Vector from "../Helpers/Vector";
import GameObject from "./GameObjects/GameObject";
import Enemy from "./GameObjects/Enemy";
import Event from "../Events/Event";
import ICollisionData from "../Data/ICollisionData";
import EventArgs from "../Events/EventArgs";
import ViewManager from "../ViewSystem/ViewManager";

const borderRestitution = 0.5;

class Collisions {
  public viewManager: ViewManager;

  public preCollisionsDistance = 30;

  public onCollisionDetected = new Event<ICollisionData>();
  public onPreCollisionDetected = new Event<ICollisionData>();

  public constructor(viewManager: ViewManager) {
    this.viewManager = viewManager;
  }

  public loadContent() {
    /* this.onCollisionDetected.subscribe(this.handleSeparateObjects);
    this.onCollisionDetected.subscribe(this.handleObjectsImpact); */
  }

  public unloadContent() {
    /* this.onCollisionDetected.unsubscribe(this.handleSeparateObjects);
    this.onCollisionDetected.unsubscribe(this.handleObjectsImpact); */
  }

  public throwOffCollisions(objects: GameObject[]): void {
    // сброс состояний коллизий
    for (let i = 0; i < objects.length; i++) {
      objects[i].isPreColliding = false;
      objects[i].isColliding = false;
    }
  }

  public findAllObjectsCollisions(objects: GameObject[]): void {
    let object1;
    let object2;

    // сброс состояний коллизий
    this.throwOffCollisions(objects);

    // поиск коллизий
    for (let i = 0; i < objects.length; i++) {
      object1 = objects[i];
      for (let j = i + 1; j < objects.length; j++) {
        object2 = objects[j];

        /* // поиск потенциальных коллизий
        if (this.detectCollision(object1, object2, true)) {
          object1.isPreColliding = true;
          object2.isPreColliding = true;

          this.onPreCollisionDetected.invoke(new EventArgs<ICollisionData>({
            object1: object1,
            object2: object2,
          }));
        }

        // поиск фактических коллизий
        if (this.detectCollision(object1, object2)) {
          object1.isColliding = true;
          object2.isColliding = true;

          this.onCollisionDetected.invoke(new EventArgs<ICollisionData>({
            object1: object1,
            object2: object2,
          }));
        } */
      }

      const canvas = this.viewManager.canvasManager;
      this.findCollisionWithBorders(object1, canvas.width, canvas.height)
    }
  }

  public findCollisionWithBorders(obj: GameObject, canvasWidth: number, canvasHeight: number) {
    const isLeftPreCollision = obj.vertices.find((vertex) => {
      return vertex.position.x < this.preCollisionsDistance;
    }) !== undefined;
    const isLeftCollision = obj.vertices.find((vertex) => {
      return (vertex.position.x < 0);
    }) !== undefined;
    const isRightPreCollision = obj.vertices.find((vertex) => {
      return (vertex.position.x > canvasWidth - this.preCollisionsDistance);
    }) !== undefined;
    const isRightCollision = obj.vertices.find((vertex) => {
      return (vertex.position.x > canvasWidth);
    }) !== undefined;
    const isBottomPreCollision = obj.vertices.find((vertex) => {
      return (vertex.position.y > canvasHeight - this.preCollisionsDistance);
    }) !== undefined;
    const isBottomCollision = obj.vertices.find((vertex) => {
      return (vertex.position.y > canvasHeight);
    }) !== undefined;
    const isTopPreCollision = obj.vertices.find((vertex) => {
      return (vertex.position.y < this.preCollisionsDistance);
    }) !== undefined;
    const isTopCollision = obj.vertices.find((vertex) => {
      return (vertex.position.y < 0);
    }) !== undefined;

    if (isLeftCollision) {
      obj.velocity.x = Math.abs(obj.velocity.x) * borderRestitution;
      obj.isColliding = true;
    } else if (isRightCollision) {
      obj.velocity.x = -Math.abs(obj.velocity.x) * borderRestitution;
      obj.isColliding = true;
    }
    if (isBottomCollision) {
      obj.velocity.y = -Math.abs(obj.velocity.y) * borderRestitution;
      obj.isColliding = true;
    } else if (isTopCollision) {
      obj.velocity.y = Math.abs(obj.velocity.y) * borderRestitution;
      obj.isColliding = true;
    }

    if (
      isLeftPreCollision ||
      isRightPreCollision ||
      isBottomPreCollision ||
      isTopPreCollision
    ) {
      obj.isPreColliding = true;
    }
  }
}

export default Collisions;
