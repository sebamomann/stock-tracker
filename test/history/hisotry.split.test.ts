import {History} from "../../src/models/History";
import {Database} from "../../src/database/Database";
import {Transaction} from "../../src/models/transaction/Transaction";

describe('Create Stocksplit by adapting split factor of transaction of History', () => {
    beforeAll(() => {
    });

    describe('totalWorthOfCurrentlyOwnedStocks', () => {
        it('Correctly save all 5 updated transactions', async () => {
            //mocking
            const d = new Date();
            d.setDate(d.getDate() - 5);

            const mockTransaction = {
                date: d,
                splitFactor: 1,
            };

            const transactions: Transaction[] = [];
            for (let i = 0; i < 5; i++) {
                transactions.push({...mockTransaction, id: i} as any);
            }

            Database.loadTransactionsOfStock = jest.fn().mockReturnValue([...transactions]);
            Database.updateTransaction = jest.fn();

            // setup
            const history = new History({} as any);

            // action
            history.stockSplit(5, new Date());

            // prepare expected
            transactions.map(mTransaction => mTransaction.splitFactor *= 5);

            //assert
            expect(Database.updateTransaction).toHaveBeenCalledTimes(5);
            expect(Database.updateTransaction).toHaveBeenNthCalledWith(1, transactions[0])
            expect(Database.updateTransaction).toHaveBeenNthCalledWith(2, transactions[1])
            expect(Database.updateTransaction).toHaveBeenNthCalledWith(3, transactions[2])
            expect(Database.updateTransaction).toHaveBeenNthCalledWith(4, transactions[3])
            expect(Database.updateTransaction).toHaveBeenNthCalledWith(5, transactions[4])
        });

        it('Correctly save 3 of 5 transactions that were split', async () => {
            //mocking
            const d = new Date();
            d.setDate(d.getDate() - 5);

            const mockTransaction = {
                date: d,
                splitFactor: 1,
            };

            const transactions: Transaction[] = [];
            for (let i = 0; i < 3; i++) {
                transactions.push({...mockTransaction, id: i} as any);
            }

            const d2 = new Date();
            d2.setDate(d2.getDate() + 5);

            for (let i = 3; i < 5; i++) {
                transactions.push({...mockTransaction, id: i, date: d2} as any);
            }

            Database.loadTransactionsOfStock = jest.fn().mockReturnValue([...transactions]);
            Database.updateTransaction = jest.fn();

            // setup
            const history = new History({} as any);

            // action
            history.stockSplit(5, new Date());

            // prepare expected
            transactions.map(mTransaction => mTransaction.splitFactor *= 5);

            //assert
            expect(Database.updateTransaction).toHaveBeenCalledTimes(3);
            expect(Database.updateTransaction).toHaveBeenNthCalledWith(1, transactions[0])
            expect(Database.updateTransaction).toHaveBeenNthCalledWith(2, transactions[1])
            expect(Database.updateTransaction).toHaveBeenNthCalledWith(3, transactions[2])
        });

        it('Correctly save 0 of 5 transactions that were split', async () => {
            //mocking
            const d = new Date();
            d.setDate(d.getDate() + 5);

            const mockTransaction = {
                date: d,
                splitFactor: 1,
            };

            const transactions: Transaction[] = [];
            for (let i = 0; i < 5; i++) {
                transactions.push({...mockTransaction, id: i} as any);
            }

            Database.loadTransactionsOfStock = jest.fn().mockReturnValue([...transactions]);
            Database.updateTransaction = jest.fn();

            // setup
            const history = new History({} as any);

            // action
            history.stockSplit(5, new Date());

            //assert
            expect(Database.updateTransaction).toHaveBeenCalledTimes(0);
        });
    });
});
