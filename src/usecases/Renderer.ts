import {IRenderer} from "../interface/IRenderer";

export class Renderer implements IRenderer {
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
