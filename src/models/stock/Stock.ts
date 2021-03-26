import {IStock} from "../../interface/IStock";
import {IAPI_StockProfile} from "../API/IAPI_StockProfile";

export class Stock implements IStock {
    public name: string;
    public ticker: string;
    public pricing: number;

    /**
     * RAW API INFORMATION OF STOCK
     */
    public raw: IAPI_StockProfile

    constructor(ticker: string, name: string, price: number, raw: IAPI_StockProfile) {
        this.ticker = ticker;
        this.name = name;
        this.pricing = price;

        this.raw = raw;
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

    public getRaw(): IAPI_StockProfile {
        return this.raw;
    }
}
