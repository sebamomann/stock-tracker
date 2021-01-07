import {IStock} from "../interface/IStock";

export class Stock implements IStock {
    public name: string;
    public ticker: string;
    public pricing: number;

    constructor(ticker: string, name: string, price: number) {
        this.ticker = ticker;
        this.name = name;
        this.pricing = price;
    }

    public async getPrice(): Promise<number> {
        return new Promise((resolve) => {
            return resolve(this.pricing);
        });
    }
}
