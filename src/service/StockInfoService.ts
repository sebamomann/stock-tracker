export class StockInfoService {
    constructor() {
    }

    public static getStockInfo(ticker: string): any {
        // is.getSingleStockInfo(ticker).then((r: any) => console.log(r));

        const val = {ticker: ticker, name: "name_" + ticker};

        return val;
    }
}
