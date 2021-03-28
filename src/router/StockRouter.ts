import {Router} from "./Router";
import {routeLogging} from "../configuration/Logger";
import {TransactionList} from "../models/TransactionList";
import {TransactionListRenderer} from "../usecases/transactionList/transactionListRenderer";
import {StockFactory} from "../models/stock/StockFactory";
import {InvalidStock} from "../models/stock/InvalidStock";
import {TransactionDatabaseAccessor} from "../database/accessor/TransactionDatabaseAccessor";

export class StockRouter extends Router {

    constructor(path: string) {
        super(path);

        routeLogging.info("Constructing STOCK Router");

        this.route()
            .then(
                _ => {
                    routeLogging.info("Successfully routed STOCK Route");
                }
            );
    }

    public async route() {
        routeLogging.info("Routing STOCK ...");

        const pathArray = this.path.split("/");
        const currentPath = pathArray[0];

        if (!currentPath) {
            const urlParams = new URLSearchParams(window.location.search);
            const ticker = urlParams.get('ticker');

            let stock = new InvalidStock();

            if (ticker) {
                stock = await StockFactory.createStockByTicker(ticker);
            }

            const transactionsDatabaseAccessor = new TransactionDatabaseAccessor();
            const transactionList = new TransactionList(transactionsDatabaseAccessor, stock);

            const transactionListRenderer = new TransactionListRenderer(transactionList);
            await transactionListRenderer.render();
        }
    }

}
