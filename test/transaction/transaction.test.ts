import {TransactionFactory} from "../../src/models/transaction/TransactionFactory";
import {Stock} from "../../src/models/stock/Stock";
import {instance, mock} from "ts-mockito";

describe('Check implementation of transactions', () => {
    beforeAll(() => {
    });

    describe('Purchase transaction', () => {
        it('Return negative price balance', async () => {
            const mockedStock = mock(Stock);
            const mockedInstanceStock = instance(mockedStock);

            const transactionFactory = new TransactionFactory();
            const transaction = transactionFactory.createNewTransaction(0, mockedInstanceStock, 100, 10, new Date());

            // expect
            expect(transaction.getTransactionPrice()).toBe(-100);
        });
    });

    describe('Sell transaction', () => {
        it('Return positive price balance', async () => {
            const mockedStock = mock(Stock);
            const mockedInstanceStock = instance(mockedStock);

            const transactionFactory = new TransactionFactory();
            const transaction = transactionFactory.createNewTransaction(1, mockedInstanceStock, 100, 10, new Date());

            // expect
            expect(transaction.getTransactionPrice()).toBe(100);
        });
    });
});
