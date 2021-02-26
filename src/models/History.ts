import {Database} from "../database/Database";
import {Transaction} from "./transaction/Transaction";
import {Stock} from "./stock/Stock";

// TODO HISTORY ANALYZER?
export class History {
    private readonly _stock: Stock;

    constructor(stock: Stock) {
        this._stock = stock;

        this.loadTransactions();
    }

    private _transactions: Transaction[] = [];

    get transactions(): Transaction[] {
        return this._transactions;
    }

    get stock(): Stock {
        return this._stock;
    }

    /**
     * Calculate the current worth of all owned Stocks (of this company)
     */
    public async totalWorthOfCurrentlyOwnedStocks(): Promise<number> {
        const quantity = this.numberOfOwnedStocks();
        const currentPrice = await this.stock.getPrice();

        return quantity * currentPrice;
    }

    /**
     * Get the number of currently owned Stocks (of this company)
     */
    public numberOfOwnedStocks() {
        let quantityOwned = 0;

        this._transactions
            .forEach((fTransaction) => {
                console.log(fTransaction)
                quantityOwned += fTransaction.getTransactionQuantity();
            });

        return quantityOwned;
    }

    /**
     * Calculate the total balance from buying and selling Stocks.<br/>
     * Sold Stocks {@link SaleTransaction} increase balance.<br/>
     * Purchased Stocks  {@link PurchaseTransaction} decrease balance
     */
    public totalTransactionBalance() {
        let balance = 0;

        this._transactions
            .forEach((fTransaction) => {
                balance += fTransaction.getTransactionPrice();
            });

        return balance;
    }

    /**
     * Adjust split factor of past orders
     *
     * @param split
     * @param date
     */
    public stockSplit(split: number, date: Date) {
        this.transactions.forEach((fTransaction) => {
            if (fTransaction.date < date) {
                fTransaction.splitFactor *= split;
                Database.updateTransactionSplit(fTransaction);
            }
        });
    }

    /**
     * Load all transaction made with this particular Stock
     */
    private loadTransactions() {
        this._transactions = Database.loadTransactionsOfStock(this._stock);
    }
}
