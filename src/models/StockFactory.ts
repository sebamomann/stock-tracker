import {IAPI_StockProfile} from "./API/IAPI_StockProfile";
import {StockInfoService} from "../service/StockInfoService";
import {EUR_Stock} from "./EUR_Stock";
import {USD_Stock} from "./USD_Stock";

export class StockFactory {
    public static createStockByProfile(profile: IAPI_StockProfile) {
        let stock;

        switch (profile.currency) {
            case "EUR":
                stock = new EUR_Stock(profile.symbol, profile.companyName, profile.price);
                break;
            case "USD":
                stock = new USD_Stock(profile.symbol, profile.companyName, profile.price);
                break;
            default:
                stock = new USD_Stock(profile.symbol, profile.companyName, profile.price);
        }


        return stock;
    }

    public static async createStockByTicker(ticker: string) {
        const stockInfoService = new StockInfoService();
        const profile = await stockInfoService.getProfilesByTicker([ticker]);

        return this.createStockByProfile(profile[0]);
    }
}
