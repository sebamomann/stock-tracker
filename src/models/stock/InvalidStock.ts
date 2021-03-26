import {Stock} from "./Stock";

export class InvalidStock extends Stock {
    constructor() {
        super("invalid", "invalid", 0, {} as any);
    }
}
