import EventArgs from "./EventArgs";

interface EventHandler {
    (args: EventArgs): void;
}

export default EventHandler;
