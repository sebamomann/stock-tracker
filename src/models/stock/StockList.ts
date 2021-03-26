import {Stock} from "./Stock";
import {Database} from "../../database/Database";
import {StockFactory} from "./StockFactory";
import {StockInfoService} from "../../service/StockInfoService";
import {routeLogging} from "../../configuration/Logger";

export class StockList {
    private list: Stock[] = [];

    constructor() {
    }

    /**
     * Populate list with data from data provider. </br>
     * For each Element add a new {@link Stock} to the list
     */
    public async loadStockList() {
        const ownedStockTickers = Database.loadOwnedStockTickers();

        const stockInfoService = new StockInfoService();
        const profiles = await stockInfoService.getProfilesByTicker(ownedStockTickers)

        if (profiles.length > 0) {
            ownedStockTickers
                .forEach(
                    (ticker: string, index: number) => {
                        const stock = StockFactory.createStockByProfile(profiles[index]);

                        this.list.push(stock)
                    }
                );
        }

        routeLogging.info(`Created Stocks by Profiles`);
    }

    public add(stock: Stock) {
        this.list.push(stock);
    }

    public getList() {
        return this.list;
    }
}
