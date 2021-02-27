import {IStock} from "../../interface/IStock";

export class Stock implements IStock {
    public name: string;
    public ticker: string;
    public pricing: number;

    constructor(ticker: string, name: string, price: number) {
        this.ticker = ticker;
        this.name = name;
        this.pricing = price;
    }

    /**
     * Get price of Stock at the time of its creation<br/
     * Async for proper extension of class.<br/>
     * Extending classes request price conversion from external API.<br/>
     *
     * @return Promise<number>      Price converted in to EUR with current factor
     */
    public async getPrice(): Promise<number> {
        return new Promise((resolve) => {
            return resolve(this.pricing);
        });
    }
}
