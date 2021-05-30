import axios from "axios";
import {Stock} from "./Stock";
import {IAPI_StockProfile} from "../API/IAPI_StockProfile";

export class USD_Stock extends Stock {

    constructor(ticker: string, name: string, price: number, raw: IAPI_StockProfile) {

        super(ticker, name, price, raw);

    }

    async getPrice(): Promise<number> {
        const url = 'http://api.exchangeratesapi.io/latest?access_key=6f208c15294939156cbb35e81b8dbd68';

        const responseCurrency = await axios
            .get(url,
                {
                    headers: {}
                }
            )


        console.log(responseCurrency.data.rates.USD);
        const rate = 1 / responseCurrency.data.rates.USD;
        console.log(rate);
        return this.pricing * rate;

        // HINWEIS
        // AUFGRUND EINES API CHANGE IST ES NICHT MÖGLICH, USD ALS BASE AUSZUWÄLEN
        // MAN BEKOMMT IMMER NUR EUR IN ANDERE WÄHRUNGEN
        // und ist nicht mehr kostenlos ....
        // zum glück hab ichs noch getestet
    }
}
