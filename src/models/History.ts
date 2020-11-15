import {Stock} from "./Stock";
import {ITransaction} from "../interface/ITransaction";
import {Database} from "../service/Database";

export class History {
    private readonly stock: Stock;

    private transactions: ITransaction[] = [];

    constructor(stock: Stock) {
        this.stock = stock;

        this.loadTransactionHistory();
    }

    /**
     * Load all transaction made with this particular Stock
     */
    public loadTransactionHistory() {
        this.transactions = Database.loadStockTransactions(this.stock);
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
