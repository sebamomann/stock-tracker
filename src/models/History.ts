import {Stock} from "./Stock";
import {Database} from "../service/Database";
import {Transaction} from "./transaction/Transaction";

export class History {
    private readonly _stock: Stock;
    private transactions: Transaction[] = [];

    constructor(stock: Stock) {
        this._stock = stock;

        this.loadTransactionHistory();
    }

    get stock(): Stock {
        return this._stock;
    }

    /**
     * Load all transaction made with this particular Stock
     */
    public loadTransactionHistory() {
        this.transactions = Database.loadStockTransactions(this._stock);
    }

    public getCurrentWorth(): number {
        const quantity = this.numberOfOwnedStocks();
        const currentPrice = this.stock.getPrice();

        return quantity * currentPrice;
    }

    public getTransactions() {
        return this.transactions;
    }

    public numberOfOwnedStocks() {
        let quantityOwned = 0;

        this.transactions
            .forEach((fTransaction) => {
                quantityOwned += fTransaction.getTransactionQuantity();
            });

        return quantityOwned;
    }

    public getPriceBalance() {
        let balance = 0;

        this.transactions
            .forEach((fTransaction) => {
                balance += fTransaction.getTransactionPrice();
            });

        return balance;
    }
}
