import {IRenderer} from "../interface/IRenderer";
import events from "events";

export class Renderer extends events.EventEmitter implements IRenderer {
    public render(): void {
    }

    public reset(): void {
        const wrapper = document.getElementById("wrapper")!;
        wrapper.innerHTML = "";
    }

    public htmlSpan(classes: string[], text: string): any {
        const elem = document.createElement('span');

        elem.classList.add(...classes);
        elem.innerText = text;

        return elem;
    }

    public htmlH1(classes: string[], text: string): any {
        const elem = document.createElement('h1');

        elem.classList.add(...classes);
        elem.innerText = text;

        return elem;
    }

    public htmlH2(classes: string[], text: string): any {
        const elem = document.createElement('h2');

        elem.classList.add(...classes);
        elem.innerText = text;

        return elem;
    }

    public htmlH3(classes: string[], text: string): any {
        const elem = document.createElement('h3');

        elem.classList.add(...classes);
        elem.innerText = text;

        return elem;
    }


    public htmlDiv(classes: string[] = []): any {
        const elem = document.createElement('div');

        elem.classList.add(...classes);

        return elem;
    }

    public htmlImg(classes: string[], src: string): any {
        const elem = document.createElement('img');

        elem.classList.add(...classes);
        elem.src = src;

        return elem;
    }

    public htmlLink(classes: string[], text: string, url: string): any {
        const elem = document.createElement('a');

        elem.classList.add(...classes);
        elem.href = url;
        elem.text = text;

        return elem;
    }

    public htmlButton(classes: string[], text: string) {
        const elem = document.createElement('button');

        elem.classList.add(...classes);
        elem.innerText = text;

        return elem;
    }


}
