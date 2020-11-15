import {ITransaction} from "../../interface/ITransaction";
import {Transaction} from "./Transaction";

export class PurchaseTransaction extends Transaction implements ITransaction {
    // override
    getTransactionPrice(): number {
        return -this.price;
    }
}
