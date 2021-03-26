import axios from "axios";
import {Stock} from "./Stock";
import {IAPI_StockProfile} from "../API/IAPI_StockProfile";

export class USD_Stock extends Stock {

    constructor(ticker: string, name: string, price: number, raw: IAPI_StockProfile) {

        super(ticker, name, price, raw);

    }

    // Override
    async getPrice(): Promise<number> {
        const responseCurrency = await axios
            .get('https://api.exchangeratesapi.io/latest?base=USD',
                {
                    headers: {}
                }
            )

        return this.pricing * responseCurrency.data.rates.EUR;
    }
}
