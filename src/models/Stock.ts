import {IStock} from "../interface/IStock";
import {StockInfoService} from "../service/StockInfoService";
import axios from "axios";

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

    async getPrice(): Promise<number> {
        if (this.pricing === 0) {
            const response = await axios.get('https://financialmodelingprep.com/api/v3/quote-short/' + this.ticker + '?apikey=47514be15edda25e057c1aeb9235ef75', {
                headers: {}
            })

            const responseCurrency = await axios.get(' https://api.exchangeratesapi.io/latest?base=USD', {
                headers: {}
            })

            // @ts-ignore
            this.pricing = response.data[0].price * responseCurrency.data.rates.EUR;
        }

        return this.pricing;
    }
}
