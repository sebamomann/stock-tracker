import {ITransaction} from "../../interface/ITransaction";
import {Stock} from "../Stock";

export class Transaction implements ITransaction {
    stock: Stock;
    price: number;
    quantity: number;
    date: Date;

    constructor(stock: Stock, price: number, quantity: number, date: Date) {
        this.stock = stock;
        this.price = price;
        this.quantity = quantity;
        this.date = date;
    }

    public getTransactionPrice(): number {
        return this.price;
    }

    public getTransactionQuantity(): number {
        return this.quantity;
    }
}
