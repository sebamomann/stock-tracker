import {prod} from "../configuration/Logger";
import {Stock} from "../models/Stock/Stock";
import {Transaction} from "../models/transaction/Transaction";
import {TransactionMapper} from "../models/transaction/TransactionMapper";
import {ITransactionDatabaseModel} from "./models/ITransactionDatabase.model";

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

        prod.info("Loaded Ticker List: " + JSON.stringify(tickers));

        return tickers;
    }

    /**
     * Fetch all transaction that have been mate for the given Stock
     *
     * @param stock {@link Stock}
     *
     * @return Transaction[]  Array of {@link SaleTransaction} and {@link PurchaseTransaction}
     */
    static loadTransactionsOfStock(stock: Stock): Transaction[] {
        let data = this.getData();

        const stockTransactions = data[stock.ticker];

        let output: Transaction[] = [];

        stockTransactions.forEach((fTransaction: any) => {
            const databaseObjectFromTransaction = TransactionMapper.transactionFromDatabaseObject(fTransaction, stock);
            output.push(databaseObjectFromTransaction);
        });

        return output;
    }

    /**
     * Store given {@link Transaction} into the database
     *
     * @param transaction {@link Transaction}
     */
    static createTransaction(transaction: Transaction): void {
        let data = this.getData();

        // create array for stock if not existing
        if (!data[transaction.stock.ticker]) {
            prod.info(`New Subarray for: ${transaction.stock.ticker}`);
            data[transaction.stock.ticker] = []
        }

        let databaseObjectFromTransaction = TransactionMapper.DatabaseObjectFromTransaction(transaction);
        data[transaction.stock.ticker].push(databaseObjectFromTransaction);

        prod.info(`DB OBJ from Transaction: ${JSON.stringify(databaseObjectFromTransaction)}`);
        prod.info(`Store to Ticker: ${transaction.stock.ticker}`);

        localStorage.setItem("database", JSON.stringify(data));
    }

    /**
     * Find given {@link Transaction} by ID and store it into the database
     *
     * @param transaction {@link Transaction}
     */
    static updateTransactionSplit(transaction: Transaction) {
        let data = this.getData();

        data[transaction.stock.ticker] = data[transaction.stock.ticker].map((fTransaction: ITransactionDatabaseModel) => {
            if (fTransaction.id === transaction.id) {
                fTransaction.splitFactor = transaction.splitFactor;
            }

            return fTransaction;
        });

        localStorage.setItem("database", JSON.stringify(data));
    }

    /**
     * Get Data Object from local storage. <br/>
     * Fill with default object, if storage is empty
     */
    private static getData(): any {
        let data: any = {};

        const data_raw = localStorage.getItem("database");
        if (data_raw) {
            data = JSON.parse(data_raw);
        }

        return data;
    }
}
