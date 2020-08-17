/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import EventArgs from "./EventArgs";
import EventHandler from "./EventHandler";

class Event<TData> {
    private handlers = new Array<EventHandler<TData>>();

    public invoke = (args: EventArgs<TData>) => {
        this.handlers.forEach((eventHandler) => eventHandler(args));
    };

    public subscribe = (handler: EventHandler<TData>) => {
        this.handlers.push(handler);
    };
}
export default Event;
