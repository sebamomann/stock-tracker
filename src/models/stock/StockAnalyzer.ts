import {Stock} from "./Stock";
import {TransactionDatabaseAccessor} from "../../database/accessor/TransactionDatabaseAccessor";
import {TransactionList} from "../TransactionList";
import {IStockAnalysis} from "./stockList/IStockAnalysis";

export class StockAnalyzer {
    private readonly stock: Stock;

    private analyzedObject: IStockAnalysis = {} as any;

    constructor(stock: Stock) {
        this.stock = stock;
    }

    async getAnalyzedObject() {
        await this.analyze();

        return this.analyzedObject;
    }

    private async analyze() {
        const transactionDatabaseAccessor = new TransactionDatabaseAccessor();
        const transactionList = new TransactionList(transactionDatabaseAccessor, this.stock);

        const ticker = transactionList.stock.ticker;
        const nrOfOwnedStocks = transactionList.numberOfOwnedStocks();
        const currentTotalValue = await transactionList.totalWorthOfCurrentlyOwnedStocks();
        const spentMoneyPending = Math.abs(transactionList.balanceOfPurchasedStocksNotSold());

        this.analyzedObject = {
            ticker,
            nrOfOwnedStocks,
            currentTotalValue: Math.round(currentTotalValue),
            spentMoneyPending: spentMoneyPending
        };
    }
}
