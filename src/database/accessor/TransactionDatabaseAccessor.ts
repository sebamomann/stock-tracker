import {ITransactionAccessor} from "./ITransactionAccessor";
import {ITransaction} from "../../interface/ITransaction";
import {Database} from "../Database";
import {TransactionMapper} from "../../models/transaction/TransactionMapper";
import {Stock} from "../../models/stock/Stock";

export class TransactionDatabaseAccessor implements ITransactionAccessor {
    constructor() {
    }

    public getData(): ITransaction[] {
        return Database.getData();
    }

    public getTransactionsByStock(stock: Stock): ITransaction[] {
        const rawTransactions: any = Database.loadTransactionsOfStock(stock);

        let output: ITransaction[] = [];

        if (rawTransactions) {
            rawTransactions.forEach(
                (fTransaction: any) => {
                    const databaseObjectFromTransaction = TransactionMapper
                        .transactionFromDatabaseObject(fTransaction, stock);

                    output.push(databaseObjectFromTransaction);
                });
        }

        return output;
    }

    public updateTransaction(transaction: ITransaction): void {
        const convertedTransaction = TransactionMapper.DatabaseObjectFromTransaction(transaction);

        Database.updateTransaction(transaction.stock, convertedTransaction);
    }

    public createTransaction(transaction: ITransaction): void {
        const convertedTransaction = TransactionMapper.DatabaseObjectFromTransaction(transaction);

        Database.createTransaction(transaction.stock, convertedTransaction);
    }
}
