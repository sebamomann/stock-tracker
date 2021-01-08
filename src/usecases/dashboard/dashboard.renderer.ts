import {StockList} from "../../models/StockList";
import {History} from "../../models/History";
import {Stock} from "../../models/Stock";
import {IRenderer} from "../../interface/IRenderer";
import {Renderer} from "../Renderer";
import {HistoryRenderer} from "../history/history.renderer";
import {TransactionDialogRenderer} from "./transaction-dialog.renderer";
import {prod} from "../../configuration/Logger";

export class DashboardRenderer extends Renderer implements IRenderer {
    private stockList: StockList;

    constructor(stockList: StockList) {
        super();

        this.stockList = stockList;
    }

    render() {
        this.reset();

        const wrapper = document.getElementById("wrapper")!;

        this.htmlActions();

        const stockListWrapper = document.createElement('div');
        stockListWrapper.className = "stock-list-wrapper";

        this.stockList
            .getList()
            .forEach((fStock: Stock) => {
                const stockBlock = document.createElement('div')!;
                stockBlock.className = "stock-block block";
                stockBlock.addEventListener("click", (e: Event) => {
                    const history = new History(fStock);
                    const historyRenderer = new HistoryRenderer(history);

                    if (window.history.pushState) {
                        var newurl = window.location.protocol + "//" + window.location.host + "/stock" + '?ticker=' + fStock.ticker;
                        window.history.pushState({path: newurl}, '', newurl);
                    }

                    historyRenderer.render();
                });

                const stockTicker = document.createElement('span');
                stockTicker.className = "stock-ticker";
                stockTicker.innerText = fStock.ticker;

                const stockName = document.createElement('span');
                stockName.className = "stock-name";
                stockName.innerText = fStock.name;

                stockBlock.appendChild(stockTicker);
                stockBlock.appendChild(stockName);

                stockListWrapper.append(stockBlock);
            });


        wrapper.appendChild(stockListWrapper);

        prod.info(`Created HTML Stock-List for Dashboard`);
    }

    private htmlActions() {
        let actionsHTML = document.createElement('div');
        actionsHTML.className = "actions";
        actionsHTML.id = "actions";

        let createButton = document.createElement('button');
        createButton.className = "create-transaction button main-button"
        createButton.id = "create-transaction"
        createButton.innerText = "Add Transaction";
        createButton.addEventListener("click", (e: Event) => {
            const button = document.getElementById("create-transaction")!;
            button.remove();

            let transactionCreateDialogRenderer = new TransactionDialogRenderer();
            transactionCreateDialogRenderer.render();

            transactionCreateDialogRenderer.on("created", (stock: Stock) => {
                this.stockList.add(stock);

                this.render();
            });

            transactionCreateDialogRenderer.on("cancel", () => {
                this.htmlActions();
            })
        });

        actionsHTML.appendChild(createButton);

        const existing = document.getElementById("actions");

        if (existing) {
            existing.replaceWith(actionsHTML);
        } else {
            const wrapper = document.getElementById("wrapper")!;
            wrapper.append(actionsHTML);
        }

        prod.info(`Created HTML Actions for Dashboard`);
    }
}
