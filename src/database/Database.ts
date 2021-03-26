import {DatabaseLogging} from "../configuration/Logger";
import {Stock} from "../models/stock/Stock";
import {Transaction} from "../models/transaction/Transaction";
import {ITransactionDatabaseModel} from "./models/ITransactionDatabase.model";
import {ITransaction} from "../interface/ITransaction";

export class Database {
    constructor() {
    }

    /**
     * Fetch all ticker symbols the user has ever traded with.<br/>
     *
     * @return string[] Array of all tickers
     */
    static loadOwnedStockTickers(): string[] {
        let data = this.getData();
        let tickers = Object.getOwnPropertyNames(data);

        DatabaseLogging.info("Loaded Ticker List: " + JSON.stringify(tickers));

        return tickers;
    }

    /**
     * Fetch all transaction that have been mate for the given Stock
     *
     * @param stock             {@link Stock}
     *
     * @return any[]            Array of raw {@link ITransaction}
     */
    static loadTransactionsOfStock(stock: Stock): any[] {
        let data = this.getData();

        return data[stock.ticker];
    }

    /**
     * Store given {@link Transaction} into the database
     *
     * @param stock
     * @param transaction {@link Transaction}
     */
    static createTransaction(stock: Stock, transaction: ITransactionDatabaseModel): void {
        let data: any = this.getData();

        // create array for stock if not existing
        if (!data[stock.ticker]) {
            DatabaseLogging.info(`Create Subarray for Stock: ${stock.ticker}`);

            data[stock.ticker] = []
        }

        data[stock.ticker] = [transaction, ...data[stock.ticker]];

        DatabaseLogging.info(`DB Object converted from Transaction: ${JSON.stringify(transaction)}`);
        DatabaseLogging.info(`Store Object to Ticker: ${stock.ticker}`);

        localStorage.setItem("database", JSON.stringify({...data}));
    }

    /**
     * Find given {@link ITransaction} by ID and store it into the database
     *
     * @param stock         {@link IStock}
     * @param transaction   {@link ITransactionDatabaseModel}
     */
    static updateTransaction(stock: Stock, transaction: ITransactionDatabaseModel) {
        let data = this.getData();

        DatabaseLogging.info(`Update Transaction with ID: ${transaction.id}`);

        data[stock.ticker] = data[stock.ticker].map(
            (fTransaction: ITransactionDatabaseModel) => {
                if (fTransaction.id === transaction.id) {
                    fTransaction = transaction;
                }

                return fTransaction;
            });

        localStorage.setItem("database", JSON.stringify(data));
    }

    /**
     * Get Data Object from local storage. <br/>
     * Fill with default object, if storage is empty
     */
    public static getData(): any {
        let data: any = [];

        const data_raw = localStorage.getItem("database");

        if (data_raw) {
            data = JSON.parse(data_raw);
        }

        return data;
    }
}
