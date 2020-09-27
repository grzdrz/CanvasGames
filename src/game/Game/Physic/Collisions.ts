import Vector from "../../Helpers/Vector";
import GameObject from "../GameObjects/GameObject";
import Enemy from "../GameObjects/Enemy";
import Player from "../GameObjects/Player";
import Event from "../../Events/Event";
import ICollisionData from "./ICollisionData";
import EventArgs from "../../Events/EventArgs";
import ViewManager from "../../ViewSystem/ViewManager";
import Bullet from "../GameObjects/Bullet";
import EnemiesPart from "../GameObjects/EnemiesPart";

const borderRestitution = 0.5;

class Collisions {
  public viewManager: ViewManager;

  public onCollisionDetected = new Event<ICollisionData>();
  public onPreCollisionDetected = new Event<ICollisionData>();

  public preCollisionsDistance = 30;

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

        if ((object1 instanceof Bullet && object2 instanceof Player) ||
          (object2 instanceof Bullet && object1 instanceof Player))
          continue;

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
          this.detectCollisionWithEnemy(object1, object2);

          this.onCollisionDetected.invoke(new EventArgs<ICollisionData>({
            object1: object1,
            object2: object2,
          }));
        }
      }

      const canvas = this.viewManager.canvasManager;
      this.detectCollisionWithBorders(object1, canvas.width, canvas.height)
    }
  }

  private throwOffCollisions(objects: GameObject[]): void {
    // сброс состояний коллизий
    for (let i = 0; i < objects.length; i++) {
      objects[i].isPreColliding = false;
      objects[i].isColliding = false;
      objects[i].isCollideWithEnemy = false;
      objects[i].isCollideWithBorder = false;
    }
  }

  private detectCollision(object1: GameObject, object2: GameObject, isPreCollisions = false): boolean {
    if (object1.layerLevel !== object2.layerLevel) return false;
    const vectorBetweenObjects = object2.position.subtract(object1.position);
    let sumOfHalfWidth = object1.size.width / 2 + object2.size.width / 2;
    let sumOfHalfHeight = object1.size.height / 2 + object2.size.height / 2;
    const result = Math.abs(vectorBetweenObjects.width) < sumOfHalfWidth && Math.abs(vectorBetweenObjects.height) < sumOfHalfHeight;
    return result;
  }

  private detectCollisionWithEnemy(object1: GameObject, object2: GameObject) {
    const isCollidePlayerWithEnemy = object1 instanceof Player && object2 instanceof Enemy && !object2.isStatic;
    const isCollideEnemyWithPlayer = object2 instanceof Player && object1 instanceof Enemy && !object2.isStatic;
    const isCollideWithPlayer = isCollidePlayerWithEnemy || isCollideEnemyWithPlayer;
    if (isCollideWithPlayer) {
      object1.isCollideWithEnemy = true;
      object2.isCollideWithEnemy = true;
    }

    const isCollideBulletWithEnemy = object1 instanceof Bullet && object2 instanceof Enemy && !object2.isStatic;
    const isCollideEnemyWithBullet = object2 instanceof Bullet && object1 instanceof Enemy && !object2.isStatic;
    const isCollideBulletWithEnemiesPart = object1 instanceof Bullet && object2 instanceof EnemiesPart && !object2.isStatic;
    const isCollideEnemiesPartWithBullet = object2 instanceof Bullet && object1 instanceof EnemiesPart && !object2.isStatic;
    const isCollideWithBullet = isCollideBulletWithEnemy || isCollideEnemyWithBullet || isCollideBulletWithEnemiesPart || isCollideEnemiesPartWithBullet;
    if (isCollideWithBullet) {
      object1.isCollideWithEnemy = true;
      object2.isCollideWithEnemy = true;
    }

    const isCollideBulletWithBullet = object1 instanceof Bullet && object2 instanceof Bullet && !object2.isStatic;
    if (isCollideBulletWithBullet) {
      object1.isCollideWithEnemy = true;
      object2.isCollideWithEnemy = true;
    }
  }

  private detectCollisionWithBorders(obj: GameObject, canvasWidth: number, canvasHeight: number) {
    const isLeftPreCollision = (obj.position.x < obj.size.width / 2 + this.preCollisionsDistance);
    const isLeftCollision = (obj.position.x < obj.size.width / 2);
    const isRightPreCollision = (obj.position.x > canvasWidth - obj.size.width / 2 - this.preCollisionsDistance);
    const isRightCollision = (obj.position.x > canvasWidth - obj.size.width / 2);
    if (isLeftCollision) {
      obj.velocity.x = Math.abs(obj.velocity.x) * borderRestitution;
      obj.position.x = obj.size.width / 2;
      obj.isColliding = true;
      obj.isCollideWithBorder = true;
    } else if (isRightCollision) {
      obj.velocity.x = -Math.abs(obj.velocity.x) * borderRestitution;
      obj.position.x = canvasWidth - obj.size.width / 2;
      obj.isColliding = true;
      obj.isCollideWithBorder = true;
    }
    if (isLeftPreCollision) {
      obj.isPreColliding = true;
    }
    else if (isRightPreCollision) {
      obj.isPreColliding = true;
    }

    const isBottomPreCollision = (obj.position.y > canvasHeight - obj.size.width / 2 - this.preCollisionsDistance);
    const isBottomCollision = (obj.position.y > canvasHeight - obj.size.width / 2);
    if (isBottomCollision) {
      obj.velocity.y = -Math.abs(obj.velocity.y) * borderRestitution;
      obj.position.y = canvasHeight - obj.size.width / 2;
      obj.isColliding = true;
      obj.isCollideWithBorder = true;
    } if (isBottomPreCollision) { obj.isPreColliding = true; }
  }

  private findIntersection(object1: GameObject, object2: GameObject) {// считаем что они пересекаются
    // верхняя левая координата
    const object1_x1 = object1.position.x - object1.size.width / 2;
    const object1_y1 = object1.position.y - object1.size.height / 2;
    // нижняя правая
    const object1_x2 = object1.position.x + object1.size.width / 2;
    const object1_y2 = object1.position.y + object1.size.height / 2;

    // --//--
    const object2_x1 = object2.position.x - object2.size.width / 2;
    const object2_y1 = object2.position.y - object2.size.height / 2;
    const object2_x2 = object2.position.x + object2.size.width / 2;
    const object2_y2 = object2.position.y + object2.size.height / 2;

    const left = Math.max(object1_x1, object2_x1);
    const top = Math.min(object1_y2, object2_y2);
    const right = Math.min(object1_x2, object2_x2);
    const bottom = Math.max(object1_y1, object2_y1);

    const width = right - left;
    const height = top - bottom;

    if (width < 0 || height < 0)
      return Vector.zero;

    return new Vector(width, height);
  }

  private handleSeparateObjects = (args: EventArgs<ICollisionData>) => {// расталкивает объекты если между ними образовалось пересечение(иначе слипнутся)
    const { object1, object2 } = args.data;

    const intersection = this.findIntersection(object1, object2);
    if (intersection.width === 0 && intersection.height === 0) return;

    const vectorBetweenObjects = object2.position.subtract(object1.position);
    const unitVector = vectorBetweenObjects.getUnitVector();

    let shiftLength;
    let normal;
    if (intersection.y <= intersection.x) {
      shiftLength = intersection.y;
      normal = unitVector.y > 0 ? new Vector(0, 1) : new Vector(0, -1);
    } else {
      shiftLength = intersection.x;
      normal = unitVector.x > 0 ? new Vector(1, 0) : new Vector(-1, 0);
    }
    shiftLength += 1; // доп. расталкивание
    const shift = normal.multiplyByNumber(shiftLength);

    if (object1.isStatic) {
      object2.position = object2.position.sum(shift);
    } else if (object2.isStatic) {
      object1.position = object1.position.subtract(shift);
    } else {
      object1.position = object1.position.subtract(shift.multiplyByNumber(0.5));
      object2.position = object2.position.sum(shift.multiplyByNumber(0.5));
    }
  }

  private handleObjectsImpact = (args: EventArgs<ICollisionData>) => {
    const { object1, object2 } = args.data;

    if (object1.isStatic && !object2.isStatic) {
      this.calculateImpactWithStaticObject(object1, object2);
    } else if (!object1.isStatic && object2.isStatic) {
      this.calculateImpactWithStaticObject(object2, object1);
    } else {
      this.calculateDinamicObjectsImpact(object1, object2);
    }
  }

  private calculateImpactWithStaticObject(staticObj: GameObject, dinamicObj: GameObject) {
    /* const vectorBetweenObjects = dinamicObj.position.subtract(staticObj.position);
    const unitVector = vectorBetweenObjects.getUnitVector();
    const relativeVelocity = staticObj.velocity.subtract(dinamicObj.velocity);
    let speed = relativeVelocity.x * unitVector.x + relativeVelocity.y * unitVector.y;
    speed *= Math.max(staticObj.restitution, dinamicObj.restitution);
    const impulse = 2 * speed / (staticObj.mass + dinamicObj.mass);
    dinamicObj.velocity.x += (impulse * staticObj.mass * unitVector.x);
    dinamicObj.velocity.y += (impulse * staticObj.mass * unitVector.y); */

    dinamicObj.velocity.x *= 0.3;
    dinamicObj.velocity.y *= 0.3;
  }

  private calculateDinamicObjectsImpact(object1: GameObject, object2: GameObject) {
    /* const vectorBetweenObjects = object2.position.subtract(object1.position);
    const unitVector = vectorBetweenObjects.getUnitVector();
    const relativeVelocity = object1.velocity.subtract(object2.velocity);
    let speed = relativeVelocity.x * unitVector.x + relativeVelocity.y * unitVector.y;
    speed *= Math.min(object1.restitution, object2.restitution);
    const impulse = 2 * speed / (object1.mass + object2.mass);
    object1.velocity.x -= (impulse * object2.mass * unitVector.x);
    object1.velocity.y -= (impulse * object2.mass * unitVector.y);
    object2.velocity.x += (impulse * object1.mass * unitVector.x);
    object2.velocity.y += (impulse * object1.mass * unitVector.y); */

    object1.velocity.x *= 0.3;
    object1.velocity.y *= 0.3;
    object2.velocity.x *= 0.3;
    object2.velocity.y *= 0.3;
  }
}

export default Collisions;
