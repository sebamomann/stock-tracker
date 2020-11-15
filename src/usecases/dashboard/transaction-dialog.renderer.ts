import {Renderer} from "../Renderer";
import {IRenderer} from "../../interface/IRenderer";

export class TransactionDialogRenderer extends Renderer implements IRenderer {
    private static htmlDropdownSelect() {
        let select = document.createElement("select");

        let option1 = document.createElement("option");
        option1.innerText = "Purchase";
        option1.value = "1";

        let option2 = document.createElement("option");
        option2.innerText = "Sale";
        option2.value = "2";

        select.append(option1, option2);

        return select;
    }

    render() {
        const actions = document.getElementById("actions")!;
        const existingForm = document.getElementById("transaction-create-form")!;

        if (existingForm) {
            existingForm.remove();
        }

        let formHTML = document.createElement("form");
        formHTML.id = "transaction-create-form";

        let select = TransactionDialogRenderer.htmlDropdownSelect();

        let quantityInput = document.createElement("input");
        quantityInput.id = "form-quantity"
        quantityInput.placeholder = "Quantity";

        let priceInput = document.createElement("input");
        priceInput.id = "form-price"
        priceInput.placeholder = "Price (total)";

        let submit = document.createElement("button");
        submit.type = "submit";
        submit.innerText = "submit";
        submit.addEventListener('click', (e: Event) => {
            e.preventDefault();
            const inputs = (document.getElementById("transaction-create-form") as HTMLFormElement).elements;

            let option = (inputs[0] as HTMLSelectElement).value;
            let quantity = (inputs[1] as HTMLInputElement).value;
            let price = (inputs[2] as HTMLInputElement).value;

            console.log(`Selected Option: ${option} - Qt: ${quantity} - Price: ${price}`);

        });

        formHTML.append(select);
        formHTML.append(quantityInput);
        formHTML.append(priceInput);
        formHTML.append(submit);

        actions.append(formHTML);
    }
}
