import {Renderer} from "../Renderer";
import {TransactionFactory} from "../../models/transaction/TransactionFactory";
import {StockFactory} from "../../models/stock/StockFactory";
import {ITransactionAccessor} from "../../database/accessor/ITransactionAccessor";

// noinspection JSMethodCanBeStatic
export class TransactionDialogRenderer extends Renderer {

    private transactionDatabaseAccessor: ITransactionAccessor;

    constructor(transactionDatabaseAccessor: ITransactionAccessor) {
        super();

        this.transactionDatabaseAccessor = transactionDatabaseAccessor;
    }

    public render() {
        this.reset();

        const actions = document.getElementById("actions")!;

        let headerHTML = this.htmlHeader();
        let formHTML = this.htmlForm();

        actions.append(headerHTML);
        actions.append(formHTML);
    }

    public reset() {
        const existingForm = document.getElementById("transaction-create-form")!;

        if (existingForm) {
            existingForm.remove();
        }
    }

    private htmlHeader() {
        let headerHTML = this.htmlH2(["title"], "Create transaction");

        headerHTML.id = "create-transaction-header";

        return headerHTML;
    }

    private htmlForm() {
        let formHTML = document.createElement("form");
        formHTML.id = "transaction-create-form";

        let select = this.htmlDropdownSelect();
        let tickerInput = this.htmlTickerInput();
        let quantityInput = this.htmlQuantityInput();
        let priceInput = this.htmlPriceInput();
        let dateInput = this.htmlDateInput();
        let formActions = this.htmlFormActions();

        formHTML.append(tickerInput);
        formHTML.append(select);
        formHTML.append(quantityInput);
        formHTML.append(priceInput);
        formHTML.append(dateInput);

        formHTML.append(formActions);

        return formHTML;
    }

    private htmlDropdownSelect() {
        let select = document.createElement("select");

        const options = [{
            text: "Purchase",
            value: 0,
        }, {
            text: "Sale",
            value: 1
        }]

        options.forEach(
            (fOption) => {
                let option = document.createElement("option");
                option.innerText = fOption.text;
                option.value = String(fOption.value);

                select.append(option);
            }
        )

        return select;
    }

    private htmlFormActions() {
        let formActions = this.htmlDiv(["form-actions"]);

        let submitButton = this.htmlSubmitButton();
        let cancelButton = this.htmlCancelButton();

        formActions.append(submitButton);
        formActions.append(cancelButton);
        return formActions;
    }

    private htmlSubmitButton() {
        const buttonClasses = [
            "button",
            "main-button"
        ];
        const buttonText = "submit";

        let submitButton = this.htmlButton(buttonClasses, buttonText);

        submitButton.type = "submit";
        submitButton.addEventListener('click', this.submitButtonClickListener());

        return submitButton;
    }

    private htmlCancelButton() {
        const buttonClasses = [
            "button",
            "cancel"
        ];
        const buttonText = "submit";

        let cancelButton = this.htmlButton(buttonClasses, buttonText);
        cancelButton.addEventListener("click", this.cancelButtonClickListener());

        return cancelButton;
    }

    private htmlDateInput() {
        let dateInput = document.createElement("input");

        dateInput.type = "date";
        dateInput.placeholder = "Datum";

        return dateInput;
    }

    private htmlPriceInput() {
        let priceInput = document.createElement("input");

        priceInput.id = "form-price"
        priceInput.placeholder = "Price (total)";

        return priceInput;
    }

    private htmlQuantityInput() {
        let quantityInput = document.createElement("input");

        quantityInput.id = "form-quantity"
        quantityInput.placeholder = "Quantity";

        return quantityInput;
    }

    private htmlTickerInput() {
        let tickerInput = document.createElement("input");

        tickerInput.id = "form-ticker"
        tickerInput.placeholder = "Ticker";

        return tickerInput;
    }

    private submitButtonClickListener() {
        return async (e: Event) => {
            e.preventDefault();

            const inputs = (document.getElementById("transaction-create-form") as HTMLFormElement).elements;

            const ticker = (inputs[0] as HTMLSelectElement).value;
            let option = (inputs[1] as HTMLSelectElement).value;
            let quantity = (inputs[2] as HTMLInputElement).value;
            let price = (inputs[3] as HTMLInputElement).value;
            let date = (inputs[4] as HTMLInputElement).value;

            let stock = await StockFactory.createStockByTicker(ticker);

            const transactionFactory = new TransactionFactory();
            const transaction = transactionFactory.createNewTransaction(+option, stock, +price, +quantity, new Date(date));

            this.transactionDatabaseAccessor.createTransaction(transaction);

            this.emit("created", stock);
        };
    }

    private cancelButtonClickListener() {
        return () => {
            this.emit("cancel");
        };
    }
}
