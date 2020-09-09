import Vector from "../Helpers/Vector";
import GameObject from "./GameObjects/GameObject";
import Enemy from "./GameObjects/Enemy";
import Player from "./GameObjects/Player";
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
    this.onCollisionDetected.subscribe(this.handleSeparateObjects);
    this.onCollisionDetected.subscribe(this.handleObjectsImpact);
  }

  public unloadContent() {
    this.onCollisionDetected.unsubscribe(this.handleSeparateObjects);
    this.onCollisionDetected.unsubscribe(this.handleObjectsImpact);
  }

  public detectCollision(object1: GameObject, object2: GameObject, isPreCollisions = false): boolean {
    if (object1.layerLevel !== object2.layerLevel) return false;
    const vectorBetweenObjects = object2.position.subtract(object1.position);
    let sumOfRadiusesOfObjects = object1.size.width / 2 + object2.size.width / 2;
    const length = vectorBetweenObjects.length;
    sumOfRadiusesOfObjects = (isPreCollisions ? sumOfRadiusesOfObjects + this.preCollisionsDistance : sumOfRadiusesOfObjects);
    return (length <= sumOfRadiusesOfObjects);
  }

  public detectCollisionOfPlayerAndEnemy(object1: GameObject, object2: GameObject) {
    if (object1 instanceof Player && object2 instanceof Enemy && !object2.isStatic) {
      object1.isCollideWithEnemy = true;
    }
    else if (object2 instanceof Player && object1 instanceof Enemy && !object1.isStatic) {
      object2.isCollideWithEnemy = true;
    }
  }

  public throwOffCollisions(objects: GameObject[]): void {
    // сброс состояний коллизий
    for (let i = 0; i < objects.length; i++) {
      objects[i].isPreColliding = false;
      objects[i].isColliding = false;
      if ((<Player>objects[i])) (<Player>objects[i]).isCollideWithEnemy = false;
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

        // поиск потенциальных коллизий
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

          //поиск коллизии игрока с врагом
          this.detectCollisionOfPlayerAndEnemy(object1, object2);

          this.onCollisionDetected.invoke(new EventArgs<ICollisionData>({
            object1: object1,
            object2: object2,
          }));
        }
      }

      const canvas = this.viewManager.canvasManager;
      this.findCollisionWithBorders(object1, canvas.width, canvas.height)
    }
  }

  public findCollisionWithBorders(obj: GameObject, canvasWidth: number, canvasHeight: number) {
    const isLeftPreCollision = (obj.position.x < obj.size.width / 2 + this.preCollisionsDistance);
    const isLeftCollision = (obj.position.x < obj.size.width / 2);
    const isRightPreCollision = (obj.position.x > canvasWidth - obj.size.width / 2 - this.preCollisionsDistance);
    const isRightCollision = (obj.position.x > canvasWidth - obj.size.width / 2);
    if (isLeftCollision) {
      obj.velocity.x = Math.abs(obj.velocity.x) * borderRestitution;
      obj.position.x = obj.size.width / 2;
      obj.isColliding = true;
    } else if (isRightCollision) {
      obj.velocity.x = -Math.abs(obj.velocity.x) * borderRestitution;
      obj.position.x = canvasWidth - obj.size.width / 2;
      obj.isColliding = true;
    }
    if (isLeftPreCollision) { obj.isPreColliding = true; }
    else if (isRightPreCollision) { obj.isPreColliding = true; }


    const isBottomPreCollision = (obj.position.y > canvasHeight - obj.size.width / 2 - this.preCollisionsDistance);
    const isBottomCollision = (obj.position.y > canvasHeight - obj.size.width / 2);
    if (isBottomCollision) {
      obj.velocity.y = -Math.abs(obj.velocity.y) * borderRestitution;
      obj.position.y = canvasHeight - obj.size.width / 2;
      obj.isColliding = true;
    } if (isBottomPreCollision) { obj.isPreColliding = true; }
  }

  public handleSeparateObjects = (args: EventArgs<ICollisionData>) => {// расталкивает объекты если между ними образовалось пересечение(иначе слипнутся)
    const { object1, object2 } = args.data;

    let vectorBetweenObjects = object2.position.subtract(object1.position);
    let unitVector = vectorBetweenObjects.getUnitVector();

    const contactDepth = vectorBetweenObjects.length - (object1.size.width / 2 + object2.size.width / 2);
    let pushingDistance;
    if (unitVector.x === 0 && unitVector.y === 0)
      pushingDistance = new Vector((contactDepth / 2) * (16 / 25), (contactDepth / 2) * (9 / 25));
    else
      pushingDistance = new Vector((contactDepth / 2) * unitVector.x, (contactDepth / 2) * unitVector.y);
    if (object1.isStatic) {
      object2.position = object2.position.subtract(pushingDistance.multiplyByNumber(2));
    } else if (object2.isStatic) {
      object1.position = object1.position.sum(pushingDistance.multiplyByNumber(2));
    } else {
      object1.position = object1.position.sum(pushingDistance);
      object2.position = object2.position.subtract(pushingDistance);
    }
  }

  public handleObjectsImpact = (args: EventArgs<ICollisionData>) => {
    const { object1, object2 } = args.data;

    if (object1.isStatic && !object2.isStatic) {
      this.calculateImpactWithStaticObject(object1, object2);
    } else if (!object1.isStatic && object2.isStatic) {
      this.calculateImpactWithStaticObject(object2, object1);
    } else {
      this.calculateDinamicObjectsImpact(object1, object2);
    }
  }

  public calculateImpactWithStaticObject(staticObj: GameObject, dinamicObj: GameObject) {
    const vectorBetweenObjects = dinamicObj.position.subtract(staticObj.position);
    const unitVector = vectorBetweenObjects.getUnitVector();
    const relativeVelocity = staticObj.velocity.subtract(dinamicObj.velocity);
    let speed = relativeVelocity.x * unitVector.x + relativeVelocity.y * unitVector.y;
    speed *= Math.max(staticObj.restitution, dinamicObj.restitution);
    const impulse = 2 * speed / (staticObj.mass + dinamicObj.mass);
    dinamicObj.velocity.x += (impulse * staticObj.mass * unitVector.x);
    dinamicObj.velocity.y += (impulse * staticObj.mass * unitVector.y);
  }

  public calculateDinamicObjectsImpact(object1: GameObject, object2: GameObject) {
    const vectorBetweenObjects = object2.position.subtract(object1.position);
    const unitVector = vectorBetweenObjects.getUnitVector();
    const relativeVelocity = object1.velocity.subtract(object2.velocity);
    let speed = relativeVelocity.x * unitVector.x + relativeVelocity.y * unitVector.y;
    speed *= Math.min(object1.restitution, object2.restitution);
    const impulse = 2 * speed / (object1.mass + object2.mass);
    object1.velocity.x -= (impulse * object2.mass * unitVector.x);
    object1.velocity.y -= (impulse * object2.mass * unitVector.y);
    object2.velocity.x += (impulse * object1.mass * unitVector.x);
    object2.velocity.y += (impulse * object1.mass * unitVector.y);
  }
}

export default Collisions;
