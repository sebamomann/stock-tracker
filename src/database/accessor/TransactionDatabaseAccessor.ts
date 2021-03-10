import {ITransactionAccessor} from "./ITransactionAccessor";
import {ITransaction} from "../../interface/ITransaction";
import {Database} from "../Database";
import {TransactionMapper} from "../../models/transaction/TransactionMapper";
import {IStock} from "../../interface/IStock";

export class TransactionDatabaseAccessor implements ITransactionAccessor {
    constructor() {
    }

    getData(): ITransaction[] {
        return Database.getData();
    }

    getTransactionsByStock(stock: IStock): ITransaction[] {
        const rawTransactions: any = Database.loadTransactionsOfStock(stock);

        let output: ITransaction[] = [];

        if (rawTransactions) {
            rawTransactions.forEach(
                (fTransaction: any) => {
                    const databaseObjectFromTransaction = TransactionMapper.transactionFromDatabaseObject(fTransaction, stock);

                    output.push(databaseObjectFromTransaction);
                });
        }

        return output;
    }

    updateTransaction(transaction: ITransaction): void {
        const convertedTransaction = TransactionMapper.DatabaseObjectFromTransaction(transaction);

        Database.updateTransaction(transaction.stock, convertedTransaction);
    }

    createTransaction(transaction: ITransaction): void {
        const convertedTransaction = TransactionMapper.DatabaseObjectFromTransaction(transaction);

        Database.createTransaction(transaction.stock, convertedTransaction);
    }
}
