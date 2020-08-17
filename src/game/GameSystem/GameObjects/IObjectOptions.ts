import Vector from "../../Helpers/Vector";

interface IObjectOptions {
    width?: number,
    height?: number,
    position?: Vector,

    velocity?: Vector,
    mass?: number,
    restitution?: number,

    color?: string,
}

export default IObjectOptions;