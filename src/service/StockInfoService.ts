import {routeLogging} from "../configuration/Logger";

const axios = require('axios').default;

const API_KEY = "47514be15edda25e057c1aeb9235ef75";

export class StockInfoService {
    constructor() {
    }

    public async getProfilesByTicker(ownedStockTickers: string[]) {
        const tickers = ownedStockTickers.join(",");

        if (ownedStockTickers.length > 0) {
            let url = `https://financialmodelingprep.com/api/v3/profile/${tickers}`;
            url += `?apikey=${API_KEY}`;

            const response = await axios
                .get(url,
                    {
                        headers: {}
                    }
                )

            routeLogging.info(`Loaded Profiles for Tickers`);

            return response.data;
        }

        return [];
    }
}
