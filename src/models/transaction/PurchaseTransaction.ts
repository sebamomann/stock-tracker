import {ITransaction} from "../../interface/ITransaction";
import {Stock} from "../Stock";
import {Transaction} from "./Transaction";

export class PurchaseTransaction extends Transaction implements ITransaction {
    constructor(stock: Stock, price: number, quantity: number) {
        super(stock, price, quantity);
    }

    // override
    getTransactionPrice(): number {
        return -this.price;
    }
}
