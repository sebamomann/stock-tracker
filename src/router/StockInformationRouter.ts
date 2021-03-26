import {Router} from "./Router";
import {routeLogging} from "../configuration/Logger";
import {InvalidStock} from "../models/stock/InvalidStock";
import {StockFactory} from "../models/stock/StockFactory";
import {StockInformationRenderer} from "../usecases/information/stock-information.renderer";

export class StockInformationRouter extends Router {
    constructor(path: string) {
        super(path);

        routeLogging.info("Constructing STOCK_INFORMATION Router");

        this.route()
            .then(
                _ => {
                    routeLogging.info("Successfully routed STOCK_INFORMATION Route");
                }
            );
    }

    public async route() {
        routeLogging.info("Routing STOCK_INFORMATION ...");

        const pathArray = this.path.split("/");
        const currentPath = pathArray[0];

        if (!currentPath) {
            const urlParams = new URLSearchParams(window.location.search);
            const ticker = urlParams.get('ticker');

            let stock = new InvalidStock();

            if (ticker) {
                stock = await StockFactory.createStockByTicker(ticker);
            }

            const stockInformationRenderer = new StockInformationRenderer(stock);
            stockInformationRenderer.render();
        }
    }

}
