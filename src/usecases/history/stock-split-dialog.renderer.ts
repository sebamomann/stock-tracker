import {Renderer} from "../Renderer";
import {History} from "../../models/History";

// noinspection JSMethodCanBeStatic
export class StockSplitDialogRenderer extends Renderer {
    private history: History;

    constructor(history: History) {
        super();

        this.history = history;
    }

    public render() {
        this.reset();

        const block = document.getElementById("actions")!;

        const htmlHeader = this.htmlHeader();
        const formHTML = this.htmlForm();

        block.append(htmlHeader);
        block.append(formHTML);
    }

    public reset() {
        const existingForm = document.getElementById("stock-split-form")!;

        if (existingForm) {
            existingForm.remove();
        }
    }

    private htmlHeader() {
        let headerHTML = document.createElement("h2");

        headerHTML.id = "create-transaction-header";
        headerHTML.className = "title";
        headerHTML.innerText = "Stock split";

        return headerHTML;
    }

    private htmlForm() {
        let formHTML = document.createElement("form");
        formHTML.id = "stock-split-form";

        let splitFactorInput = this.htmlSplitFactorInput();
        let dateInput = this.htmlDateInput();
        let submit = this.htmlSubmitButton();
        let cancelButton = this.htmlCancelButton();

        formHTML.append(splitFactorInput);
        formHTML.append(dateInput);
        formHTML.append(submit);
        formHTML.append(cancelButton);

        return formHTML;
    }

    private htmlCancelButton() {
        let cancelButton = document.createElement("button");

        cancelButton.className = "cancel button";
        cancelButton.innerText = "Cancel";

        cancelButton.addEventListener("click", _ => {
            this.emit("cancel")
        });

        return cancelButton;
    }

    private htmlSplitFactorInput() {
        let splitFactorInput = document.createElement("input");

        splitFactorInput.id = "form-split-factor"
        splitFactorInput.type = "number"
        splitFactorInput.placeholder = "Split Factor";

        return splitFactorInput;
    }

    private htmlDateInput() {
        let dateInput = document.createElement("input");

        dateInput.id = "form-price";
        dateInput.type = "date";
        dateInput.placeholder = "Datum";

        return dateInput;
    }

    private htmlSubmitButton() {
        let submit = document.createElement("button");

        submit.className = "stock-split-button button main-button"
        submit.type = "submit";
        submit.innerText = "submit";

        submit.addEventListener('click',
            this.stockSplitSubmitClickListener()
        );

        return submit;
    }

    private stockSplitSubmitClickListener() {
        return (e: Event) => {
            e.preventDefault();
            const inputs = (document.getElementById("stock-split-form") as HTMLFormElement).elements;

            let splitFactor = (inputs[0] as HTMLInputElement).value;
            let date = (inputs[1] as HTMLInputElement).value;

            this.history.stockSplit(+splitFactor, new Date(date));

            this.emit("split")
        };
    }
}
