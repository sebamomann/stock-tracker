import {History} from "../../src/models/History";
import {Transaction} from "../../src/models/transaction/Transaction";

describe('Calculate statistical data of History', () => {
    beforeAll(() => {
        const __loadTransaction = jest.spyOn(History.prototype as any, 'loadTransactions');
        __loadTransaction.mockImplementation(() => {
            const transactions = [];

            for (let i = 0; i < 5; i++) {
                transactions.push(jest.mock('../../src/models/transaction/Transaction'));
            }

            return transactions;
        });
    });

    it('Should return correct amount of stocks owned', () => {
        // mocks
        const getTransactionQuantityMock = jest.spyOn(Transaction.prototype, 'getTransactionQuantity');
        getTransactionQuantityMock
            .mockReturnValueOnce(3)
            .mockReturnValueOnce(2)
            .mockReturnValueOnce(2)
            .mockReturnValueOnce(1)
            .mockReturnValueOnce(2);

        // setup
        const history = new History(jest.mock('../../src/models/stock/Stock') as any);

        // action
        const numberOfOwnedStocks = history.numberOfOwnedStocks();

        expect(numberOfOwnedStocks).toBe(10);
    });
});
