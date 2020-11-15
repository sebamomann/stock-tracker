import {Stock} from "../models/Stock";

export interface ITransaction {
    stock: Stock;
    price: number;
    quantity: number;
    date: Date;

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
