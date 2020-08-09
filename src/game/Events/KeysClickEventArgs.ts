import EventArgs from "./EventArgs";

class KeysClickEventArgs extends EventArgs {
    public key: string;

    constructor(key: string) {
        super();
        this.key = key;
    }
}

export default KeysClickEventArgs;
