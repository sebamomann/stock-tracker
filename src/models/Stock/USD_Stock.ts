import axios from "axios";
import {Stock} from "./Stock";

export class USD_Stock extends Stock {
    constructor(ticker: string, name: string, price: number) {
        super(ticker, name, price);
    }

    // Override
    async getPrice(): Promise<number> {
        const responseCurrency = await axios.get('https://api.exchangeratesapi.io/latest?base=USD', {
            headers: {}
        })

        return this.pricing * responseCurrency.data.rates.EUR;
    }
}
