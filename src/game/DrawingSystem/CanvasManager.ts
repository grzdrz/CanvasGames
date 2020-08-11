import Vector from "../Helpers/Vector";
import ViewManager from "../ViewSystem/ViewManager";
import IDrawableObject from "../GameSystem/IDrawableObject";
import Player from "../GameSystem/Player";

interface IMouseEventArgs {
    handlerMouseMove: (event: UIEvent) => void,
    handlerMouseUp: (event: UIEvent) => void,
}

class CanvasManager {
    public viewManager: ViewManager;
    public width: number;
    public height: number;

    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;

    constructor(viewManager: ViewManager, element: HTMLElement, width: number, height: number) {
        this.viewManager = viewManager;

        this.canvas = <HTMLCanvasElement>(element);

        this.width = width;
        this.height = height;
        this.canvas.width = width;
        this.canvas.height = height;

        this.context = <CanvasRenderingContext2D>(this.canvas.getContext("2d"));
        /* this.context.canvas.clientWidth 
        this.context.canvas.clientHeight */

        this.setDragAndDropHandlers();
    }

    public drawObject(object: IDrawableObject): void {
        this.context.fillStyle = object.color;
        // this.context.fillRect(object.position.x, object.position.y, object.width, object.height);
        this.context.beginPath();
        this.context.arc(object.position.x, object.position.y, object.width / 2, 0, 2 * Math.PI);
        this.context.fill();
    }

    public clear(): void {
        this.context.fillStyle = "gray";
        this.context.fillRect(0, 0, this.width, this.height);
    }

    private setDragAndDropHandlers(): void {
        this.canvas.ondragstart = () => false;
        this.canvas.addEventListener("mousedown", this.handlerMouseDown.bind(this));
        this.canvas.addEventListener("touchstart", this.handlerMouseDown.bind(this));

        window.addEventListener("keydown", this.handlerKeyDown.bind(this));
        window.addEventListener("keyup", this.handlerKeyUp.bind(this));
    }

    // d&d
    private handlerMouseDown(event: UIEvent): void {
        event.preventDefault();

        let cursorMouseDownPositionX;
        let cursorMouseDownPositionY;
        if (event instanceof TouchEvent) {
            const touchEvent = /* <TouchEvent> */event;
            cursorMouseDownPositionX = touchEvent.changedTouches[0].pageX;
            cursorMouseDownPositionY = touchEvent.changedTouches[0].pageY;
        } else {
            const mouseEvent = <MouseEvent>event;
            cursorMouseDownPositionX = mouseEvent.clientX;
            cursorMouseDownPositionY = mouseEvent.clientY;
        }
        // cursorMouseDownPositionY = (document.documentElement.clientHeight + window.pageYOffset) - cursorMouseDownPositionY;
        cursorMouseDownPositionY = cursorMouseDownPositionY;
        // cursorMouseDownPositionX =;
        const cursorMouseDownPosition = new Vector(cursorMouseDownPositionX, cursorMouseDownPositionY);// место нажатия левой кнопки мыши

        const optionsForMouseEvents = {
            handlerMouseMove: (_event: UIEvent): void => { },
            handlerMouseUp: (_event: UIEvent): void => { },
        };
        const handlerMouseMove = this.handlerMouseMove.bind(this, optionsForMouseEvents);
        optionsForMouseEvents.handlerMouseMove = handlerMouseMove;

        const handlerMouseUp = this.handlerMouseUp.bind(this, optionsForMouseEvents);
        optionsForMouseEvents.handlerMouseUp = handlerMouseUp;// чтобы обработчик mouseMove можно было отписать

        document.addEventListener("mousemove", handlerMouseMove);
        document.addEventListener("mouseup", handlerMouseUp);
        document.addEventListener("touchmove", handlerMouseMove);
        document.addEventListener("touchend", handlerMouseUp);


        this.viewManager.onMouseDown.invoke({ cursorPosition: cursorMouseDownPosition });
    }

    private handlerMouseMove(optionsFromMouseDown: IMouseEventArgs, event: UIEvent): void {
        let mouseGlobalPositionX;
        let mouseGlobalPositionY;
        if (event instanceof TouchEvent) {
            const touchEvent = /* <TouchEvent> */event;
            mouseGlobalPositionX = touchEvent.changedTouches[0].pageX;
            mouseGlobalPositionY = touchEvent.changedTouches[0].pageY;
        } else {
            const mouseEvent = <MouseEvent>event;
            mouseGlobalPositionX = mouseEvent.clientX;
            mouseGlobalPositionY = mouseEvent.clientY;
        }
        // mouseGlobalPositionY = (document.documentElement.clientHeight + window.pageYOffset) - mouseGlobalPositionY;
        mouseGlobalPositionY = mouseGlobalPositionY;
        // mouseGlobalPositionX =;
        const mouseGlobalPosition = new Vector(mouseGlobalPositionX, mouseGlobalPositionY);// место нажатия левой кнопки мыши


        this.viewManager.onMouseMove.invoke({ cursorPosition: mouseGlobalPosition });
    }

    private handlerMouseUp(optionsFromMouseDown: IMouseEventArgs, _event: UIEvent): void {
        document.removeEventListener("mousemove", optionsFromMouseDown.handlerMouseMove);
        document.removeEventListener("mouseup", optionsFromMouseDown.handlerMouseUp);
        document.removeEventListener("touchmove", optionsFromMouseDown.handlerMouseMove);
        document.removeEventListener("touchend", optionsFromMouseDown.handlerMouseUp);

        this.viewManager.onMouseUp.invoke({});
    }

    private handlerKeyDown = (event: KeyboardEvent) => {
        /* event.preventDefault(); */

        this.viewManager.onKeyDown.invoke({ key: event.code });
    }

    private handlerKeyUp = (event: KeyboardEvent) => {
        /* event.preventDefault(); */

        this.viewManager.onKeyUp.invoke({ key: event.code });
    }
}

export default CanvasManager;