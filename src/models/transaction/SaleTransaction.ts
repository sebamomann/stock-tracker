import {Transaction} from "./Transaction";

export class SaleTransaction extends Transaction {
    // override
    getTransactionQuantity(): number {
        return -this.quantity * this.splitFactor;
    }
}
