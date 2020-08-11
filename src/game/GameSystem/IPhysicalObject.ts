import Vector from "../Helpers/Vector";

interface IPhysicalObject {
    position: Vector;
    width: number;
    height: number;

    velocity: Vector;
    isColliding: boolean;
}

export default IPhysicalObject;