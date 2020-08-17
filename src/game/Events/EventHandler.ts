import EventArgs from "./EventArgs";

interface EventHandler<TData> {
    (args: EventArgs<TData>): void;
}

export default EventHandler;
