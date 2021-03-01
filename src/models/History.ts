import {Transaction} from "./transaction/Transaction";
import {Stock} from "./stock/Stock";
import {ITransactionAccessor} from "../database/accessor/ITransactionAccessor";

// TODO HISTORY ANALYZER?
export class History {
    private readonly _transactionDatabaseAccessor: ITransactionAccessor;
    private readonly _stock: Stock;

    constructor(transactionDatabaseAccessor: ITransactionAccessor,
                stock: Stock) {
        this._stock = stock;
        this._transactionDatabaseAccessor = transactionDatabaseAccessor;

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
     * Calculate the current worth of all owned {@link IStock} (of this company).
     *
     * @return Promise<number>      Calculated worth of owned stocks.
     */
    public async totalWorthOfCurrentlyOwnedStocks(): Promise<number> {
        const quantity = this.numberOfOwnedStocks();
        const currentPrice = await this.stock.getPrice();

        return quantity * currentPrice;
    }

    /**
     * Get the number of currently owned {@link IStock} (of particular company specified in {@link History.stock} field)
     *
     * @return number        Owned {@link IStock}
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
     * Calculate the total balance from buying and selling {@link IStock}.<br/>
     * <br/>
     * Sold {@link IStock} ({@link SaleTransaction}) increase balance.<br/>
     * Purchased {@link IStock} {@link PurchaseTransaction} decrease balance.
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
     * If {@link ITransaction} is older than passed date then adjust split factor.
     *
     * @param split         Split factor. e.g. 5 for 5:1 split
     * @param date          Date when split happened
     *
     * @return void         Adjusts {@link ITransaction}, no return needed
     */
    public stockSplit(split: number, date: Date): void {
        this.transactions.forEach(
            (fTransaction) => {
                if (fTransaction.date < date) {
                    fTransaction.splitFactor *= split;

                    this._transactionDatabaseAccessor.updateTransaction(fTransaction)
                }
            }
        );
    }

    /**
     * Load all {@link ITransaction} made for this particular {@link IStock}
     *
     * @return void         Adjusts "this" scope. No return needed
     */
    private loadTransactions(): void {
        this._transactions = this._transactionDatabaseAccessor.getTransactionsByStock(this._stock);
    }
}
