import {IAPI_StockProfile} from "../models/API/IAPI_StockProfile";

export interface IStock {
    name: string;
    ticker: string;
    pricing: number;
    raw: IAPI_StockProfile

    /**
     * Return price of Stock. <br/>
     * Takes currency conversion into Account
     */
    getPrice(): Promise<number>

    /**
     * Get raw stock information fetched from stockAPI
     */
    getRaw(): IAPI_StockProfile;
}
