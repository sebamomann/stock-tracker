import {TransactionFactory} from "../../src/models/transaction/TransactionFactory";
import {Stock} from "../../src/models/stock/Stock";

describe('Check implementation of transactions', () => {
    beforeAll(() => {
    });

    describe('Purchase transaction', () => {
        it('Return negative price balance', async () => {

            const transactionFactory = new TransactionFactory();
            const transaction = transactionFactory.createTransaction({} as Stock, 0, 10, 100, new Date());

            // expect
            expect(transaction.getTransactionPrice()).toBe(-100);
        });
    });

    describe('Sell transaction', () => {
        it('Return positive price balance', async () => {

            const transactionFactory = new TransactionFactory();
            const transaction = transactionFactory.createTransaction({} as Stock, 1, 10, 100, new Date());

            // expect
            expect(transaction.getTransactionPrice()).toBe(100);
        });
    });
});
