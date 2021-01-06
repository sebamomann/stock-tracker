const si = require('stock-info');
var yahooStockPrices = require('yahoo-stock-prices');
const axios = require('axios').default;

export class StockInfoService {
    constructor() {
    }

    public static getStockInfo(ticker: string): any {
        // si.getSingleStockInfo(ticker).then((r: any) => console.log(r));




        // try {
        //     const response = await axios.get(yourUrl);
        // } catch (exception) {
        //     process.stderr.write(`ERROR received from ${url}: ${exception}\n`);
        // }

        // yahooStockPrices.getCurrentPrice(ticker, function (err: any, price: any) {
        //
        //     console.log(price);
        //
        // });

        const val = {ticker: ticker, name: ticker};

        return val;
    }
}
