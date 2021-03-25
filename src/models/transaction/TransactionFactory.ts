import {PurchaseTransaction} from "./PurchaseTransaction";
import {SaleTransaction} from "./SaleTransaction";
import {ITransaction} from "../../interface/ITransaction";

export class TransactionFactory<T> {

    constructor() {
    }

    public createTransaction(option: number, ...args: any[]): ITransaction {
        const transactionTypes: any = {
            0: PurchaseTransaction,
            1: SaleTransaction,
        };

        return new transactionTypes[option](...args);
    }

    public createNewTransaction(option: number, ...args: any[]): ITransaction {
        let id = generateRandomIdentificationString(10);

        const transactionTypes: any = {
            0: PurchaseTransaction,
            1: SaleTransaction,
        };

        return new transactionTypes[option](id, ...args, 1);
    }
}

function generateRandomIdentificationString(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
