import {PurchaseTransaction} from "./PurchaseTransaction";
import {Stock} from "../stock/Stock";
import {Transaction} from "./Transaction";
import {ITransactionDatabaseModel} from "../../database/models/ITransactionDatabase.model";
import {TransactionFactory} from "./TransactionFactory";

export class TransactionMapper {
    public static transactionFromDatabaseObject(obj: ITransactionDatabaseModel, stock: Stock): Transaction {
        let id = obj.id;
        let price = obj.price;
        let quantity = obj.quantity;
        let option = obj.option;
        let date = obj.date;
        let splitFactor = obj.splitFactor;

        let transaction: Transaction;

        const transactionFactory = new TransactionFactory();
        transaction = transactionFactory.createTransaction(option, id, stock, price, quantity, new Date(date), splitFactor);

        return transaction;
    }

    static DatabaseObjectFromTransaction(transaction: Transaction): ITransactionDatabaseModel {
        let option = (transaction instanceof PurchaseTransaction) ? 0 : 1;

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
