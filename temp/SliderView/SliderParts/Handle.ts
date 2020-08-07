/* import SliderPart from "./SliderPart";
import Vector from "../../../../Helpers/Vector";
import SliderView from "../SliderView";
import View from "../../View";

interface IMouseEventArgs {
    handlerMouseMove: (event: UIEvent) => void,
    handlerMouseUp: (event: UIEvent) => void,
    mousePositionInsideTargetSlider: Vector,
}

class Handle extends SliderPart {
    public countNumber: number;

    public backgroundDOMElement: HTMLElement;

    constructor(view: SliderView, countNumber: number) {
        super(view);

        this.backgroundDOMElement = document.createElement("div");
        this.countNumber = countNumber;

        this.handlerMouseDown = this.handlerMouseDown.bind(this);
    }

    public buildDOMElement(): void {
        super.buildDOMElement();

        const { handleWidth, handleHeight } = this.view.viewManager.viewData;

        this.DOMElement.className = `range-slider__handle range-slider__handle_${this.countNumber}`;
        this.DOMElement.dataset.sliderCountNumber = this.countNumber.toString();
        this.DOMElement.style.width = `${handleWidth}px`;
        this.DOMElement.style.height = `${handleHeight}px`;
        this.view.containerElement.append(this.DOMElement);

        this.backgroundDOMElement.innerHTML = "";
        this.backgroundDOMElement.className = `range-slider__handle-background range-slider__handle-background_${this.countNumber}`;
        this.backgroundDOMElement.dataset.sliderCountNumber = this.countNumber.toString();
        this.view.containerElement.append(this.backgroundDOMElement);

        this.setDragAndDropHandlers();
    }

    public update(): void {
        const modelData = this.view.viewManager.getModelData();
        const { values } = modelData;
        const { handleWidth, angleInRad, isHandlesSeparated } = this.view.viewManager.viewData;

        const shiftCoefficient = (isHandlesSeparated ? this.countNumber : 0);
        const handlesCountShift = Vector.calculateVector(Math.abs(handleWidth * shiftCoefficient), angleInRad);
        const handlePosition = this.view.calculateProportionalPixelValue(values[this.countNumber]);

        const vectorizedHandlePosition = Vector.calculateVector(handlePosition, angleInRad).sum(handlesCountShift);

        this.setPosition(vectorizedHandlePosition);
        this.rotate();

        this.renderBackground(vectorizedHandlePosition);
    }

    private setDragAndDropHandlers(): void {
        this.DOMElement.ondragstart = () => false;
        this.DOMElement.addEventListener("mousedown", this.handlerMouseDown);
        this.DOMElement.addEventListener("touchstart", this.handlerMouseDown);
        // eslint-disable-next-line fsd/no-function-declaration-in-event-listener
        this.backgroundDOMElement.addEventListener("mousedown", (event: UIEvent) => {
            this.handlerMouseDown(event);
        });
        // eslint-disable-next-line fsd/no-function-declaration-in-event-listener
        this.backgroundDOMElement.addEventListener("touchstart", (event: UIEvent) => {
            this.handlerMouseDown(event);
        });
    }

    private rotate(): void {
        const { handleWidth, angle } = this.view.viewManager.viewData;

        const transformOriginX = handleWidth / 2;
        const transformOriginY = handleWidth / 2;
        this.DOMElement.style.transformOrigin = `${transformOriginX}px ${transformOriginY}px`;
        this.DOMElement.style.transform = `rotate(${-angle}deg)`;
    }

    private renderBackground(position: Vector): void {
        const {
            handleWidth,
            handleHeight,
            angle,
            borderThickness,
        } = this.view.viewManager.viewData;

        const vectorizedHandleSize = new Vector(handleWidth, handleHeight);

        const backgroundSize = new Vector(borderThickness, borderThickness).multiplyByNumber(2).sum(vectorizedHandleSize);
        const backgroundPosition = new Vector(position.x, position.y).sumNumber(-borderThickness);

        const transformOrigin = backgroundSize.multiplyByNumber(0.5);
        this.backgroundDOMElement.style.transformOrigin = `${transformOrigin.x}px ${transformOrigin.y}px`;
        this.backgroundDOMElement.style.transform = `rotate(${-angle}deg)`;

        View.renderPosition(this.backgroundDOMElement, backgroundPosition);
        View.renderSize(this.backgroundDOMElement, backgroundSize);
    }

    // d&d
    private handlerMouseDown(event: UIEvent): void {
        event.preventDefault();

        let cursorMouseDownPositionX;
        let cursorMouseDownPositionY;
        if (event instanceof TouchEvent) {
            const touchEvent = event;
            cursorMouseDownPositionX = touchEvent.changedTouches[0].pageX;
            cursorMouseDownPositionY = touchEvent.changedTouches[0].pageY;
        } else {
            const mouseEvent = <MouseEvent>event;
            cursorMouseDownPositionX = mouseEvent.clientX;
            cursorMouseDownPositionY = mouseEvent.clientY;
        }
        cursorMouseDownPositionY = (document.documentElement.clientHeight + window.pageYOffset) - cursorMouseDownPositionY;
        // cursorMouseDownPositionX =;
        const cursorMouseDownPosition = new Vector(cursorMouseDownPositionX, cursorMouseDownPositionY);// место нажатия левой кнопки мыши
        const mousePositionInsideTargetSlider = this.calculateCursorPositionInsideTargetHandle(cursorMouseDownPosition);

        const optionsForMouseEvents = {
            handlerMouseMove: (_event: UIEvent): void => { },
            handlerMouseUp: (_event: UIEvent): void => { },
            mousePositionInsideTargetSlider,
        };
        const handlerMouseMove = this.handlerMouseMove.bind(this, optionsForMouseEvents);
        optionsForMouseEvents.handlerMouseMove = handlerMouseMove;

        const handlerMouseUp = this.handlerMouseUp.bind(this, optionsForMouseEvents);
        optionsForMouseEvents.handlerMouseUp = handlerMouseUp;// чтобы обработчик mouseMove можно было отписать

        document.addEventListener("mousemove", handlerMouseMove);
        document.addEventListener("mouseup", handlerMouseUp);
        document.addEventListener("touchmove", handlerMouseMove);
        document.addEventListener("touchend", handlerMouseUp);

        this.view.viewManager.onMouseDown.invoke({});
    }

    private handlerMouseMove(optionsFromMouseDown: IMouseEventArgs, event: UIEvent): void {
        const {
            mousePositionInsideTargetSlider,
        } = optionsFromMouseDown;

        let mouseGlobalPositionX;
        let mouseGlobalPositionY;
        if (event instanceof TouchEvent) {
            const touchEvent = event;
            mouseGlobalPositionX = touchEvent.changedTouches[0].pageX;
            mouseGlobalPositionY = touchEvent.changedTouches[0].pageY;
        } else {
            const mouseEvent = <MouseEvent>event;
            mouseGlobalPositionX = mouseEvent.clientX;
            mouseGlobalPositionY = mouseEvent.clientY;
        }
        mouseGlobalPositionY = (document.documentElement.clientHeight + window.pageYOffset) - mouseGlobalPositionY;
        // mouseGlobalPositionX =;
        const mouseGlobalPosition = new Vector(mouseGlobalPositionX, mouseGlobalPositionY);// место нажатия левой кнопки мыши
        const cursorPositionInContainer = this.calculateCursorPositionInContainer(mouseGlobalPosition, mousePositionInsideTargetSlider);

        this.view.calculateProportionalValue(cursorPositionInContainer, this.countNumber);

        this.view.viewManager.onMouseMove.invoke({});
    }

    private handlerMouseUp(optionsFromMouseDown: IMouseEventArgs, _event: UIEvent): void {
        document.removeEventListener("mousemove", optionsFromMouseDown.handlerMouseMove);
        document.removeEventListener("mouseup", optionsFromMouseDown.handlerMouseUp);
        document.removeEventListener("touchmove", optionsFromMouseDown.handlerMouseMove);
        document.removeEventListener("touchend", optionsFromMouseDown.handlerMouseUp);

        this.view.viewManager.onMouseUp.invoke({});
    }

    private calculateCursorPositionInContainer(mouseGlobalPosition: Vector, mousePositionInsideTargetSlider: Vector): Vector {
        const containerBoundingRect = this.view.containerElement.getBoundingClientRect();
        const containerCoord = new Vector(
            containerBoundingRect.x,
            (document.documentElement.clientHeight + window.pageYOffset) - (containerBoundingRect.y + containerBoundingRect.height),
        );

        return mouseGlobalPosition.subtract(containerCoord).subtract(mousePositionInsideTargetSlider);
    }

    private calculateCursorPositionInsideTargetHandle(cursorMouseDownPosition: Vector): Vector {
        const { handleHeight } = this.view.viewManager.viewData;

        const targetSliderBoundingCoords = this.DOMElement.getBoundingClientRect();
        const mousePositionInsideTargetSliderX = cursorMouseDownPosition.x - targetSliderBoundingCoords.x;
        const mousePositionInsideTargetSliderY = cursorMouseDownPosition.y - (document.documentElement.clientHeight + window.pageYOffset - targetSliderBoundingCoords.y - handleHeight);
        return new Vector(mousePositionInsideTargetSliderX, mousePositionInsideTargetSliderY);
    }
}

export default Handle;
 */