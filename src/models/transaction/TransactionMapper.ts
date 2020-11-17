import {PurchaseTransaction} from "./PurchaseTransaction";
import {SaleTransaction} from "./SaleTransaction";
import {Stock} from "../Stock";
import {Transaction} from "./Transaction";

export class TransactionMapper {
    public static transactionFromDatabaseObject(obj: any, stock: Stock) {
        let price = obj.price;
        let quantity = obj.quantity;
        let option = obj.option;
        let date = obj.date;

        let transaction: Transaction;

        switch (option) {
            case "1":
                transaction = new PurchaseTransaction(stock, price, quantity, new Date(date));
                break;
            case "2":
                transaction = new SaleTransaction(stock, price, quantity, new Date(date));
                break;
            default:
                transaction = new PurchaseTransaction(stock, price, quantity, new Date(date));
        }


        return transaction;
    }

    static DatabaseObjectFromTransaction(transaction: Transaction) {
        let obj: any = {};

        obj.price = transaction.price;
        obj.quantity = transaction.quantity;
        obj.date = transaction.date;
        obj.option = (transaction instanceof PurchaseTransaction) ? 1 : 2;

        return obj;
    }
}
