/* import SliderPart from "./SliderPart";
import Vector from "../../../../Helpers/Vector";
import SliderView from "../SliderView";

class FilledStrip extends SliderPart {
    public countNumber = 0;

    constructor(view: SliderView, countNumber: number) {
        super(view);
        this.countNumber = countNumber;
    }

    public buildDOMElement(): void {
        super.buildDOMElement();

        this.DOMElement.className = `range-slider__filled-strip range-slider__filled-strip_${this.countNumber}`;
        this.view.containerElement.append(this.DOMElement);
    }

    public update(): void {
        const modelData = this.view.viewManager.getModelData();
        const { values } = modelData;
        const {
            handleWidth,
            handleHeight,
            angleInRad,
            sliderStripThickness,
            isHandlesSeparated,
        } = this.view.viewManager.viewData;

        this.rotate();

        let size;
        let position;
        const vectorizedHandleWidth = Vector.calculateVector(handleWidth, angleInRad);
        const shiftCoefficient = (isHandlesSeparated ? this.countNumber : 0);
        const handlesCountShift = Vector.calculateVector(Math.abs(handleWidth * shiftCoefficient - handleWidth / 2), angleInRad);
        const yShift = handleHeight / 2 - sliderStripThickness / 2;
        const firstHandlePosition = this.view.calculateProportionalPixelValue(values[this.countNumber - 1]);
        const lastHandlePosition = this.view.calculateProportionalPixelValue(values[this.countNumber]);
        const vectorizedFirstHandlePosition = Vector.calculateVector(firstHandlePosition, angleInRad);
        const vectorizedLastHandlePosition = Vector.calculateVector(lastHandlePosition, angleInRad);
        if (this.countNumber === 0) { // интервал от начала
            const width = vectorizedLastHandlePosition.sum(handlesCountShift).length;
            size = new Vector(width, sliderStripThickness);
            position = new Vector(0, yShift);
        } else if (this.countNumber === this.view.viewManager.viewData.filledStrips.length - 1) { // интервал от конца
            const maxValueLength = this.view.calculateProportionalPixelValue(modelData.maxValue);
            const vectorizedMaxValueLength = Vector.calculateVector(maxValueLength - handleWidth / 2, angleInRad);
            const width = vectorizedMaxValueLength.subtract(vectorizedFirstHandlePosition).sum(vectorizedHandleWidth).length;
            size = new Vector(width, sliderStripThickness);
            position = vectorizedFirstHandlePosition.sum(handlesCountShift).sum(new Vector(0, yShift));
        } else { // промежуточные интервалы
            let width = vectorizedLastHandlePosition.subtract(vectorizedFirstHandlePosition);
            if (isHandlesSeparated) width = width.sum(vectorizedHandleWidth);
            size = new Vector(width.length, sliderStripThickness);
            position = vectorizedFirstHandlePosition.sum(handlesCountShift).sum(new Vector(0, yShift));
        }
        this.setSize(size);
        this.setPosition(position);
    }

    private rotate(): void {
        const {
            handleWidth,
            angle,
            sliderStripThickness,
        } = this.view.viewManager.viewData;

        const transformOriginX = handleWidth / 2;
        const transformOriginY = sliderStripThickness / 2;
        this.DOMElement.style.transformOrigin = `${transformOriginX}px ${transformOriginY}px`;
        this.DOMElement.style.transform = `rotate(${-angle}deg)`;// минус из-за нестандартного направления обхода функции rotate
    }
}

export default FilledStrip;
 */