import {Renderer} from "../Renderer";
import {History} from "../../models/History";
import {ITransaction} from "../../interface/ITransaction";
import {PurchaseTransaction} from "../../models/transaction/PurchaseTransaction";
import {Transaction} from "../../models/transaction/Transaction";
import {StockSplitDialogRenderer} from "./stock-split-dialog.renderer";

export class HistoryRenderer extends Renderer {
    private readonly history: History;
    //
    // private startDate: Date | undefined = undefined;
    // private endDate: Date | undefined = undefined;

    constructor(history: History) {
        super();

        this.history = history;
    }

    async render(): Promise<void> {
        this.reset();

        const wrapper = document.getElementById("wrapper")!;

        const historyHeader = this.htmlHistoryHeader();
        const historyWrapper = this.htmlHistoryWrapper();
        const transactionListWrapper = this.htmlTransactionList();
        const historyDetails = await this.htmlHistoryDetails();

        wrapper.appendChild(historyHeader);

        historyWrapper.appendChild(transactionListWrapper);
        historyWrapper.appendChild(historyDetails);

        wrapper.appendChild(historyWrapper);
    }

    private htmlTransactionBlock(fTransaction: Transaction) {
        const transactionBlock = document.createElement('div')!;
        const classes = ["transaction-block", "block"];
        // TODO?
        (fTransaction instanceof PurchaseTransaction) ? classes.push("purchase") : classes.push("sale")

        transactionBlock.className = classes.join(" ");

        transactionBlock.addEventListener("click", (e: Event) => {

        });

        const headlineHTML = document.createElement('h3');
        headlineHTML.className = "headline";
        headlineHTML.innerText = (fTransaction instanceof PurchaseTransaction) ? "Purchase" : "Sale"

        transactionBlock.appendChild(headlineHTML);

        const dateHTML = document.createElement('span');
        dateHTML.className = "date";
        dateHTML.innerText = `${String(fTransaction.date.toDateString())}`;

        transactionBlock.appendChild(dateHTML);

        const detailsHTML = this.htmlTransactionDetails(fTransaction);
        transactionBlock.appendChild(detailsHTML);

        return transactionBlock;
    }

    private htmlTransactionDetails(fTransaction: ITransaction) {
        const detailsHTML = document.createElement('div')!;
        detailsHTML.className = "details";

        const quantityHTML = this.htmlSpan("quantity", `Quantity: ${String(fTransaction.quantity)}`);
        const priceHTML = this.htmlSpan("price", `Total: ${String(fTransaction.price)}€`);

        detailsHTML.appendChild(quantityHTML);
        detailsHTML.appendChild(priceHTML);

        return detailsHTML;
    }

    private htmlTransactionList() {
        const transactionHistoryWrapper = document.createElement('div');
        transactionHistoryWrapper.className = "transaction-history-wrapper";

        this.history
            .transactions
            .forEach((fTransaction: Transaction) => {
                const transactionBlock = this.htmlTransactionBlock(fTransaction);

                transactionHistoryWrapper.append(transactionBlock);
            });

        return transactionHistoryWrapper;
    }

    private async htmlHistoryDetails() {
        const historyDetails = document.createElement('div');
        historyDetails.className = "history-details block";

        const quantityOwnedHTML = this.htmlQuantityOwned();
        historyDetails.appendChild(quantityOwnedHTML);

        const priceBalanceHTML = this.htmlPriceBalance();
        historyDetails.appendChild(priceBalanceHTML);

        const stockPrice = await this.htmlStockPrice();
        historyDetails.appendChild(stockPrice);

        const potentialValue = await this.htmlCurrentWorth();
        historyDetails.appendChild(potentialValue);

        const potentialWinTotal = await this.htmlPotentialWinTotal();
        historyDetails.appendChild(potentialWinTotal);

        // // date specification
        // let formHTML = document.createElement("form");
        // formHTML.id = "timeframe-form";
        //
        // const spanTimeframe = this.htmlSpan("", `Zeitraum (optional)`);
        // formHTML.appendChild(spanTimeframe);
        //
        // let dateInputStart = document.createElement("input");
        // dateInputStart.type = "date";
        // dateInputStart.placeholder = "Start Datum";
        // formHTML.appendChild(dateInputStart);
        //
        // let dateInputEnd = document.createElement("input");
        // dateInputEnd.type = "date";
        // dateInputEnd.placeholder = "End Datum";
        // formHTML.appendChild(dateInputEnd);
        //
        // let submit = document.createElement("button");
        // submit.type = "submit";
        // submit.innerText = "submit";
        // submit.addEventListener('click', (e: Event) => {
        //     e.preventDefault();
        //     const inputs = (document.getElementById("stock-split-form") as HTMLFormElement).elements;
        //
        //     let startDate = (inputs[0] as HTMLInputElement).value;
        //     let endDate = (inputs[1] as HTMLInputElement).value;
        //
        //     this.startDate = new Date(startDate);
        //     this.endDate = new Date(endDate);
        //
        //     this.render();
        // });
        // formHTML.appendChild(submit);
        //
        // historyDetails.append(formHTML);

        return historyDetails;
    }

    private htmlQuantityOwned() {
        let quantityOwned = this.history.numberOfOwnedStocks();

        const div = this.htmlDiv("owned-quantity table-div");
        const span1 = this.htmlSpan("", `Owned`);
        const span2 = this.htmlSpan("", `${String(quantityOwned)} pcs.`);

        div.appendChild(span1);
        div.appendChild(span2);

        return div;
    }

    private htmlPriceBalance() {
        let priceBalance = this.history.totalTransactionBalance();

        const div = this.htmlDiv("price-balance table-div");
        const span1 = this.htmlSpan("", `Price Balance`);
        const span2 = this.htmlSpan("", `${String(Math.round(priceBalance))}€`);

        div.appendChild(span1);
        div.appendChild(span2);

        return div;
    }

    private async htmlCurrentWorth() {
        let currentWorth = await this.history.totalWorthOfCurrentlyOwnedStocks();

        const div = this.htmlDiv("current-worth table-div");
        const span1 = this.htmlSpan("", `Current Worth`);
        const span2 = this.htmlSpan("", `${String(Math.round(currentWorth))}€`);

        div.appendChild(span1);
        div.appendChild(span2);

        return div;
    }

    private async htmlStockPrice() {
        let stockPrice = await this.history.stock.getPrice();

        const div = this.htmlDiv("current-worth-per-stock table-div");
        const span1 = this.htmlSpan("", `Worth per Stock`);
        const span2 = this.htmlSpan("", `${String(Math.round((stockPrice + Number.EPSILON) * 100) / 100)}€`);

        div.appendChild(span1);
        div.appendChild(span2);

        return div;
    }

    private async htmlPotentialWinTotal() {
        let htmlPotentialWinTotal = await this.history.totalWorthOfCurrentlyOwnedStocks();
        let priceBalance = this.history.totalTransactionBalance();

        let potentialWinTotal = priceBalance + htmlPotentialWinTotal;

        const div = this.htmlDiv("potential-win-total table-div");
        const span1 = this.htmlSpan("", `Potential Win Total`);
        const span2 = this.htmlSpan("", `${String(Math.round(potentialWinTotal))}€`);

        div.appendChild(span1);
        div.appendChild(span2);

        return div;
    }

    private htmlHistoryHeader() {
        const stock = this.history.stock;

        const historyHeader = document.createElement('div');
        historyHeader.className = "history-header";

        const stockTicker = document.createElement('h1');
        stockTicker.className = "stock-ticker";
        stockTicker.innerText = stock.ticker;

        const stockName = document.createElement('h2');
        stockName.className = "stock-name";
        stockName.innerText = stock.name;

        const stockSplit = this.htmlStockSplit();

        historyHeader.appendChild(stockTicker);
        historyHeader.appendChild(stockName);
        historyHeader.appendChild(stockSplit);

        return historyHeader;
    }

    private htmlStockSplit() {
        const stockSplitWrapper = document.createElement('div');
        stockSplitWrapper.id = "stock-split-wrapper";

        let stockSplitButton = document.createElement('button');
        stockSplitButton.className = "stock-split-button button main-button"
        stockSplitButton.innerText = "Stock Split";
        stockSplitButton.addEventListener("click", (e: Event) => {
            let stockSplitDialogRenderer = new StockSplitDialogRenderer(this.history);
            stockSplitDialogRenderer.render();

            stockSplitDialogRenderer.on("split", () => {
                this.render()
                    .then(() => {

                    });
            })
        });

        const stockSplitForm = document.createElement('div');
        stockSplitForm.id = "stock-split-block";

        stockSplitWrapper.appendChild(stockSplitButton);
        stockSplitWrapper.appendChild(stockSplitForm);

        return stockSplitWrapper;
    }

    private htmlHistoryWrapper() {
        const historyWrapper = document.createElement('div');
        historyWrapper.className = "history-wrapper";

        return historyWrapper;
    }
}
