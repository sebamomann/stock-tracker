import {Stock} from "./Stock";
import {Database} from "../database/Database";
import {Transaction} from "./transaction/Transaction";

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
    public totalWorthOfCurrentlyOwnedStocks(): number {
        const quantity = this.numberOfOwnedStocks();
        const currentPrice = this.stock.getPrice();

        return quantity * currentPrice;
    }

    /**
     * Get the number of currently owned Stocks (of this company)
     */
    public numberOfOwnedStocks() {
        let quantityOwned = 0;

        this._transactions
            .forEach((fTransaction) => {
                quantityOwned += fTransaction.getTransactionQuantity();
            });

        return quantityOwned;
    }

    /**
     * Calculate the total balance from buying and selling Stocks.<br/>
     * Sold Stocks {@link SaleTransaction} increase balance.<br/>
     * Purchased Stocks  {@link PurchaseTransaction} decrease balance
     */
    public getTotalTransactionBalance() {
        let balance = 0;

        this._transactions
            .forEach((fTransaction) => {
                balance += fTransaction.getTransactionPrice();
            });

        return balance;
    }

    /**
     * Load all transaction made with this particular Stock
     */
    private loadTransactions() {
        this._transactions = Database.loadTransactionsOfStock(this._stock);
    }
}
