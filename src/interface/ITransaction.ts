import {Stock} from "../models/Stock";

export interface ITransaction {
    stock: Stock;
    price: number;
    quantity: number;
    date: Date;

    /**
     * Return the price. <br/>
     * sold (+) or purchased (-)
     */
    getTransactionPrice(): number;

    /**
     * Return the number of stocks to add or remove from the balance. <br/>
     * sold (-) or purchased (+)
     */
    getTransactionQuantity(): number;
}
