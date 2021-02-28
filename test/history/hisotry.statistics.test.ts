import {History} from "../../src/models/History";
import {Database} from "../../src/database/Database";
import {Transaction} from "../../src/models/transaction/Transaction";

describe('Calculate statistical data of History', () => {
    beforeAll(() => {
    });

    describe('totalWorthOfCurrentlyOwnedStocks', () => {
        it('Should return correct worth', async () => {
            //mocking
            const spyNumberOfOwnedStocksFn = jest.spyOn(History.prototype, "numberOfOwnedStocks");
            spyNumberOfOwnedStocksFn.mockReturnValueOnce(10);

            const mockStockGetPrice = jest.fn()
                .mockReturnValueOnce(100); // 100€

            const mockStock = {
                getPrice: mockStockGetPrice
            };

            Database.loadTransactionsOfStock = jest.fn().mockReturnValue([{}]);

            // setup
            const history = new History(mockStock as any);

            // action
            const totalWorthOfCurrentlyOwnedStocks = await history.totalWorthOfCurrentlyOwnedStocks();

            //assert
            expect(totalWorthOfCurrentlyOwnedStocks).toBe(10 * 100);
        });
    });

    describe('getTransactionQuantity', () => {
        it('Should return correct amount of stocks owned', () => {
            //mocking
            const mockTransactionQuantityFunction = jest.fn()
                .mockReturnValueOnce(3)
                .mockReturnValueOnce(2)
                .mockReturnValueOnce(2)
                .mockReturnValueOnce(1)
                .mockReturnValueOnce(2);

            const mockTransaction = {
                getTransactionQuantity: mockTransactionQuantityFunction
            };

            const transactions: Transaction[] = [];
            for (let i = 0; i < 5; i++) {
                transactions.push(mockTransaction as any);
            }

            Database.loadTransactionsOfStock = jest.fn().mockReturnValue(transactions);

            // setup
            const history = new History(jest.mock('../../src/models/stock/Stock') as any);

            // action
            const numberOfOwnedStocks = history.numberOfOwnedStocks();

            //assert
            expect(numberOfOwnedStocks).toBe(10);
        });
    });

    describe('totalTransactionBalance', () => {
        it('Should return correct balance - only purchased stocks -> total negative value', async () => {
            //mocking
            const mockTransactionPriceFunction = jest.fn()
                .mockReturnValue(-10);

            const mockTransaction = {
                getTransactionPrice: mockTransactionPriceFunction
            };

            const transactions: Transaction[] = [];
            for (let i = 0; i < 5; i++) {
                transactions.push(mockTransaction as any);
            }

            Database.loadTransactionsOfStock = jest.fn().mockReturnValue(transactions);

            // setup
            const history = new History({} as any);

            // action
            const totalTransactionBalance = await history.totalTransactionBalance();

            //assert
            expect(totalTransactionBalance).toBe(-50);
            expect(mockTransactionPriceFunction).toHaveBeenCalledTimes(5);
        });

        it('Should return correct balance - only sold stocks -> total positive value', async () => {
            //mocking
            const mockTransactionPriceFunction = jest.fn()
                .mockReturnValue(10);

            const mockTransaction = {
                getTransactionPrice: mockTransactionPriceFunction
            };

            const transactions: Transaction[] = [];
            for (let i = 0; i < 5; i++) {
                transactions.push(mockTransaction as any);
            }

            Database.loadTransactionsOfStock = jest.fn().mockReturnValue(transactions);

            // setup
            const history = new History({} as any);

            // action
            const totalTransactionBalance = await history.totalTransactionBalance();

            //assert
            expect(totalTransactionBalance).toBe(50);
            expect(mockTransactionPriceFunction).toHaveBeenCalledTimes(5);
        });

        it('Should return correct balance - only sold and bought stocks', async () => {
            //mocking
            const mockTransactionPriceFunction = jest.fn()
                .mockReturnValueOnce(-10)
                .mockReturnValueOnce(10)
                .mockReturnValueOnce(20)
                .mockReturnValueOnce(-5)
                .mockReturnValueOnce(-10);

            const mockTransaction = {
                getTransactionPrice: mockTransactionPriceFunction
            };

            const transactions: Transaction[] = [];
            for (let i = 0; i < 5; i++) {
                transactions.push(mockTransaction as any);
            }

            Database.loadTransactionsOfStock = jest.fn().mockReturnValue(transactions);

            // setup
            const history = new History({} as any);

            // action
            const totalTransactionBalance = await history.totalTransactionBalance();

            //assert
            expect(totalTransactionBalance).toBe(5);
            expect(mockTransactionPriceFunction).toHaveBeenCalledTimes(5);
        });
    });
});
