import {Stock} from "../Stock";
import {Database} from "../../../database/Database";
import {StockFactory} from "../StockFactory";
import {StockInfoService} from "../../../service/StockInfoService";

export class StockList {
    private stocks: Stock[] = [];

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

                        this.stocks.push(stock)
                    }
                );
        }
    }

    public add(stock: Stock) {
        this.stocks.push(stock);
    }

    public getList() {
        return this.stocks;
    }
}
