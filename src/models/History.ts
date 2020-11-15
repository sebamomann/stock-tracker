import {Stock} from "./Stock";
import {ITransaction} from "../interface/ITransaction";
import {Database} from "../service/Database";

export class History {
    private stock: Stock;
    private history: ITransaction[] = [];

    constructor(stock: Stock) {
        this.stock = stock;

        this.loadTransactionHistory();
    }

    /**
     * Load all transaction made with this particular Stock
     */
    public loadTransactionHistory() {
        this.history = Database.loadStockTransactions(this.stock);
    }

    public getHistory() {
        return this.history;
    }
}
