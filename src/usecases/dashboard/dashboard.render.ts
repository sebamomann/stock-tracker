import {StockList} from "../../models/StockList";

export class DashboardRender {
    private stockList: StockList;

    constructor(stockList: StockList) {
        this.stockList = stockList;
    }

    render() {
        const wrapper = document.getElementById("wrapper")!;
        wrapper.innerHTML = "";

        const stockListWrapper = document.createElement('div');
        stockListWrapper.className = "stock-list-wrapper";

        this.stockList
            .getList()
            .forEach((fStock) => {
                const stockBlock = document.createElement('div')!;
                stockBlock.className = "stock-block";
                stockBlock.addEventListener("click", (e: Event) => {

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
