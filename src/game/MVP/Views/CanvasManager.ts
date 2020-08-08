class CanvasManager {
    public element: HTMLElement;
    public width: number;
    public height: number;

    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;

    constructor(element: HTMLElement, width: number, height: number) {
        this.element = element;
        this.width = width;
        this.height = height;

        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;

        this.canvas = <HTMLCanvasElement>(this.element);

        this.context = <CanvasRenderingContext2D>(this.canvas.getContext("2d"));
        this.context.lineCap = "round";
        this.context.lineJoin = "round";
        this.context.strokeStyle = "black";
        this.context.lineWidth = 1;
    }

    public clear(): void {
        this.context.fillStyle = "gray";
        this.context.fillRect(0, 0, this.width, this.height);
    }
}

export default CanvasManager;