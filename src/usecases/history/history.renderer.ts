import {IRenderer} from "../../interface/IRenderer";
import {Renderer} from "../Renderer";
import {History} from "../../models/History";

export class HistoryRenderer extends Renderer implements IRenderer {
    private history: History;

    constructor(history: History) {
        super();

        this.history = history;
    }


    render(): void {
    }
}
