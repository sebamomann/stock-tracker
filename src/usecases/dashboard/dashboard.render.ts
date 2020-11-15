import {StockList} from "../../models/StockList";
import {History} from "../../models/History";
import {Stock} from "../../models/Stock";
import {IRenderer} from "../../interface/IRenderer";
import {Renderer} from "../Renderer";
import {HistoryRenderer} from "../history/history.renderer";

export class DashboardRender extends Renderer implements IRenderer {
    private stockList: StockList;

    constructor(stockList: StockList) {
        super();

        this.stockList = stockList;
    }

    render() {
        this.reset();

        const wrapper = document.getElementById("wrapper")!;

        const stockListWrapper = document.createElement('div');
        stockListWrapper.className = "stock-list-wrapper";

        this.stockList
            .getList()
            .forEach((fStock: Stock) => {
                const stockBlock = document.createElement('div')!;
                stockBlock.className = "stock-block";
                stockBlock.addEventListener("click", (e: Event) => {
                    const history = new History(fStock);
                    const historyRenderer = new HistoryRenderer(history);
                    historyRenderer.render();
                });

                const stockName = document.createElement('span');
                stockName.className = "name";
                stockName.innerText = fStock.name;

                const stockTicker = document.createElement('span');
                stockTicker.className = "ticker";
                stockTicker.innerText = fStock.ticker;

                stockBlock.appendChild(stockName);
                stockBlock.appendChild(stockTicker);

                stockListWrapper.append(stockBlock);
            });

        wrapper.appendChild(stockListWrapper);
    }
}
