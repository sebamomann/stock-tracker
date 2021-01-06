import {Transaction} from "./Transaction";
import {PurchaseTransaction} from "./PurchaseTransaction";
import {Stock} from "../Stock";
import {SaleTransaction} from "./SaleTransaction";
import {prod} from "../../configuration/Logger";

export class TransactionFactory {
    createTransaction(stock: Stock, option: number, quantity: number, price: number, date: Date) {
        let transaction: Transaction;

        switch (option) {
            case 0:
                transaction = new PurchaseTransaction(stock, price, quantity, date, 1);
                break;
            case 1:
                transaction = new SaleTransaction(stock, price, quantity, date, 1);
                break;
            default:
                throw new Error("Undefined Transaction Option");
        }

        prod.info(`Created Stock for: ${stock.ticker}\r\nSelected Option: ${option}\r\nQt: ${quantity}\r\nPrice: ${price}\r\nDate: ${date}`);

        return transaction;
    }
}
