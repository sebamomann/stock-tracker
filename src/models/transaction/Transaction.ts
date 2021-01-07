import {ITransaction} from "../../interface/ITransaction";
import {Stock} from "../Stock";

export class Transaction implements ITransaction {
    id: string;

    stock: Stock;
    price: number;
    quantity: number;
    date: Date;
    splitFactor: number;

    constructor(id: string, stock: Stock, price: number, quantity: number, date: Date, splitFactor: number) {
        this.id = id;

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
        console.log(this.stock.name, this.id, this.quantity, this.quantity * (this.splitFactor ? this.splitFactor : 1));
        return this.quantity * (this.splitFactor ? this.splitFactor : 1);
    }
}
