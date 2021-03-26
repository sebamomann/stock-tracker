import {StockList} from "../../models/stock/StockList";
import {History} from "../../models/History";
import {Renderer} from "../Renderer";
import {HistoryRenderer} from "../history/history.renderer";
import {TransactionDialogRenderer} from "./transaction-dialog.renderer";
import {prod} from "../../configuration/Logger";
import {Stock} from "../../models/stock/Stock";
import {TransactionDatabaseAccessor} from "../../database/accessor/TransactionDatabaseAccessor";

export class DashboardRenderer extends Renderer {
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

        this.htmlCheckEmptyList(stockListWrapper);

        this.stockList
            .getList()
            .forEach((fStock: Stock) => {
                const stockBlock = document.createElement('div')!;
                stockBlock.className = "stock-block block";
                stockBlock.addEventListener("click", () => {
                    const transactionsDatabaseAccessor = new TransactionDatabaseAccessor();
                    const history = new History(transactionsDatabaseAccessor, fStock);
                    const historyRenderer = new HistoryRenderer(history);

                    if (window.history.pushState) {
                        const newurl = window.location.protocol + "//" + window.location.host + "/stock" + '?ticker=' + fStock.ticker;
                        window.history.pushState({path: newurl}, '', newurl);
                    }

                    historyRenderer.render()
                        .then(
                            _ => {
                            }
                        );
                });

                const infoDiv = document.createElement('div');

                const stockBlockImg = this.htmlImg("", fStock.getRaw().image);

                const stockTicker = document.createElement('span');
                stockTicker.className = "stock-ticker";
                stockTicker.innerText = fStock.ticker;

                const stockName = document.createElement('span');
                stockName.className = "stock-name";
                stockName.innerText = fStock.name;

                infoDiv.appendChild(stockTicker);
                infoDiv.appendChild(stockName);

                stockBlock.append(stockBlockImg);
                stockBlock.append(infoDiv);

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
        createButton.addEventListener("click", () => {
            const button = document.getElementById("create-transaction")!;
            button.remove();

            const transactionsDatabaseAccessor = new TransactionDatabaseAccessor();
            let transactionCreateDialogRenderer = new TransactionDialogRenderer(transactionsDatabaseAccessor);
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

    private htmlCheckEmptyList(stockListWrapper: HTMLDivElement): void {
        if (this.stockList.getList().length === 0) {
            const stockTicker = document.createElement('span');
            stockTicker.className = "empty-list";
            stockTicker.innerText = "Noch keine Transaktionen Hinterlegt. Bitte füge eine Transaktion hinzu."

            stockListWrapper.append(stockTicker)
        }
    }
}
