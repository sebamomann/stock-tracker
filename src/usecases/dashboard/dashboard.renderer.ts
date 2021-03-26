import {StockList} from "../../models/stock/StockList";
import {History} from "../../models/History";
import {Renderer} from "../Renderer";
import {HistoryRenderer} from "../history/history.renderer";
import {TransactionDialogRenderer} from "./transaction-dialog.renderer";
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
    }

    private htmlStockList() {
        const stockListWrapper = this.htmlDiv(["stock-list-wrapper"]);

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
        const divClasses = [
            "block",
            "stock-block"
        ]
        const stockBlock = this.htmlDiv(divClasses);

        stockBlock.addEventListener("click",
            this.stockClickEventListener(fStock)
        );

        const stockBlockImg = this.htmlImg([], fStock.getRaw().image);
        const stockBlockInfo = this.htmLStockBlockInfo(fStock);

        stockBlock.append(stockBlockImg);
        stockBlock.append(stockBlockInfo);

        return stockBlock;
    }

    private htmLStockBlockInfo(fStock: Stock) {
        const div = this.htmlDiv();

        const stockTicker = this.htmlStockTicker(fStock);
        const stockName = this.htmlStockName(fStock);

        div.appendChild(stockTicker);
        div.appendChild(stockName);

        return div;
    }

    private htmlStockName(fStock: Stock) {
        return this.htmlSpan(["stock-name"], fStock.name)
    }

    private htmlStockTicker(fStock: Stock) {
        return this.htmlSpan(["stock-ticker"], fStock.ticker)
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

        return actionsDiv;
    }

    private htmlActionsDiv() {
        let actionsHTML = this.htmlDiv(["actions"]);

        actionsHTML.id = "actions";

        return actionsHTML;
    }

    private htmlCreateTransactionButton() {
        const buttonClasses = [
            "create-transaction",
            "button",
            "main-button"
        ]

        let createButton = this.htmlButton(buttonClasses, "Add Transaction");

        createButton.id = "create-transaction"

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

            transactionCreateDialogRenderer.on("created",
                this.transactionCreateEmitListener()
            );
            transactionCreateDialogRenderer.on("cancel",
                this.transactionCreateCancelListener()
            )

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
            const text = "Noch keine Transaktionen Hinterlegt. Bitte füge eine Transaktion hinzu.";
            const classes = ["empty-list"];

            const stockTicker = this.htmlSpan(classes, text);

            stockListWrapper.append(stockTicker)
        }
    }

}
