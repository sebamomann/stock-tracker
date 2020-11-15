import {prod} from "../configuration/Logger";

export class Database {
    constructor() {
    }

    /**
     * Fetch all ticks the user has ever traded with.<br/>
     *
     * @return string[] Array of all tickers
     */
    static loadOwnedStocks(): string[] {
        const tickers = ['TSLA'];

        prod.info("Ticker List: " + JSON.stringify(tickers));

        return tickers;
    }
}
