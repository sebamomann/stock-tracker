import {IRenderer} from "../interface/IRenderer";
import events from "events";

export class Renderer extends events.EventEmitter implements IRenderer {
    render(): void {
    }

    reset(): void {
        const wrapper = document.getElementById("wrapper")!;
        wrapper.innerHTML = "";
    }

    htmlSpan(classes: string, text: string): any {
        const elem = document.createElement('span');
        elem.className = classes;
        elem.innerText = text;

        return elem;
    }

    htmlDiv(classes: string): any {
        const elem = document.createElement('div');
        elem.className = classes;

        return elem;
    }

    htmlImg(classes: string, src: string): any {
        const elem = document.createElement('img');
        elem.className = classes;
        elem.src = src;

        return elem;
    }

    htmlLink(classes: string, text: string, url: string): any {
        const elem = document.createElement('a');
        elem.className = classes;
        elem.href = url;
        elem.text = text;

        return elem;
    }
}
