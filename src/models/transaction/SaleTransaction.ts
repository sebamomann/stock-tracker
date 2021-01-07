import {ITransaction} from "../../interface/ITransaction";
import {Transaction} from "./Transaction";

export class SaleTransaction extends Transaction implements ITransaction {
    // override
    getTransactionQuantity(): number {
        return -this.quantity * this.splitFactor;
    }
}
