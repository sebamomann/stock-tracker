import {Router} from "./Router";
import {prod} from "../configuration/Logger";
import {History} from "../models/History";
import {HistoryRenderer} from "../usecases/history/history.renderer";
import {StockFactory} from "../models/StockFactory";
import {InvalidStock} from "../models/InvalidStock";

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

            const stockFactory = new StockFactory();

            let stock = new InvalidStock();

            if (ticker) {
                stock = await stockFactory.createStockByTicker(ticker);
            }

            const history = new History(stock);

            const historyRenderer = new HistoryRenderer(history);
            historyRenderer.render();
        }
    }

}
