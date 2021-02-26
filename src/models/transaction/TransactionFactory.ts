import {Transaction} from "./Transaction";
import {PurchaseTransaction} from "./PurchaseTransaction";
import {Stock} from "../Stock/Stock";
import {SaleTransaction} from "./SaleTransaction";
import {prod} from "../../configuration/Logger";

export class TransactionFactory {
    createTransaction(stock: Stock, option: number, quantity: number, price: number, date: Date) {
        let transaction: Transaction;

        let id = makeid(10);

        switch (option) {
            case 0:
                transaction = new PurchaseTransaction(id, stock, price, quantity, date, 1);
                break;
            case 1:
                transaction = new SaleTransaction(id, stock, price, quantity, date, 1);
                break;
            default:
                throw new Error("Undefined Transaction Option");
        }

        prod.info(`Created Stock for: ${stock.ticker}\r\nSelected Option: ${option}\r\nQt: ${quantity}\r\nPrice: ${price}\r\nDate: ${date}`);

        return transaction;
    }
}

// TODO OUTSOURCE
function makeid(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
