/* import SliderPart from "./SliderPart";
import Vector from "../../../../Helpers/Vector";

class EmptyStrip extends SliderPart {
    public buildDOMElement(): void {
        super.buildDOMElement();

        this.DOMElement.className = "range-slider__empty-strip";
        this.view.containerElement.append(this.DOMElement);
    }

    public update(): void {
        const {
            sliderLength,
            handleHeight,
            sliderStripThickness,
        } = this.view.viewManager.viewData;

        this.rotate();

        const size = new Vector(sliderLength, sliderStripThickness);
        const position = new Vector(0, handleHeight / 2 - (sliderStripThickness) / 2);
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

export default EmptyStrip;
 */