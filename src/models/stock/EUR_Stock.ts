import {Stock} from "./Stock";
import {IAPI_StockProfile} from "../API/IAPI_StockProfile";

export class EUR_Stock extends Stock {
    constructor(ticker: string, name: string, price: number, raw: IAPI_StockProfile) {
        super(ticker, name, price, raw);
    }

    // Override
    async getPrice(): Promise<number> {
        return new Promise((resolve) => {
            return resolve(this.pricing);
        });
    }
}
