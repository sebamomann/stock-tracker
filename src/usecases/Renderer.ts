import {IRenderer} from "../interface/IRenderer";
import events from "events";

export class Renderer extends events.EventEmitter implements IRenderer {
    render(): void {
    }

    reset(): void {
        const wrapper = document.getElementById("wrapper")!;
        wrapper.innerHTML = "";
    }

    // TODO FACTORY PATTERN?
    htmlSpan(classes: string, text: string): any {
        const elem = document.createElement('span');
        elem.className = classes;
        elem.innerText = text;

        return elem;
    }
}
