import {Stock} from "../models/Stock";
import {ITransactionShared} from "./shared/ITrasactionShared";

export interface ITransaction extends ITransactionShared {
    stock: Stock;

    /**
     * Return the price. <br/>
     * sold (+) {@link SaleTransaction} or purchased (-) {@link PurchaseTransaction}
     */
    getTransactionPrice(): number;

    /**
     * Return the number of stocks to add or remove from the balance. <br/>
     * sold (-) {@link SaleTransaction} or purchased (+) {@link PurchaseTransaction}
     */
    getTransactionQuantity(): number;
}
