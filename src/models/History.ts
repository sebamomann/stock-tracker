import {IStock} from "../interface/IStock";
import {Stock} from "./Stock";
import {Database} from "../service/Database";

export class History {
    private list: IStock[] = [];

    constructor() {
        this.loadStockList()
    }

    /**
     * Populate list with data from data provider. </br>
     * For each Element add a new {@link Stock} to the list
     */
    public loadStockList() {
        const ownedStockTickers = Database.loadOwnedStocks();

        ownedStockTickers.forEach((ticker: string) => {
            const stock = new Stock(ticker);
            this.list.push(stock)
        })
    }

    public getList() {
        return this.list;
    }
}
