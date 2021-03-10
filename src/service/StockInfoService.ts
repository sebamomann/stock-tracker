import {prod} from "../configuration/Logger";

const axios = require('axios').default;

export class StockInfoService {
    constructor() {
    }

    public async getProfilesByTicker(ownedStockTickers: string[]) {
        const tickers = ownedStockTickers.join(",");

        if (ownedStockTickers.length > 0) {
            const response = await axios.get('https://financialmodelingprep.com/api/v3/profile/' + tickers + '?apikey=47514be15edda25e057c1aeb9235ef75', {
                headers: {}
            })

            prod.info(`Loaded Profiles for Tickers`);

            return response.data;
        }

        return [];
    }
}
