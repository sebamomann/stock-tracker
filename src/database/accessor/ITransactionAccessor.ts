import {IDataAccessor} from "./IDataAccessor";
import {ITransaction} from "../../interface/ITransaction";
import {IStock} from "../../interface/IStock";

export interface ITransactionAccessor extends IDataAccessor {
    /**
     * Fetch list of {@link ITransaction} made for given {@link IStock}
     *
     * @param stock             {@link IStock} to get all {@link ITransaction} for
     */
    getTransactionsByStock(stock: IStock): ITransaction[];

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
