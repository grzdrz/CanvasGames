import EventArgs from "./EventArgs";
import EventHandler from "./EventHandler";

class Event {
    private handlers: EventHandler[];

    constructor() {
        this.handlers = new Array<EventHandler>();

        this.invoke = this.invoke.bind(this);
        this.subscribe = this.subscribe.bind(this);
    }

    public invoke(args: EventArgs): void {
        this.handlers.forEach((eventHandler) => eventHandler(args));
    }

    public subscribe(handler: EventHandler): void {
        this.handlers.push(handler);
    }
}

export default Event;
