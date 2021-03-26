import {Transaction} from "./Transaction";
import {Stock} from "../stock/Stock";

export class PurchaseTransaction extends Transaction {
    constructor(id: string, stock: Stock, price: number, quantity: number, date: Date, splitFactor: number) {
        super(id, stock, price, quantity, date, splitFactor);
    }

    getTransactionPrice(): number {
        return -this.price;
    }
}
