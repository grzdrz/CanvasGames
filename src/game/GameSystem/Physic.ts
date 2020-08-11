import Vector from "../Helpers/Vector";
import Player from "./Player";
import IPhysicalObject from "./IPhysicalObject";

class Physic {
    public static calculateCollizionVelocity(obj1: IPhysicalObject, obj2: IPhysicalObject) {
        const vectorBetweenObjects = obj2.position.subtract(obj1.position);
        const unitVector = vectorBetweenObjects.getUnitVector();

        const relativeVelocity = obj1.velocity.subtract(obj2.velocity);
        const speed = relativeVelocity.x * unitVector.x + relativeVelocity.y * unitVector.y;

        obj1.velocity.x -= (speed * unitVector.x);
        obj1.velocity.y -= (speed * unitVector.y);
        obj2.velocity.x += (speed * unitVector.x);
        obj2.velocity.y += (speed * unitVector.y);
    }

    public static detectCollision(obj1: IPhysicalObject, obj2: IPhysicalObject): boolean {
        const vectorBetweenObjects = obj2.position.subtract(obj1.position);
        const sumOfRadiusesOfObjects = obj1.width / 2 + obj2.width / 2;
        return (vectorBetweenObjects.length <= sumOfRadiusesOfObjects);
    }

    public static analyzeCollisions(objects: IPhysicalObject[]): void {
        let obj1;
        let obj2;

        // сброс состояний коллизий
        for (let i = 0; i < objects.length; i++) {
            objects[i].isColliding = false;
        }

        // поиск коллизий
        for (let i = 0; i < objects.length; i++) {
            obj1 = objects[i];
            for (let j = i + 1; j < objects.length; j++) {
                obj2 = objects[j];

                // Compare object1 with object2
                if (Physic.detectCollision(obj1, obj2)) {
                    obj1.isColliding = true;
                    obj2.isColliding = true;

                    Physic.calculateCollizionVelocity(obj1, obj2);
                }
            }
        }
    }
}

export default Physic;
