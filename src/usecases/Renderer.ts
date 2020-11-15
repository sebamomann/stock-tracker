import {IRenderer} from "../interface/IRenderer";

export class Renderer implements IRenderer {
    render(): void {
    }

    reset(): void {
        const wrapper = document.getElementById("wrapper")!;
        wrapper.innerHTML = "";
    }
}
