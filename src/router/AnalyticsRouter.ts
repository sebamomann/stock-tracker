import {Router} from "./Router";
import {StockList} from "../models/stock/stockList/StockList";
import {routeLogging} from "../configuration/Logger";
import {StockListAnalyzer} from "../models/stock/stockList/StockListAnalyzer";
import {StockListAnalyticsRenderer} from "../usecases/analytics/stockListAnalytics.renderer";

export class AnalyticsRouter extends Router {

    constructor(path: string) {
        super(path);

        routeLogging.info("Constructing ANALYTICS Router");

        this.route()
            .then(
                _ => {
                    routeLogging.info("Successfully routed ANALYTICS Route");
                }
            );
    }

    public async route() {
        routeLogging.info("Routing ANALYTICS ...");

        const pathArray = this.path.split("/");
        const currentPath = pathArray[0];

        if (!currentPath) {
            const stockList = new StockList();
            await stockList.loadStockList();

            const stockListAnalyzer = await new StockListAnalyzer(stockList);
            await stockListAnalyzer.analyze();

            const analyticsRenderer = new StockListAnalyticsRenderer(stockListAnalyzer);
            analyticsRenderer.render();
        }
    }
}
