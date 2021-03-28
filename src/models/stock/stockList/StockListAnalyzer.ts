import {StockList} from "./StockList";
import {StockAnalyzer} from "../StockAnalyzer";
import {IStockAnalysis} from "./IStockAnalysis";

export class StockListAnalyzer {
    private readonly stockList: StockList;

    private stockListAnalysis: IStockAnalysis[] = [];

    constructor(stockList: StockList) {
        this.stockList = stockList;
    }

    /**
     * Analyze each Stock in Stock List.
     * Store result.
     */
    public async analyze() {
        this.stockListAnalysis = [];

        for (const fStock of this.stockList.getList()) {
            const stockAnalyzer = new StockAnalyzer(fStock);
            const stockAnalysis = await stockAnalyzer.getAnalyzedObject();

            this.stockListAnalysis.push(stockAnalysis);
        }
    }

    /**
     * Return precalculated Stock analytics
     */
    public getStockAnalytics() {
        return this.stockListAnalysis;
    }

    /**
     * Calculate the total sum of owned stocks
     */
    public getNumberOfTotalOwnedStocks() {
        let owned = 0;

        this.stockListAnalysis
            .forEach(
                (stockAnalysis) => {
                    owned += stockAnalysis.nrOfOwnedStocks
                }
            );

        return owned
    }

    /**
     * Calculate the total worth of all stocks combined
     */
    public getCombinedStockWorth() {
        let worth = 0;

        this.stockListAnalysis
            .forEach(
                (stockAnalysis) => {
                    worth += stockAnalysis.currentTotalValue
                }
            );

        return worth
    }
}
