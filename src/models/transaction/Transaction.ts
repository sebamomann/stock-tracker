import {ITransaction} from "../../interface/ITransaction";
import {Stock} from "../Stock";

export class Transaction implements ITransaction {
    price: number;
    quantity: number;
    stock: Stock;

    constructor(stock: Stock, price: number, quantity: number) {
        this.stock = stock;
        this.price = price;
        this.quantity = quantity;
    }

    getTransactionPrice(): number {
        return this.price;
    }

    getTransactionQuantity(): number {
        return this.quantity;
    }
}
