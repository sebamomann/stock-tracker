import {prod} from "../configuration/Logger";
import {Stock} from "../models/Stock";
import {PurchaseTransaction} from "../models/transaction/PurchaseTransaction";
import {SaleTransaction} from "../models/transaction/SaleTransaction";
import {Transaction} from "../models/transaction/Transaction";

export class Database {
    constructor() {
    }

    /**
     * Fetch all ticks the user has ever traded with.<br/>
     *
     * @return string[] Array of all tickers
     */
    static loadOwnedStockTickers(): string[] {
        const tickers = ['TSLA'];

        prod.info("Loaded Ticker List: " + JSON.stringify(tickers));

        return tickers;
    }

    static loadTransactionsOfStock(stock: Stock) {
        const transaction1 = new PurchaseTransaction(stock, 100, 10, new Date());
        const transaction2 = new PurchaseTransaction(stock, 200, 5, new Date());
        const transaction3 = new PurchaseTransaction(stock, 150, 5, new Date());
        const transaction4 = new PurchaseTransaction(stock, 100, 10, new Date());
        const transaction5 = new SaleTransaction(stock, 400, 20, new Date());
        const transaction6 = new SaleTransaction(stock, 300, 5, new Date());

        return [
            transaction1, transaction2, transaction3, transaction4, transaction5, transaction6
        ];
    }

    static createTransaction(transaction: Transaction) {
        prod.info(`Stored Transaction: ${transaction}`);
    }
}
