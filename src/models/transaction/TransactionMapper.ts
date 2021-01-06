import {PurchaseTransaction} from "./PurchaseTransaction";
import {SaleTransaction} from "./SaleTransaction";
import {Stock} from "../Stock";
import {Transaction} from "./Transaction";
import {ITransactionDatabaseModel} from "../../database/models/ITransactionDatabase.model";

export class TransactionMapper {
    public static transactionFromDatabaseObject(obj: ITransactionDatabaseModel, stock: Stock): Transaction {
        let id = obj.id;
        let price = obj.price;
        let quantity = obj.quantity;
        let option = obj.option;
        let date = obj.date;
        let splitFactor = obj.splitFactor;

        let transaction: Transaction;

        switch (option) {
            case 1:
                transaction = new PurchaseTransaction(id, stock, price, quantity, new Date(date), splitFactor);
                break;
            case 2:
                transaction = new SaleTransaction(id, stock, price, quantity, new Date(date), splitFactor);
                break;
            default:
                transaction = new PurchaseTransaction(id, stock, price, quantity, new Date(date), splitFactor);
        }


        return transaction;
    }

    static DatabaseObjectFromTransaction(transaction: Transaction): ITransactionDatabaseModel {
        let option = (transaction instanceof PurchaseTransaction) ? 1 : 2;

        return {
            id: transaction.id,
            price: transaction.price,
            quantity: transaction.quantity,
            date: transaction.date,
            option,
            splitFactor: transaction.splitFactor
        };
    }
}
