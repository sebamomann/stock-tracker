import {History} from "../../src/models/History";
import {Transaction} from "../../src/models/transaction/Transaction";
import {ITransaction} from "../../src/interface/ITransaction";
import {instance, mock, spy, verify, when} from "ts-mockito";
import {TransactionDatabaseAccessor} from "../../src/database/accessor/TransactionDatabaseAccessor";
import {Stock} from "../../src/models/stock/Stock";

function createMockedTransactionsOlderThanCurrentDate(_mock: Transaction, numberOfStocksToCreate: number, idStartingAt: number): ITransaction[] {
    const output: ITransaction[] = [];

    const dateInPast = new Date();
    dateInPast.setDate(dateInPast.getDate() - 5);

    for (let i = idStartingAt; i < idStartingAt + numberOfStocksToCreate; i++) {
        const _transaction: ITransaction = instance(_mock);
        const transaction = {..._transaction};

        transaction.id = String(i);
        transaction.date = dateInPast;
        transaction.splitFactor = 1;

        output.push(transaction);
    }

    return output;
}

describe('Calculate statistical data of History', () => {
    beforeAll(() => {
    });

    describe('totalWorthOfCurrentlyOwnedStocks', () => {
        it('Should return correct worth', async () => {
            //mocking
            const mockedStock: Stock = mock(Stock);
            const mockedInstanceStock: Stock = instance(mockedStock);

            const mockedTransactionsDatabaseAccessor: TransactionDatabaseAccessor = mock(TransactionDatabaseAccessor);
            const mockedInstanceTransactionDatabaseAccessor: TransactionDatabaseAccessor = instance(mockedTransactionsDatabaseAccessor);

            const history: History = new History(mockedInstanceTransactionDatabaseAccessor, mockedInstanceStock);
            const spiedHistory = spy(history);

            when(mockedTransactionsDatabaseAccessor.getTransactionsByStock(mockedInstanceStock)).thenReturn([]);
            when(mockedStock.getPrice()).thenResolve(100);
            when(spiedHistory.numberOfOwnedStocks()).thenReturn(10);

            // action
            const totalWorthOfCurrentlyOwnedStocks = await history.totalWorthOfCurrentlyOwnedStocks();

            //assert
            expect(totalWorthOfCurrentlyOwnedStocks).toBe(10 * 100);
        });
    });

    describe('getTransactionQuantity', () => {
        it('Should return correct amount of stocks owned', () => {
            //mocking
            const mockTransaction: Transaction = mock(Transaction);

            const transactions: ITransaction[] = [];
            transactions.push(...createMockedTransactionsOlderThanCurrentDate(mockTransaction, 5, 0));

            const mockedStock: Stock = mock(Stock);
            const mockedInstanceStock: Stock = instance(mockedStock);

            const mockedTransactionsDatabaseAccessor: TransactionDatabaseAccessor = mock(TransactionDatabaseAccessor);
            const mockedInstanceTransactionDatabaseAccessor: TransactionDatabaseAccessor = instance(mockedTransactionsDatabaseAccessor);

            when(mockedTransactionsDatabaseAccessor.getTransactionsByStock(mockedInstanceStock)).thenReturn(transactions);
            when(mockTransaction.getTransactionQuantity()).thenReturn(3, 2, 2, 1, 2);

            // setup
            const history = new History(mockedInstanceTransactionDatabaseAccessor, mockedInstanceStock);

            // action
            const numberOfOwnedStocks = history.numberOfOwnedStocks();

            //assert
            expect(numberOfOwnedStocks).toBe(10);
        });
    });

    describe('totalTransactionBalance', () => {
        it('Should return correct balance - only purchased stocks -> total negative value', async () => {
            //mocking
            const mockTransaction: Transaction = mock(Transaction);

            const transactions: ITransaction[] = [];
            transactions.push(...createMockedTransactionsOlderThanCurrentDate(mockTransaction, 5, 0));

            const mockedStock: Stock = mock(Stock);
            const mockedInstanceStock: Stock = instance(mockedStock);

            const mockedTransactionsDatabaseAccessor: TransactionDatabaseAccessor = mock(TransactionDatabaseAccessor);
            const mockedInstanceTransactionDatabaseAccessor: TransactionDatabaseAccessor = instance(mockedTransactionsDatabaseAccessor);

            when(mockedTransactionsDatabaseAccessor.getTransactionsByStock(mockedInstanceStock)).thenReturn(transactions);
            when(mockTransaction.getTransactionPrice()).thenReturn(-10);

            // setup
            const history = new History(mockedInstanceTransactionDatabaseAccessor, mockedInstanceStock);

            // action
            const totalTransactionBalance = history.totalTransactionBalance();

            //assert
            expect(totalTransactionBalance).toBe(-50);

            verify(mockTransaction.getTransactionPrice()).times(5);
        });

        it('Should return correct balance - only sold stocks -> total positive value', async () => {
            //mocking
            const mockTransaction: Transaction = mock(Transaction);

            const transactions: ITransaction[] = [];
            transactions.push(...createMockedTransactionsOlderThanCurrentDate(mockTransaction, 5, 0));

            const mockedStock: Stock = mock(Stock);
            const mockedInstanceStock: Stock = instance(mockedStock);

            const mockedTransactionsDatabaseAccessor: TransactionDatabaseAccessor = mock(TransactionDatabaseAccessor);
            const mockedInstanceTransactionDatabaseAccessor: TransactionDatabaseAccessor = instance(mockedTransactionsDatabaseAccessor);

            when(mockedTransactionsDatabaseAccessor.getTransactionsByStock(mockedInstanceStock)).thenReturn(transactions);
            when(mockTransaction.getTransactionPrice()).thenReturn(10);

            // setup
            const history = new History(mockedInstanceTransactionDatabaseAccessor, mockedInstanceStock);

            // action
            const totalTransactionBalance = history.totalTransactionBalance();

            //assert
            expect(totalTransactionBalance).toBe(50);

            verify(mockTransaction.getTransactionPrice()).times(5);
        });

        it('Should return correct balance - only sold and bought stocks', async () => {
            //mocking
            const mockTransaction: Transaction = mock(Transaction);

            const transactions: ITransaction[] = [];
            transactions.push(...createMockedTransactionsOlderThanCurrentDate(mockTransaction, 5, 0));

            const mockedStock: Stock = mock(Stock);
            const mockedInstanceStock: Stock = instance(mockedStock);

            const mockedTransactionsDatabaseAccessor: TransactionDatabaseAccessor = mock(TransactionDatabaseAccessor);
            const mockedInstanceTransactionDatabaseAccessor: TransactionDatabaseAccessor = instance(mockedTransactionsDatabaseAccessor);

            when(mockedTransactionsDatabaseAccessor.getTransactionsByStock(mockedInstanceStock)).thenReturn(transactions);
            when(mockTransaction.getTransactionPrice()).thenReturn(-10, 10, 20, -5, -10);

            // setup
            const history = new History(mockedInstanceTransactionDatabaseAccessor, mockedInstanceStock);

            // action
            const totalTransactionBalance = history.totalTransactionBalance();

            //assert
            expect(totalTransactionBalance).toBe(5);

            verify(mockTransaction.getTransactionPrice()).times(5);
        });
    });
});
