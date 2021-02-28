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
     * Calculate the current worth of all owned {@link Stock} (of this company).
     *
     * @return Promise<number>      Calculated worth of owned stocks.
     */
    public async totalWorthOfCurrentlyOwnedStocks(): Promise<number> {
        const quantity = this.numberOfOwnedStocks();
        const currentPrice = await this.stock.getPrice();

        return quantity * currentPrice;
    }

    /**
     * Get the number of currently owned {@link Stock} (of particular company specified in {@link History.stock} field)
     *
     * @return number        Owned {@link Stock}
     */
    public numberOfOwnedStocks(): number {
        let quantityOwned = 0;

        this._transactions
            .forEach(
                (fTransaction) => {
                    quantityOwned += fTransaction.getTransactionQuantity();
                }
            );

        return quantityOwned;
    }

    /**
     * Calculate the total balance from buying and selling Stocks.<br/>
     * <br/>
     * Sold {@link Stock} ({@link SaleTransaction}) increase balance.<br/>
     * Purchased {@link Stock} {@link PurchaseTransaction} decrease balance.
     *
     * @return number       Balance
     */
    public totalTransactionBalance(): number {
        let balance = 0;

        this._transactions
            .forEach(
                (fTransaction) => {
                    balance += fTransaction.getTransactionPrice();
                }
            );

        return balance;
    }

    /**
     * Adjust split factor of past orders. <br/>
     * If Transaction is older than passed date then adjust split factor.
     *
     * @param split         Split factor. e.g. 5 for 5:1 split
     * @param date          Date when split happened
     *
     * @return void         Adjusts {@link Transaction}, no return needed
     */
    public stockSplit(split: number, date: Date): void {
        this.transactions.forEach(
            (fTransaction) => {
                if (fTransaction.date < date) {
                    fTransaction.splitFactor *= split;

                    Database.updateTransaction(fTransaction);
                }
            }
        );
    }

    /**
     * Load all transaction made with this particular Stock
     *
     * @return void         Adjusts "this" scope. no return needed
     */
    private loadTransactions(): void {
        this._transactions = Database.loadTransactionsOfStock(this._stock);
    }
}
