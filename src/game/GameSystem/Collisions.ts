import Vector from "../Helpers/Vector";
import GameObject from "./GameObjects/GameObject";
import Enemy from "./GameObjects/Enemy";
import Player from "./GameObjects/Player";

const borderRestitution = 0.5;

class Collisions {
  public static preCollisionsDistance = 30;

  public static analyzeCollizions(objects: GameObject[], width: number, height: number) {
    this.handleObjectsCollisions(objects);
    this.detectEdgeCollisions(objects, width, height);

    this.detectObjectsPreCollisions(objects);
    this.detectEdgeCollisions(objects, width, height, true);
  }

  public static detectCollision(obj1: GameObject, obj2: GameObject, isPreCollisions = false): boolean {
    const vectorBetweenObjects = obj2.position.subtract(obj1.position);
    let sumOfRadiusesOfObjects = obj1.width / 2 + obj2.width / 2;
    const length = vectorBetweenObjects.length;
    sumOfRadiusesOfObjects = (isPreCollisions ? sumOfRadiusesOfObjects + this.preCollisionsDistance : sumOfRadiusesOfObjects);
    return (length <= sumOfRadiusesOfObjects);
  }

  public static throwOffCollisions(objects: GameObject[], isPreCollisions = false): void {
    // сброс состояний коллизий
    for (let i = 0; i < objects.length; i++) {
      if (isPreCollisions) objects[i].isPreColliding = false;
      else objects[i].isColliding = false;
    }
  }

  public static detectEdgeCollisions(gameObjects: GameObject[], canvasWidth: number, canvasHeight: number, isPreCollisions = false) {
    /* this.throwOffCollisions(gameObjects); */

    let obj;
    for (let i = 0; i < gameObjects.length; i++) {
      obj = gameObjects[i];

      const isLeftPreCollision = isPreCollisions && (obj.position.x < obj.width / 2 + this.preCollisionsDistance);
      const isLeftCollision = !isPreCollisions && (obj.position.x < obj.width / 2);
      const isRightPreCollision = isPreCollisions && (obj.position.x > canvasWidth - obj.width / 2 - this.preCollisionsDistance);
      const isRightCollision = !isPreCollisions && (obj.position.x > canvasWidth - obj.width / 2);
      if (isLeftCollision) {
        obj.velocity.x = Math.abs(obj.velocity.x) * borderRestitution;
        obj.position.x = obj.width / 2;
        obj.isColliding = true;
      } else if (isRightCollision) {
        obj.velocity.x = -Math.abs(obj.velocity.x) * borderRestitution;
        obj.position.x = canvasWidth - obj.width / 2;
        obj.isColliding = true;
      }
      if (isLeftPreCollision) { obj.isPreColliding = true; }
      else if (isRightPreCollision) { obj.isPreColliding = true; }

      /* const isTopPreCollision = isPreCollisions && (obj.position.y < obj.width / 2 + this.preCollisionsDistance);
      const isTopCollision = !isPreCollisions && (obj.position.y < obj.width / 2); */
      const isBottomPreCollision = isPreCollisions && (obj.position.y > canvasHeight - obj.width / 2 - this.preCollisionsDistance);
      const isBottomCollision = !isPreCollisions && (obj.position.y > canvasHeight - obj.width / 2);
      /* if (isTopCollision) {
        obj.velocity.y = Math.abs(obj.velocity.y) * borderRestitution;
        obj.position.y = obj.width / 2;
        obj.isColliding = true;
      } else */ if (isBottomCollision) {
        obj.velocity.y = -Math.abs(obj.velocity.y) * borderRestitution;
        obj.position.y = canvasHeight - obj.width / 2;
        obj.isColliding = true;
      }
      /* if (isTopPreCollision) { obj.isPreColliding = true; }
      else */ if (isBottomPreCollision) { obj.isPreColliding = true; }
    }
  }

  public static detectObjectsPreCollisions(objects: GameObject[]) {
    let obj1;
    let obj2;

    // сброс состояний коллизий
    this.throwOffCollisions(objects, true);

    // поиск коллизий
    for (let i = 0; i < objects.length; i++) {
      obj1 = objects[i];
      for (let j = i + 1; j < objects.length; j++) {
        obj2 = objects[j];

        // Compare object1 with object2
        if (this.detectCollision(obj1, obj2, true)) {
          obj1.isPreColliding = true;
          obj2.isPreColliding = true;
        }
      }
    }
  }

  public static handleObjectsCollisions(objects: GameObject[]): void {
    let obj1;
    let obj2;

    // сброс состояний коллизий
    this.throwOffCollisions(objects);

    // поиск коллизий
    for (let i = 0; i < objects.length; i++) {
      obj1 = objects[i];
      for (let j = i + 1; j < objects.length; j++) {
        obj2 = objects[j];

        // Compare object1 with object2
        if (this.detectCollision(obj1, obj2)) {
          obj1.isColliding = true;
          obj2.isColliding = true;

          if (obj1 instanceof Player || obj2 instanceof Player) {
            let breakpoint = 0;
          }

          let vectorBetweenObjects = obj2.position.subtract(obj1.position);
          let unitVector = vectorBetweenObjects.getUnitVector();

          // расталкиваем объекты если между ними образовалось пересечение(иначе слипнутся)
          const contactDepth = vectorBetweenObjects.length - (obj1.width / 2 + obj2.width / 2);
          let pushingDistance;
          if (unitVector.x === 0 && unitVector.y === 0)
            pushingDistance = new Vector((contactDepth / 2) * (16 / 25), (contactDepth / 2) * (9 / 25));
          else
            pushingDistance = new Vector((contactDepth / 2) * unitVector.x, (contactDepth / 2) * unitVector.y);
          if (obj1.isStatic) {
            obj2.position = obj2.position.subtract(pushingDistance.multiplyByNumber(2));
          } else if (obj2.isStatic) {
            obj1.position = obj1.position.sum(pushingDistance.multiplyByNumber(2));
          } else {
            obj1.position = obj1.position.sum(pushingDistance);
            obj2.position = obj2.position.subtract(pushingDistance);
          }

          /* if (obj1 instanceof Enemy && obj2 instanceof Enemy)
              if (!obj1.isActive || !obj2.isActive) {
                  if (obj1.collisionsCount > 10) obj1.isActive = false;
                  else obj1.collisionsCount += 1;

                  if (obj2.collisionsCount > 10) obj2.isActive = false;
                  else obj2.collisionsCount += 1;

                  continue;
              } */
          if (obj1.velocity.length === 0 || obj2.velocity.length === 0) {
            let breakpoint = 0;
          }
          /* const relativeVelocity = obj1.velocity.subtract(obj2.velocity);
          let speed = relativeVelocity.x * unitVector.x + relativeVelocity.y * unitVector.y;
          speed *= Math.min(obj1.restitution, obj2.restitution);
          const impulse = 2 * speed / (obj1.mass + obj2.mass); */

          if (obj1.isStatic && !obj2.isStatic) {
            vectorBetweenObjects = obj2.position.subtract(obj1.position);
            unitVector = vectorBetweenObjects.getUnitVector();
            const relativeVelocity = obj1.velocity.subtract(obj2.velocity);
            let speed = relativeVelocity.x * unitVector.x + relativeVelocity.y * unitVector.y;
            speed *= Math.max(obj1.restitution, obj2.restitution);
            const impulse = 2 * speed / (obj1.mass + obj2.mass);
            obj2.velocity.x += (impulse * obj1.mass * unitVector.x);
            obj2.velocity.y += (impulse * obj1.mass * unitVector.y);
          } else if (!obj1.isStatic && obj2.isStatic) {
            vectorBetweenObjects = obj1.position.subtract(obj2.position);
            unitVector = vectorBetweenObjects.getUnitVector();
            const relativeVelocity = obj2.velocity.subtract(obj1.velocity);
            let speed = relativeVelocity.x * unitVector.x + relativeVelocity.y * unitVector.y;
            speed *= Math.max(obj1.restitution, obj2.restitution);
            const impulse = 2 * speed / (obj1.mass + obj2.mass);
            obj1.velocity.x += (impulse * obj2.mass * unitVector.x);
            obj1.velocity.y += (impulse * obj2.mass * unitVector.y);
          } else {
            vectorBetweenObjects = obj2.position.subtract(obj1.position);
            unitVector = vectorBetweenObjects.getUnitVector();
            const relativeVelocity = obj1.velocity.subtract(obj2.velocity);
            let speed = relativeVelocity.x * unitVector.x + relativeVelocity.y * unitVector.y;
            speed *= Math.min(obj1.restitution, obj2.restitution);
            const impulse = 2 * speed / (obj1.mass + obj2.mass);
            obj1.velocity.x -= (impulse * obj2.mass * unitVector.x);
            obj1.velocity.y -= (impulse * obj2.mass * unitVector.y);
            obj2.velocity.x += (impulse * obj1.mass * unitVector.x);
            obj2.velocity.y += (impulse * obj1.mass * unitVector.y);
          }
        }
      }
    }
  }
}


export default Collisions;
