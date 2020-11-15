import {IRenderer} from "../../interface/IRenderer";
import {Renderer} from "../Renderer";
import {History} from "../../models/History";
import {ITransaction} from "../../interface/ITransaction";
import {PurchaseTransaction} from "../../models/transaction/PurchaseTransaction";

export class HistoryRenderer extends Renderer implements IRenderer {
    private history: History;

    constructor(history: History) {
        super();

        this.history = history;
    }

    render(): void {
        this.reset();

        const wrapper = document.getElementById("wrapper")!;

        const historyHeader = this.htmlHistoryHeader();
        const transactionListWrapper = this.htmlTransactionList();
        const historyDetails = this.htmlHistoryDetails();

        wrapper.appendChild(historyHeader);
        wrapper.appendChild(transactionListWrapper);
        wrapper.appendChild(historyDetails);
    }

    private htmlTransactionBlock(fTransaction: ITransaction) {
        const transactionBlock = document.createElement('div')!;
        const classes = ["transaction-block", "block"];
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

        const quantityHTML = this.htmlSpan("quantity", `Qt: ${String(fTransaction.quantity)}`);
        const priceHTML = this.htmlSpan("price", `Price: ${String(fTransaction.price)}€`);

        detailsHTML.appendChild(quantityHTML);
        detailsHTML.appendChild(priceHTML);

        return detailsHTML;
    }

    private htmlTransactionList() {
        const transactionHistoryWrapper = document.createElement('div');
        transactionHistoryWrapper.className = "transaction-history-wrapper";

        this.history
            .getTransactions()
            .forEach((fTransaction: ITransaction) => {
                const transactionBlock = this.htmlTransactionBlock(fTransaction);

                transactionHistoryWrapper.append(transactionBlock);
            });

        return transactionHistoryWrapper;
    }

    private htmlHistoryDetails() {
        const historyDetails = document.createElement('div');
        historyDetails.className = "history-details block";

        const quantityOwnedHTML = this.htmlQuantityOwned();
        historyDetails.appendChild(quantityOwnedHTML);

        const priceBalanceHTML = this.htmlPriceBalance();
        historyDetails.appendChild(priceBalanceHTML);

        const potentialValue = this.htmlCurrentWorth();
        historyDetails.appendChild(potentialValue);

        const potentialWinTotal = this.htmlPotentialWinTotal();
        historyDetails.appendChild(potentialWinTotal);

        return historyDetails;
    }

    private htmlQuantityOwned() {
        let quantityOwned = this.history.numberOfOwnedStocks();
        return this.htmlSpan("owned-quantity", `Owned: ${String(quantityOwned)}`);
    }

    private htmlPriceBalance() {
        let priceBalance = this.history.getPriceBalance();
        return this.htmlSpan("price-balance", `Price Balance: ${String(priceBalance)}`);
    }

    private htmlCurrentWorth() {
        let currentWorth = this.history.getCurrentWorth();
        return this.htmlSpan("current-worth", `Current Worth: ${String(currentWorth)}`);
    }

    private htmlPotentialWinTotal() {
        let htmlPotentialWinTotal = this.history.getCurrentWorth();
        let priceBalance = this.history.getPriceBalance();

        let potentialWinTotal = priceBalance + htmlPotentialWinTotal;

        return this.htmlSpan("potential-win-total", `Potential Win Total: ${String(potentialWinTotal)}`);
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

        historyHeader.appendChild(stockTicker);
        historyHeader.appendChild(stockName);

        return historyHeader;
    }
}
