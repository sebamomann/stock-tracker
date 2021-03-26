import {StockList} from "../../models/stock/StockList";
import {History} from "../../models/History";
import {Renderer} from "../Renderer";
import {HistoryRenderer} from "../history/history.renderer";
import {TransactionDialogRenderer} from "./transaction-dialog.renderer";
import {routeLogging} from "../../configuration/Logger";
import {Stock} from "../../models/stock/Stock";
import {TransactionDatabaseAccessor} from "../../database/accessor/TransactionDatabaseAccessor";

// noinspection JSMethodCanBeStatic
export class DashboardRenderer extends Renderer {
    private stockList: StockList;

    constructor(stockList: StockList) {
        super();

        this.stockList = stockList;
    }

    render() {
        this.reset();

        const wrapper = document.getElementById("wrapper")!;

        const actions = this.htmlActions();
        const stockList = this.htmlStockList();

        wrapper.appendChild(actions);
        wrapper.appendChild(stockList);

        routeLogging.info(`Created HTML Stock-List for Dashboard`);
    }

    private htmlStockList() {
        const stockListWrapper = document.createElement('div');
        stockListWrapper.className = "stock-list-wrapper";

        this.htmlCheckEmptyList(stockListWrapper);

        this.stockList
            .getList()
            .forEach((fStock: Stock) => {
                const stockBlock = this.htmlStockBlock(fStock);

                stockListWrapper.append(stockBlock);
            });
        return stockListWrapper;
    }

    private htmlStockBlock(fStock: Stock) {
        const stockBlock = document.createElement('div')!;
        stockBlock.className = "stock-block block";
        stockBlock.addEventListener("click",
            this.stockClickEventListener(fStock)
        );

        const stockBlockImg = this.htmlImg("", fStock.getRaw().image);
        const stockBlockInfo = this.htmLStockBlockInfo(fStock);

        stockBlock.append(stockBlockImg);
        stockBlock.append(stockBlockInfo);

        return stockBlock;
    }

    private htmLStockBlockInfo(fStock: Stock) {
        const div = document.createElement('div');

        const stockTicker = this.htmlStockTicker(fStock);
        const stockName = this.htmlStockName(fStock);

        div.appendChild(stockTicker);
        div.appendChild(stockName);

        return div;
    }

    private htmlStockName(fStock: Stock) {
        const stockName = document.createElement('span');

        stockName.className = "stock-name";
        stockName.innerText = fStock.name;

        return stockName;
    }

    private htmlStockTicker(fStock: Stock) {
        const stockTicker = document.createElement('span');

        stockTicker.className = "stock-ticker";
        stockTicker.innerText = fStock.ticker;

        return stockTicker;
    }

    private stockClickEventListener(fStock: Stock) {
        return () => {
            const transactionsDatabaseAccessor = new TransactionDatabaseAccessor();
            const history = new History(transactionsDatabaseAccessor, fStock);
            const historyRenderer = new HistoryRenderer(history);

            if (window.history.pushState) {
                let newUrl = window.location.protocol + "//" + window.location.host;
                newUrl += "/stock";
                newUrl += '?ticker=' + fStock.ticker;

                window.history.pushState({path: newUrl}, '', newUrl);
            }

            historyRenderer.render()
                .then(
                    _ => {
                    }
                );
        };
    }

    private htmlActions() {
        let actionsDiv = this.htmlActionsDiv();

        let createButton = this.htmlCreateTransactionButton();

        actionsDiv.appendChild(createButton);

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

        routeLogging.info(`Created HTML Actions for Dashboard`);

        return actionsDiv;
    }

    private htmlActionsDiv() {
        let actionsHTML = document.createElement('div');

        actionsHTML.className = "actions";
        actionsHTML.id = "actions";

        return actionsHTML;
    }

    private htmlCreateTransactionButton() {
        let createButton = document.createElement('button');

        createButton.className = "create-transaction button main-button"
        createButton.id = "create-transaction"
        createButton.innerText = "Add Transaction";

        createButton.addEventListener("click",
            this.createTransactionClickListener()
        );

        return createButton;
    }

    private createTransactionClickListener() {
        return () => {
            /**
             * Clear button for better layout
             */
            const button = document.getElementById("create-transaction")!;
            button.remove();

            const transactionsDatabaseAccessor = new TransactionDatabaseAccessor();
            const transactionCreateDialogRenderer = new TransactionDialogRenderer(transactionsDatabaseAccessor);

            transactionCreateDialogRenderer.on("created", this.transactionCreateEmitListener());
            transactionCreateDialogRenderer.on("cancel", this.transactionCreateCancelListener())

            transactionCreateDialogRenderer.render();
        };
    }

    private transactionCreateCancelListener() {
        return () => {
            this.htmlActions();
        };
    }

    private transactionCreateEmitListener() {
        return (stock: Stock) => {
            const stockExistsInList = this.stockList
                .getList()
                .find((fStock) => {
                    return fStock.ticker === stock.ticker;
                });

            if (!stockExistsInList) {
                this.stockList.add(stock);
            }

            this.render();
        };
    }

    private htmlCheckEmptyList(stockListWrapper: HTMLDivElement): void {
        if (this.stockList.getList().length === 0) {
            const stockTicker = document.createElement('span');

            stockTicker.className = "empty-list";
            stockTicker.innerText = "Noch keine Transaktionen Hinterlegt. Bitte füge eine Transaktion hinzu."

            stockListWrapper.append(stockTicker)
        }
    }
}
