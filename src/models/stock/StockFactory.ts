import {IAPI_StockProfile} from "../API/IAPI_StockProfile";
import {StockInfoService} from "../../service/StockInfoService";
import {EUR_Stock} from "./EUR_Stock";
import {USD_Stock} from "./USD_Stock";

export class StockFactory {
    public static createStockByProfile(profile: IAPI_StockProfile) {
        const stockTypes: any = {
            "EUR": EUR_Stock,
            "USD": USD_Stock,
        };

        let stock;

        try {
            stock = new stockTypes[profile.currency](profile.symbol, profile.companyName, profile.price);
        } catch (e) {
            stock = new stockTypes["USD"](profile.symbol, profile.companyName, profile.price);
        }

        return stock;
    }

    public static async createStockByTicker(ticker: string) {
        const stockInfoService = new StockInfoService();
        const profile = await stockInfoService.getProfilesByTicker([ticker]);

        return this.createStockByProfile(profile[0]);
    }
}
