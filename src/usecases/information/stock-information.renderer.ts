import {Renderer} from "../Renderer";
import {prod} from "../../configuration/Logger";
import {Stock} from "../../models/stock/Stock";
import {TransactionDatabaseAccessor} from "../../database/accessor/TransactionDatabaseAccessor";
import {IStock} from "../../interface/IStock";

export class StockInformationRenderer extends Renderer {
    private stock: IStock;

    constructor(stock: IStock) {
        super();

        this.stock = stock;
    }

    render() {
        this.reset();

        const wrapper = document.getElementById("wrapper")!;

        this.htmlActions();

        const stockListWrapper = document.createElement('div');
        stockListWrapper.className = "stock-list-wrapper";

        this.htmlCheckEmptyList(stockListWrapper);

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
        // if (this.stockList.getList().length === 0) {
        //     const stockTicker = document.createElement('span');
        //     stockTicker.className = "empty-list";
        //     stockTicker.innerText = "Noch keine Transaktionen Hinterlegt. Bitte füge eine Transaktion hinzu."
        //
        //     stockListWrapper.append(stockTicker)
        // }
    }
}
