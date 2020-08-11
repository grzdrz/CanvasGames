/* eslint-disable no-underscore-dangle */
class Vector {
    private _x = 0;

    private _y = 0;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    get width(): number {
        return this._x;
    }

    set width(value: number) {
        this._x = value;
    }

    get height(): number {
        return this._y;
    }

    set height(value: number) {
        this._y = value;
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    static get zero(): Vector {
        return new Vector(0, 0);
    }

    sum(vector: Vector): Vector {
        return new Vector(this._x + vector.x, this._y + vector.y);
    }

    sumNumber(number: number): Vector {
        return new Vector(this._x + number, this._y + number);
    }

    subtract(vector: Vector): Vector {
        return new Vector(this._x - vector.x, this._y - vector.y);
    }

    public multiplyByNumber(number: number): Vector {
        return new Vector(this._x * number, this._y * number);
    }

    public calculateScalarProduct(vector: Vector): number {
        return this._x * vector.x + this._y * vector.y;
    }

    // считает длину проекции текущего вектора на целевой вектор
    public calculateVectorProjectionOnTargetVector(targetVector: Vector): number {
        return this.calculateScalarProduct(targetVector) / targetVector.length;
    }

    get length(): number {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }

    public static calculateVector(length: number, angle: number): Vector {
        const cos = Number.parseFloat(Math.cos(angle).toFixed(6));
        const sin = Number.parseFloat(Math.sin(angle).toFixed(6));
        return new Vector(length * cos, length * sin);
    }

    public rotateVector(angleInRad: number): Vector {
        const newX = this._x * Math.cos(angleInRad) - this._y * Math.sin(angleInRad);
        const newY = this._x * Math.sin(angleInRad) + this._y * Math.cos(angleInRad);
        return new Vector(newX, newY);
    }

    public getUnitVector(): Vector {
        if (this.length === 0) return Vector.zero;
        return new Vector(this._x / this.length, this._y / this.length);
    }
}

export default Vector;
