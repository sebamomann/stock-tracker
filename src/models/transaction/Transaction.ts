import {ITransaction} from "../../interface/ITransaction";
import {Stock} from "../Stock";

export class Transaction implements ITransaction {
    stock: Stock;
    price: number;
    quantity: number;
    date: Date;
    splitFactor: number;

    constructor(stock: Stock, price: number, quantity: number, date: Date, splitFactor: number) {
        this.stock = stock;
        this.price = price;
        this.quantity = quantity;
        this.date = date;
        this.splitFactor = splitFactor;
    }

    public getTransactionPrice(): number {
        return this.price;
    }

    public getTransactionQuantity(): number {
        return this.quantity * (this.splitFactor ? this.splitFactor : 1);
    }
}
