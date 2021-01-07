import {Renderer} from "../Renderer";
import {IRenderer} from "../../interface/IRenderer";
import {History} from "../../models/History";

export class StockSplitDialogRenderer extends Renderer implements IRenderer {
    private history: History;

    constructor(history: History) {
        super();

        this.history = history;
    }

    // Override
    public render() {
        const block = document.getElementById("stock-split-block")!;

        this.reset();

        let formHTML = document.createElement("form");
        formHTML.id = "stock-split-form";

        let splitFactorInput = document.createElement("input");
        splitFactorInput.id = "form-split-factor"
        splitFactorInput.type = "number"
        splitFactorInput.placeholder = "Split Factor";

        let dateInput = document.createElement("input");
        dateInput.id = "form-price";
        dateInput.type = "date";
        dateInput.placeholder = "Datum";

        let submit = document.createElement("button");
        submit.type = "submit";
        submit.innerText = "submit";
        submit.addEventListener('click', (e: Event) => {
            e.preventDefault();
            const inputs = (document.getElementById("stock-split-form") as HTMLFormElement).elements;

            let splitFactor = (inputs[0] as HTMLInputElement).value;
            let date = (inputs[1] as HTMLInputElement).value;

            this.history.stockSplit(+splitFactor, new Date(date));
        });

        let cancelButton = document.createElement("button");
        cancelButton.className = "cancel";
        cancelButton.innerText = "Cancel";
        cancelButton.addEventListener("click", (e: Event) => {
            this.reset();
        });

        formHTML.append(splitFactorInput);
        formHTML.append(dateInput);
        formHTML.append(submit);
        formHTML.append(cancelButton);

        block.append(formHTML);
    }

    //override
    reset() {
        const existingForm = document.getElementById("stock-split-form")!;

        if (existingForm) {
            existingForm.remove();
        }
    }
}