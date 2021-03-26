import {IDataAccessor} from "./IDataAccessor";
import {ITransaction} from "../../interface/ITransaction";
import {Stock} from "../../models/stock/Stock";

export interface ITransactionAccessor extends IDataAccessor {
    /**
     * Fetch list of {@link ITransaction} made for given {@link Stock}
     *
     * @param stock             {@link Stock} to get all {@link ITransaction} for
     */
    getTransactionsByStock(stock: Stock): ITransaction[];

    /**
     * Create {@link ITransaction} based on its ID.
     *
     * @param transaction       {@link ITransaction} to create
     */
    createTransaction(transaction: ITransaction): void;

    /**
     * Update {@link ITransaction} based on its ID.
     *
     * @param transaction       {@link ITransaction} to update
     */
    updateTransaction(transaction: ITransaction): void;
}
