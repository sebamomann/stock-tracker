import {IRenderer} from "../interface/IRenderer";
import events from "events";

export class Renderer extends events.EventEmitter implements IRenderer {
    public render(): void {
    }

    public reset(): void {
        const wrapper = document.getElementById("wrapper")!;
        wrapper.innerHTML = "";
    }

    public htmlSpan(classes: string, text: string): any {
        const elem = document.createElement('span');

        elem.className = classes;
        elem.innerText = text;

        return elem;
    }

    public htmlDiv(classes: string): any {
        const elem = document.createElement('div');

        elem.className = classes;

        return elem;
    }

    public htmlImg(classes: string, src: string): any {
        const elem = document.createElement('img');

        elem.className = classes;
        elem.src = src;

        return elem;
    }

    public htmlLink(classes: string, text: string, url: string): any {
        const elem = document.createElement('a');

        elem.className = classes;
        elem.href = url;
        elem.text = text;

        return elem;
    }
}
