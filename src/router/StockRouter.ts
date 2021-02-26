import {Router} from "./Router";
import {prod} from "../configuration/Logger";
import {History} from "../models/History";
import {HistoryRenderer} from "../usecases/history/history.renderer";
import {StockFactory} from "../models/stock/StockFactory";
import {InvalidStock} from "../models/stock/InvalidStock";

export class StockRouter extends Router {

    constructor(path: string) {
        super(path);

        this.route().then(r => {
            prod.info("ROUTER - Stock route routed");
        });
    }

    public async route() {
        prod.info("ROUTER - Stock route called");

        const pathArray = this.path.split("/");
        const currentPath = pathArray[0];

        if (!currentPath) {
            const urlParams = new URLSearchParams(window.location.search);
            const ticker = urlParams.get('ticker');

            let stock = new InvalidStock();

            if (ticker) {
                stock = await StockFactory.createStockByTicker(ticker);
            }

            const history = new History(stock);

            const historyRenderer = new HistoryRenderer(history);
            await historyRenderer.render();
        }
    }

}
