import {Renderer} from "../Renderer";
import {TransactionList} from "../../models/TransactionList";
import {ITransaction} from "../../interface/ITransaction";
import {PurchaseTransaction} from "../../models/transaction/PurchaseTransaction";
import {Transaction} from "../../models/transaction/Transaction";
import {StockSplitDialogRenderer} from "./stock-split-dialog.renderer";
import {StockInformationRenderer} from "../information/stock-information.renderer";
import {DashboardRenderer} from "../dashboard/dashboard.renderer";
import {StockList} from "../../models/stock/stockList/StockList";
import {Stock} from "../../models/stock/Stock";

// noinspection JSMethodCanBeStatic
export class TransactionListRenderer extends Renderer {

    private readonly transactionList: TransactionList;

    // private startDate: Date | undefined = undefined;
    // private endDate: Date | undefined = undefined;

    constructor(transactionList: TransactionList) {
        super();

        this.transactionList = transactionList;
    }

    async render(): Promise<void> {
        this.reset();

        const wrapper = document.getElementById("wrapper")!;

        const historyHeader = this.htmlHistoryHeader();
        const htmlActions = this.htmlActions();
        const historyWrapper = await this.htmlHistoryWrapper();

        wrapper.appendChild(historyHeader);
        wrapper.appendChild(htmlActions);
        wrapper.appendChild(historyWrapper);
    }

    private htmlHistoryHeader() {
        const stock = this.transactionList.stock;

        const historyHeader = this.htmlDiv(["history-header"])

        const stockTicker = this.htmlStockTicker(stock);
        const stockName = this.htmlStockName(stock);

        const stockInformationButton = this.htmlStockInformationButton();
        const toDashboardButton = this.htmlNavigateToDashboardButton();

        historyHeader.appendChild(stockTicker);
        historyHeader.appendChild(stockName);
        historyHeader.appendChild(stockInformationButton);
        historyHeader.appendChild(toDashboardButton);

        return historyHeader;
    }

    private htmlStockTicker(stock: Stock) {
        return this.htmlH1(["stock-ticker"], stock.ticker);
    }

    private htmlStockName(stock: Stock) {
        return this.htmlH2(["stock-name"], stock.name);
    }

    private htmlStockInformationButton() {
        const buttonClasses = [
            "stock-information-button",
            "button",
            "main-button",
            "inline"
        ];
        const buttonText = "Mehr";
        let stockInformationButton = this.htmlButton(buttonClasses, buttonText)

        stockInformationButton.addEventListener("click",
            this.stockInformationClickListener()
        );

        return stockInformationButton;
    }


    private htmlNavigateToDashboardButton() {
        const buttonClasses = [
            "dashboard-button",
            "button",
            "main-button",
            "inline"
        ];
        const buttonText = "Dashboard";
        const navigateToDashboardButton = this.htmlButton(buttonClasses, buttonText)

        navigateToDashboardButton.addEventListener("click",
            this.toDashboardClickListener()
        );

        return navigateToDashboardButton;
    }

    private async htmlHistoryWrapper() {
        const historyWrapper = this.htmlDiv(["history-wrapper"]);
        const transactionListWrapper = this.htmlTransactionList();
        const historyDetails = await this.htmlHistoryDetails();

        historyWrapper.appendChild(transactionListWrapper);
        historyWrapper.appendChild(historyDetails);

        return historyWrapper;
    }

    private htmlTransactionList() {
        const transactionHistoryWrapper = this.htmlDiv(["transaction-history-wrapper"]);

        this.transactionList
            .transactions
            .forEach(
                (fTransaction: Transaction) => {
                    const transactionBlock = this.htmlTransactionBlock(fTransaction);

                    transactionHistoryWrapper.append(transactionBlock);
                }
            );

        return transactionHistoryWrapper;
    }

    private htmlTransactionBlock(fTransaction: Transaction) {
        const classes = ["transaction-block", "block"];

        (fTransaction instanceof PurchaseTransaction) ? classes.push("purchase") : classes.push("sale")
        const transactionBlock = this.htmlDiv(classes);

        const headlineHTML = this.htmlTransactionBlockHeadline(fTransaction);
        const dateHTML = this.htmlTransactionBlockDate(fTransaction);
        const detailsHTML = this.htmlTransactionBlockDetails(fTransaction);

        transactionBlock.appendChild(headlineHTML);
        transactionBlock.appendChild(dateHTML);
        transactionBlock.appendChild(detailsHTML);


        return transactionBlock;
    }

    private htmlTransactionBlockDate(fTransaction: Transaction) {
        const text = `${String(fTransaction.date.toDateString())}`
        const classes = ["date"]

        return this.htmlSpan(classes, text);
    }

    private htmlTransactionBlockHeadline(fTransaction: Transaction) {
        const text = (fTransaction instanceof PurchaseTransaction) ? "Purchase" : "Sale";
        const classes = ["headline"];

        return this.htmlH3(classes, text);
    }

    private async htmlHistoryDetails() {
        const divClasses = [
            "history-details",
            "block"
        ];

        const historyDetails = this.htmlDiv(divClasses);

        const quantityOwnedHTML = this.htmlQuantityOwned();
        const priceBalanceHTML = this.htmlPriceBalance();
        const stockPriceHTML = await this.htmlStockPrice();
        const potentialValueHTML = await this.htmlCurrentWorth();
        const potentialWinTotalHTML = await this.htmlPotentialWinTotal();

        historyDetails.appendChild(quantityOwnedHTML);
        historyDetails.appendChild(priceBalanceHTML);
        historyDetails.appendChild(stockPriceHTML);
        historyDetails.appendChild(potentialValueHTML);
        historyDetails.appendChild(potentialWinTotalHTML);

        // // date specification
        // let formHTML = document.createElement("form");
        // formHTML.id = "timeframe-form";
        //
        // const spanTimeframe = this.htmlSpan([], `Zeitraum (optional)`);
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
        let quantityOwned = this.transactionList.numberOfOwnedStocks();

        const divClasses = [
            "owned-quantity",
            "table-div"
        ]

        const div = this.htmlDiv(divClasses);
        const span1 = this.htmlSpan([], `Owned`);
        const span2 = this.htmlSpan([], `${String(quantityOwned)} pcs.`);

        div.appendChild(span1);
        div.appendChild(span2);

        return div;
    }

    private htmlPriceBalance() {
        let priceBalance = this.transactionList.totalTransactionBalance();

        const divClasses = [
            "price-balance",
            "table-div"
        ]

        const div = this.htmlDiv(divClasses);
        const span1 = this.htmlSpan([], `Price Balance`);
        const span2 = this.htmlSpan([], `${String(Math.round(priceBalance))}€`);

        div.appendChild(span1);
        div.appendChild(span2);

        return div;
    }

    private async htmlCurrentWorth() {
        let currentWorth = await this.transactionList.totalWorthOfCurrentlyOwnedStocks();

        const divClasses = [
            "current-worth",
            "table-div"
        ]

        const div = this.htmlDiv(divClasses);
        const span1 = this.htmlSpan([], `Current Worth`);
        const span2 = this.htmlSpan([], `${String(Math.round(currentWorth))}€`);

        div.appendChild(span1);
        div.appendChild(span2);

        return div;
    }

    private async htmlStockPrice() {
        let stockPrice = await this.transactionList.stock.getPrice();

        const divClasses = [
            "current-worth-per-stock",
            "table-div"
        ]

        const div = this.htmlDiv(divClasses);
        const span1 = this.htmlSpan([], `Worth per Stock`);
        const span2 = this.htmlSpan([], `${String(Math.round((stockPrice + Number.EPSILON) * 100) / 100)}€`);

        div.appendChild(span1);
        div.appendChild(span2);

        return div;
    }

    private async htmlPotentialWinTotal() {
        let htmlPotentialWinTotal = await this.transactionList.totalWorthOfCurrentlyOwnedStocks();
        let priceBalance = this.transactionList.totalTransactionBalance();

        let potentialWinTotal = priceBalance + htmlPotentialWinTotal;

        const divClasses = [
            "potential-win-total",
            "table-div"
        ]

        const div = this.htmlDiv(divClasses);
        const span1 = this.htmlSpan([], `Potential Win Total`);
        const span2 = this.htmlSpan([], `${String(Math.round(potentialWinTotal))}€`);

        div.appendChild(span1);
        div.appendChild(span2);

        return div;
    }

    private htmlActions() {
        const actionsDiv = this.htmlActionsDiv();

        const stockSplitButton = this.htmlStockSplitButton();

        actionsDiv.appendChild(stockSplitButton);

        /*
        * Check if actions div already exists. If so -> replace, else append
        */
        const existing = document.getElementById("actions");

        if (existing) {
            existing.replaceWith(actionsDiv);
        } else {
            const wrapper = document.getElementById("wrapper")!;
            wrapper.append(actionsDiv);
        }

        return actionsDiv;
    }

    private htmlActionsDiv() {
        const actionsHTML = this.htmlDiv(["actions"]);

        actionsHTML.id = "actions";

        return actionsHTML;
    }

    private htmlTransactionBlockDetails(fTransaction: ITransaction) {
        const detailsHTML = this.htmlDiv(["details"])

        let quantityText = `Quantity: ${String(fTransaction.quantity * fTransaction.splitFactor)}`;
        quantityText += " - ";
        quantityText += `Incl split: ${fTransaction.splitFactor}`;
        const quantityClasses = ["quantity"];

        const quantityHTML = this.htmlSpan(quantityClasses, quantityText);

        const priceClasses = ["price"];
        const priceText = `Total: ${String(fTransaction.price)}€`;

        const priceHTML = this.htmlSpan(priceClasses, priceText);

        detailsHTML.appendChild(quantityHTML);
        detailsHTML.appendChild(priceHTML);

        return detailsHTML;
    }

    private toDashboardClickListener() {
        return async () => {
            if (window.history.pushState) {
                const newUrl = window.location.protocol + "//" + window.location.host;
                window.history.pushState({path: newUrl}, '', newUrl);
            }

            const stockList = new StockList();
            await stockList.loadStockList();

            let dashboardRenderer = new DashboardRenderer(stockList);
            dashboardRenderer.render();
        };
    }

    private htmlStockSplitButton() {
        const buttonClasses = [
            "stock-split-button",
            "button",
            "main-button"
        ];
        const buttonText = "Stock Split";

        const stockSplitButton = this.htmlButton(buttonClasses, buttonText);
        stockSplitButton.id = "stock-split-button";

        stockSplitButton.addEventListener("click",
            this.stockSplitClickEventListener()
        );

        return stockSplitButton;
    }

    private stockSplitClickEventListener() {
        return () => {
            /**
             * Clear button for better layout
             */
            const button = document.getElementById("stock-split-button")!;
            button.remove();

            let stockSplitDialogRenderer = new StockSplitDialogRenderer(this.transactionList);
            stockSplitDialogRenderer.render();

            stockSplitDialogRenderer.on("split",
                this.stockSplitEmitListener()
            );
            stockSplitDialogRenderer.on("cancel",
                this.stockSplitCancelListener()
            );
        };
    }

    private stockSplitEmitListener() {
        return () => {
            this.render()
                .then(
                    _ => {
                    }
                );
        };
    }

    private stockInformationClickListener() {
        return () => {
            if (window.history.pushState) {
                let newUrl = window.location.protocol + "//" + window.location.host;
                newUrl += '/stockInfo'
                newUrl += '?ticker=' + this.transactionList.stock.ticker;

                window.history.pushState({path: newUrl}, '', newUrl);
            }

            let stockInformationRenderer = new StockInformationRenderer(this.transactionList.stock);
            stockInformationRenderer.render();
        };
    }

    private stockSplitCancelListener() {
        return () => {
            this.htmlActions();
        };
    }
}
