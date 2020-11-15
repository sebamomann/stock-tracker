import {ITransaction} from "../../interface/ITransaction";
import {Stock} from "../Stock";

export class Transaction implements ITransaction {
    price: number;
    quantity: number;
    stock: Stock;
    date: Date;

    constructor(stock: Stock, price: number, quantity: number, date: Date) {
        this.stock = stock;
        this.price = price;
        this.quantity = quantity;
        this.date = date;
    }

    getTransactionPrice(): number {
        return this.price;
    }

    getTransactionQuantity(): number {
        return this.quantity;
    }
}
