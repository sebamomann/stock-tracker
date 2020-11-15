import {ITransaction} from "../../interface/ITransaction";
import {Stock} from "../Stock";
import {Transaction} from "./Transaction";

export class SaleTransaction extends Transaction implements ITransaction {
    constructor(stock: Stock, price: number, quantity: number) {
        super(stock, price, quantity);
    }

    // override
    getTransactionQuantity(): number {
        return -this.quantity;
    }
}
