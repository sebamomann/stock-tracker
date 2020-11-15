import {IStock} from "../interface/IStock";
import {StockInfoService} from "../service/StockInfoService";

export class Stock implements IStock {
    name: string = '';
    ticker: string;
    pricing: number = 0;

    constructor(ticker: string) {
        this.ticker = ticker;

        this.getStockInfo();
    }

    getStockInfo(): void {
        const stock = StockInfoService.getStockInfo(this.ticker);

        this.name = stock.name;
    }
}
