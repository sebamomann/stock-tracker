import {Transaction} from "./Transaction";

export class PurchaseTransaction extends Transaction {
    // override
    getTransactionPrice(): number {
        return -this.price;
    }
}
