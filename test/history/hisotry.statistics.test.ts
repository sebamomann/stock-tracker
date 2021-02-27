import {History} from "../../src/models/History";
import {Database} from "../../src/database/Database";
import {Transaction} from "../../src/models/transaction/Transaction";

jest.genMockFromModule("../../src/models/transaction/Transaction");
jest.mock("../../src/models/transaction/Transaction");


describe('Calculate statistical data of History', () => {
    beforeAll(() => {
    });

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
