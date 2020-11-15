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

    private static htmlDetails(fTransaction: ITransaction) {
        const detailsHTML = document.createElement('div')!;
        detailsHTML.className = "details";

        const quantityHTML = document.createElement('span');
        quantityHTML.className = "quantity";
        quantityHTML.innerText = `Qt: ${String(fTransaction.quantity)}`;

        const priceHTML = document.createElement('span');
        priceHTML.className = "price";
        priceHTML.innerText = `Price: ${String(fTransaction.price)}€`;

        detailsHTML.appendChild(quantityHTML);
        detailsHTML.appendChild(priceHTML);
        return detailsHTML;
    }

    render(): void {
        this.reset();

        const wrapper = document.getElementById("wrapper")!;

        const transactionListWrapper = this.htmlTransactionList();
        const historyDetails = this.htmlHistoryDetails();

        wrapper.appendChild(transactionListWrapper);
        wrapper.appendChild(historyDetails);
    }

    private htmlTransactionList() {
        const transactionHistoryWrapper = document.createElement('div');
        transactionHistoryWrapper.className = "transaction-history-wrapper";

        this.history
            .getTransactions()
            .forEach((fTransaction: ITransaction) => {
                const transactionBlock = document.createElement('div')!;
                const classes = ["transaction-block"];
                (fTransaction instanceof PurchaseTransaction) ? classes.push("purchase") : classes.push("sale")

                transactionBlock.className = classes.join(" ");

                transactionBlock.addEventListener("click", (e: Event) => {
                });

                const stockName = document.createElement('span');
                stockName.className = "name";
                stockName.innerText = fTransaction.stock.name;

                const stockTicker = document.createElement('span');
                stockTicker.className = "ticker";
                stockTicker.innerText = fTransaction.stock.ticker;

                const details = HistoryRenderer.htmlDetails(fTransaction);

                transactionBlock.appendChild(stockName);
                transactionBlock.appendChild(stockTicker);
                transactionBlock.appendChild(details);

                transactionHistoryWrapper.append(transactionBlock);
            });

        return transactionHistoryWrapper;
    }

    private htmlHistoryDetails() {
        const historyDetails = document.createElement('div');
        historyDetails.className = "history-details";

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

        const quantityOwnedHTML = document.createElement('span');
        quantityOwnedHTML.className = "owned-quantity";
        quantityOwnedHTML.innerText = `Owned: ${String(quantityOwned)}`;
        return quantityOwnedHTML;
    }

    private htmlPriceBalance() {
        let priceBalance = this.history.getPriceBalance();

        const priceBalanceHTML = document.createElement('span');
        priceBalanceHTML.className = "price-balance";
        priceBalanceHTML.innerText = `Price Balance: ${String(priceBalance)}`;
        return priceBalanceHTML;
    }

    private htmlCurrentWorth() {
        let currentWorth = this.history.getCurrentWorth();

        const currentWorthHTML = document.createElement('span');
        currentWorthHTML.className = "current-worth";
        currentWorthHTML.innerText = `Current Worth: ${String(currentWorth)}`;

        return currentWorthHTML;
    }

    private htmlPotentialWinTotal() {
        let htmlPotentialWinTotal = this.history.getCurrentWorth();
        let priceBalance = this.history.getPriceBalance();

        let potentialWinTotal = priceBalance + htmlPotentialWinTotal;

        const htmlPotentialWinTotalHTML = document.createElement('span');
        htmlPotentialWinTotalHTML.className = "potential-win-total";
        htmlPotentialWinTotalHTML.innerText = `Potential Win Total: ${String(potentialWinTotal)}`;

        return htmlPotentialWinTotalHTML;
    }
}
