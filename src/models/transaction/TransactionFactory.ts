import {PurchaseTransaction} from "./PurchaseTransaction";
import {SaleTransaction} from "./SaleTransaction";
import {ITransaction} from "../../interface/ITransaction";

export class TransactionFactory<T> {

    constructor() {
    }

    public createTransaction(option: number, ...args: any[]): ITransaction {
        let id = makeid(10);

        const drinks: any = {
            0: PurchaseTransaction,
            1: SaleTransaction,
        };

        return new drinks[option](id, ...args, 1);
    }
}

// TODO OUTSOURCE
function makeid(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
