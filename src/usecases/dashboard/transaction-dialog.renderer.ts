import {Renderer} from "../Renderer";
import {IRenderer} from "../../interface/IRenderer";
import {TransactionFactory} from "../../models/transaction/TransactionFactory";
import {Database} from "../../database/Database";
import {StockFactory} from "../../models/StockFactory";

export class TransactionDialogRenderer extends Renderer implements IRenderer {
    private static htmlDropdownSelect() {
        let select = document.createElement("select");

        let option1 = document.createElement("option");
        option1.innerText = "Purchase";
        option1.value = "0";

        let option2 = document.createElement("option");
        option2.innerText = "Sale";
        option2.value = "1";

        select.append(option1, option2);

        return select;
    }

    render() {
        const actions = document.getElementById("actions")!;

        this.reset();

        let headerHTML = document.createElement("h2");
        headerHTML.id = "create-transaction-header";
        headerHTML.className = "title";
        headerHTML.innerText = "Create transaction";

        let formHTML = document.createElement("form");
        formHTML.id = "transaction-create-form";

        let select = TransactionDialogRenderer.htmlDropdownSelect();

        let tickerInput = document.createElement("input");
        tickerInput.id = "form-ticker"
        tickerInput.placeholder = "Ticker";

        let quantityInput = document.createElement("input");
        quantityInput.id = "form-quantity"
        quantityInput.placeholder = "Quantity";

        let priceInput = document.createElement("input");
        priceInput.id = "form-price"
        priceInput.placeholder = "Price (total)";

        let dateInput = document.createElement("input");
        dateInput.id = "form-price";
        dateInput.type = "date";
        dateInput.placeholder = "Datum";

        let formActions = document.createElement("div");
        formActions.className = "form-actions";

        let submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.innerText = "submit";
        submitButton.addEventListener('click', async (e: Event) => {
            e.preventDefault();
            const inputs = (document.getElementById("transaction-create-form") as HTMLFormElement).elements;

            const stockFactory = new StockFactory();
            let stock = await stockFactory.createStockByTicker((inputs[0] as HTMLSelectElement).value);

            let option = (inputs[1] as HTMLSelectElement).value;
            let quantity = (inputs[2] as HTMLInputElement).value;
            let price = (inputs[3] as HTMLInputElement).value;
            let date = (inputs[4] as HTMLInputElement).value;

            const transactionFactory = new TransactionFactory();
            const transaction = transactionFactory.createTransaction(stock, +option, +quantity, +price, new Date(date));

            Database.createTransaction(transaction);

            this.emit("created", stock);
        });

        let cancelButton = document.createElement("button");
        cancelButton.className = "cancel";
        cancelButton.innerText = "Cancel";
        cancelButton.addEventListener("click", (e: Event) => {
            this.emit("cancel");
        });

        formHTML.append(tickerInput);
        formHTML.append(select);
        formHTML.append(quantityInput);
        formHTML.append(priceInput);
        formHTML.append(dateInput);

        formActions.append(submitButton);
        formActions.append(cancelButton);

        formHTML.append(formActions);

        actions.append(headerHTML);
        actions.append(formHTML);
    }

    //override
    reset() {
        const existingForm = document.getElementById("transaction-create-form")!;

        if (existingForm) {
            existingForm.remove();
        }
    }
}
