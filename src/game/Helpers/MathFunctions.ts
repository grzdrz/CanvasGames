import Vector from "./Vector";

class MathFunctions {
    // доп. обработка значения, на случай если шаг дробный для того чтобы убрать лишние дробные значения
    static cutOffJunkValuesFromFraction(value: number, stepSize: number): number {
        // переводим значение шага в строку(попутно проверяя на наличие формата с экспонентой если дробь длинная)
        let stringOfNumber = "";
        if (this.hasEInNumber(stepSize)) {
            stringOfNumber = this.getStringOfNumberWithoutE(stepSize);
        } else stringOfNumber = stepSize.toString();

        // выделяем дробную часть
        const fractionalPart = stringOfNumber.split(".")[1];

        // если дробная часть существует, то округляем значение до длины дробной части шага,
        // тем самым отрезая мусорные значения дроби, которые переодически появляются из-за неточностей при работе js с десятичными числами
        if (fractionalPart) {
            const countOfNumbers: number = fractionalPart.length;
            return Number.parseFloat(value.toFixed(countOfNumbers));
        }
        return value;
    }

    // заменяет строку с числом в формате с экспонентой на строку с числом в обычном формате
    // например "1e-9" -> на выходе получаем "0.000000001"
    // p.s. код стырен со стаковерфлове
    static getStringOfNumberWithoutE(number: number): string {
        const numberParts = number.toString().split(/[eE]/);
        if (numberParts.length === 1) return numberParts[0];

        let z = "";
        const sign = number < 0 ? "-" : "";
        const str = numberParts[0].replace(".", "");
        let mag = Number(numberParts[1]) + 1;

        if (mag < 0) {
            z = `${sign}0.`;
            while (mag) {
                z = `${z}0`;
                mag += 1;
            }
            return z + str.replace(/^\-/, "");
        }
        mag -= str.length;
        while (mag) {
            z = `${z}0`;
            mag -= 1;
        }
        return str + z;
    }

    // проверка на запись очень большого(или маленького) числа через e(например 1e-10)
    static hasEInNumber(number: number): boolean {
        const splitByE: string[] = number.toString().split("e");
        return splitByE.length === 2;
    }

    static getFractionOfNumber(number: number): number {
        const test1 = number.toString().split(".");
        let test12;
        if (test1.length > 1) {
            test12 = `0.${test1[1]}`;
            return Number.parseFloat(test12);
        }
        return 0;
    }

    static calculateEllipseSurfacePointCoordinate(width: number, height: number, angleInRad: number): Vector {
        const t = Math.atan2(width * Math.sin(angleInRad), height * Math.cos(angleInRad));
        const x = width * Math.cos(t);
        const y = height * Math.sin(t);
        return new Vector(x, y);
    }

    static randomInteger(min: number, max: number) {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }
}

export default MathFunctions;
