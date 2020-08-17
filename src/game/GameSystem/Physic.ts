import Vector from "../Helpers/Vector";
import GameObject from "./GameObjects/GameObject";

const borderRestitution = 0.9;

class Physic {
    public static detectCollision(obj1: GameObject, obj2: GameObject): boolean {
        const vectorBetweenObjects = obj2.position.subtract(obj1.position);
        const sumOfRadiusesOfObjects = obj1.width / 2 + obj2.width / 2;
        return (vectorBetweenObjects.length <= sumOfRadiusesOfObjects);
    }

    public static analyzeCollisions(objects: GameObject[]): void {
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

                    const vectorBetweenObjects = obj2.position.subtract(obj1.position);
                    const unitVector = vectorBetweenObjects.getUnitVector();

                    // расталкиваем объекты если между ними образовалось пересечение(иначе слипнутся)
                    const contactDepth = vectorBetweenObjects.length - (obj1.width / 2 + obj2.width / 2);
                    let pushingDistance;
                    if (unitVector.x === 0 && unitVector.y === 0)
                        pushingDistance = new Vector((contactDepth / 2) * (16 / 25), (contactDepth / 2) * (9 / 25));
                    else
                        pushingDistance = new Vector((contactDepth / 2) * unitVector.x, (contactDepth / 2) * unitVector.y);
                    obj1.position = obj1.position.sum(pushingDistance);
                    obj2.position = obj2.position.subtract(pushingDistance);

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

    public static detectEdgeCollisions(gameObjects: GameObject[], canvasWidth: number, canvasHeight: number) {
        let obj;
        for (let i = 0; i < gameObjects.length; i++) {
            obj = gameObjects[i];

            // Check for left and right
            if (obj.position.x < obj.width / 2) {
                obj.velocity.x = Math.abs(obj.velocity.x) * borderRestitution;
                obj.position.x = obj.width / 2;
            } else if (obj.position.x > canvasWidth - obj.width / 2) {
                obj.velocity.x = -Math.abs(obj.velocity.x) * borderRestitution;
                obj.position.x = canvasWidth - obj.width / 2;
            }

            // Check for bottom and top
            if (obj.position.y < obj.width / 2) {
                obj.velocity.y = Math.abs(obj.velocity.y) * borderRestitution;
                obj.position.y = obj.width / 2;
            } else if (obj.position.y > canvasHeight - obj.width / 2) {
                obj.velocity.y = -Math.abs(obj.velocity.y) * borderRestitution;
                obj.position.y = canvasHeight - obj.width / 2;
            }
        }
    }
}

export default Physic;
