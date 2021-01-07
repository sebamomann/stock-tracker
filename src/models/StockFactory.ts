import {IAPI_StockProfile} from "./API/IAPI_StockProfile";
import {Stock} from "./Stock";
import {StockInfoService} from "../service/StockInfoService";

export class StockFactory {
    public createStockByProfile(profile: IAPI_StockProfile) {
        const stock = new Stock(profile.symbol, profile.companyName, profile.price);

        return stock;
    }

   public async createStockByTicker(ticker: string) {
      const stockInfoService = new StockInfoService();
      const profile = await stockInfoService.getProfilesByTicker([ticker]);

      const stock = this.createStockByProfile(profile);

      return stock;
   }
}
