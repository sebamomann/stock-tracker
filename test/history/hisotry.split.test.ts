import {History} from "../../src/models/History";
import {Transaction} from "../../src/models/transaction/Transaction";
import {TransactionDatabaseAccessor} from "../../src/database/accessor/TransactionDatabaseAccessor";
import {anyOfClass, instance, mock, verify, when} from "ts-mockito";
import {ITransaction} from "../../src/interface/ITransaction";
import {Stock} from "../../src/models/stock/Stock";

function createMockedTransactionsOlderThanCurrentDate(numberOfStocksToCreate: number, idStartingAt: number): ITransaction[] {
    const output: ITransaction[] = [];

    const dateInPast = new Date();
    dateInPast.setDate(dateInPast.getDate() - 5);

    for (let i = idStartingAt; i < idStartingAt + numberOfStocksToCreate; i++) {
        const mockTransaction: Transaction = mock(Transaction);
        const transaction: Transaction = instance(mockTransaction);

        transaction.id = String(i);
        transaction.date = dateInPast;
        transaction.splitFactor = 1;

        output.push(transaction);
    }

    return output;
}

function createMockedTransactionsYoungerThanCurrentDate(numberOfStocksToCreate: number, idStartingAt: number): ITransaction[] {
    const output: ITransaction[] = [];

    const dateInFuture = new Date();
    dateInFuture.setDate(dateInFuture.getDate() + 5);

    for (let i = idStartingAt; i < idStartingAt + numberOfStocksToCreate; i++) {
        const mockTransaction: Transaction = mock(Transaction);
        const transaction: Transaction = instance(mockTransaction);

        transaction.id = String(i);
        transaction.date = dateInFuture;
        transaction.splitFactor = 1;

        output.push(transaction);
    }

    return output;
}

describe('Create Stocksplit by adapting split factor of transaction of History', () => {
    describe('totalWorthOfCurrentlyOwnedStocks', () => {
        it('Correctly save all 5 updated transactions', async () => {
            const transactions: ITransaction[] = [];
            transactions.push(...createMockedTransactionsOlderThanCurrentDate(5, 0));

            const mockedStock: Stock = mock(Stock);
            const mockedInstanceStock: Stock = instance(mockedStock);

            const mockedTransactionsDatabaseAccessor: TransactionDatabaseAccessor = mock(TransactionDatabaseAccessor);
            const mockedInstanceTransactionDatabaseAccessor: TransactionDatabaseAccessor = instance(mockedTransactionsDatabaseAccessor);

            when(mockedTransactionsDatabaseAccessor.getTransactionsByStock(mockedInstanceStock)).thenReturn(transactions);
            when(mockedTransactionsDatabaseAccessor.updateTransaction(anyOfClass(Transaction))).thenReturn();

            // action
            const history = new History(mockedInstanceTransactionDatabaseAccessor, mockedInstanceStock);
            history.stockSplit(5, new Date());

            // prepare expected
            transactions.map(mTransaction => mTransaction.splitFactor *= 5);

            //assert
            verify(mockedTransactionsDatabaseAccessor.getTransactionsByStock(mockedInstanceStock)).times(1);

            verify(mockedTransactionsDatabaseAccessor.updateTransaction(transactions[0])).times(1);
            verify(mockedTransactionsDatabaseAccessor.updateTransaction(transactions[1])).times(1);
            verify(mockedTransactionsDatabaseAccessor.updateTransaction(transactions[2])).times(1);
            verify(mockedTransactionsDatabaseAccessor.updateTransaction(transactions[3])).times(1);
            verify(mockedTransactionsDatabaseAccessor.updateTransaction(transactions[4])).times(1);
        });

        it('Correctly save 3 of 5 transactions that were split', async () => {
            //mocking
            const transactions: ITransaction[] = [];
            transactions.push(...createMockedTransactionsOlderThanCurrentDate(3, 0));
            transactions.push(...createMockedTransactionsYoungerThanCurrentDate(3, 2));

            const mockedStock: Stock = mock(Stock);
            const mockedInstanceStock: Stock = instance(mockedStock);

            const mockedTransactionsDatabaseAccessor: TransactionDatabaseAccessor = mock(TransactionDatabaseAccessor);
            const mockedInstanceTransactionDatabaseAccessor: TransactionDatabaseAccessor = instance(mockedTransactionsDatabaseAccessor);

            when(mockedTransactionsDatabaseAccessor.getTransactionsByStock(mockedInstanceStock)).thenReturn(transactions);
            when(mockedTransactionsDatabaseAccessor.updateTransaction(anyOfClass(Transaction))).thenReturn();

            // action
            const history = new History(mockedInstanceTransactionDatabaseAccessor, mockedInstanceStock);
            history.stockSplit(5, new Date());

            // prepare expected
            transactions.map(mTransaction => mTransaction.splitFactor *= 5);

            //assert
            verify(mockedTransactionsDatabaseAccessor.getTransactionsByStock(mockedInstanceStock)).times(1);

            verify(mockedTransactionsDatabaseAccessor.updateTransaction(transactions[0])).times(1);
            verify(mockedTransactionsDatabaseAccessor.updateTransaction(transactions[1])).times(1);
            verify(mockedTransactionsDatabaseAccessor.updateTransaction(transactions[2])).times(1);
            verify(mockedTransactionsDatabaseAccessor.updateTransaction(transactions[3])).times(0);
            verify(mockedTransactionsDatabaseAccessor.updateTransaction(transactions[4])).times(0);
        });

        it('Correctly save 0 of 5 transactions that were split', async () => {
            const transactions: ITransaction[] = [];
            transactions.push(...createMockedTransactionsYoungerThanCurrentDate(5, 0));

            const mockedStock: Stock = mock(Stock);
            const mockedInstanceStock: Stock = instance(mockedStock);

            const mockedTransactionsDatabaseAccessor: TransactionDatabaseAccessor = mock(TransactionDatabaseAccessor);
            const mockedInstanceTransactionDatabaseAccessor: TransactionDatabaseAccessor = instance(mockedTransactionsDatabaseAccessor);

            when(mockedTransactionsDatabaseAccessor.getTransactionsByStock(mockedInstanceStock)).thenReturn(transactions);
            when(mockedTransactionsDatabaseAccessor.updateTransaction(anyOfClass(Transaction))).thenReturn();

            // action
            const history = new History(mockedInstanceTransactionDatabaseAccessor, mockedInstanceStock);
            history.stockSplit(5, new Date());

            // prepare expected
            transactions.map(mTransaction => mTransaction.splitFactor *= 5);

            //assert
            verify(mockedTransactionsDatabaseAccessor.getTransactionsByStock(mockedInstanceStock)).times(1);

            verify(mockedTransactionsDatabaseAccessor.updateTransaction(transactions[0])).times(0);
            verify(mockedTransactionsDatabaseAccessor.updateTransaction(transactions[1])).times(0);
            verify(mockedTransactionsDatabaseAccessor.updateTransaction(transactions[2])).times(0);
            verify(mockedTransactionsDatabaseAccessor.updateTransaction(transactions[3])).times(0);
            verify(mockedTransactionsDatabaseAccessor.updateTransaction(transactions[4])).times(0);
        });
    });
});
