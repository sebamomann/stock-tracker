import {Router} from "./Router";
import {StockList} from "../models/stock/StockList";
import {DashboardRenderer} from "../usecases/dashboard/dashboard.renderer";
import {prod} from "../configuration/Logger";

export class DashboardRouter extends Router {

    constructor(path: string) {
        super(path);

        this.route().then(_ => {
            prod.info("ROUTER - Dashboard route initialized");
        });
    }

    public async route() {
        prod.info("ROUTER - Dashboard route called");

        const pathArray = this.path.split("/");
        const currentPath = pathArray[0];

        if (!currentPath) {
            const list = new StockList();
            await list.loadStockList();

            const dashboardRender = new DashboardRenderer(list);
            dashboardRender.render();
        }
    }

}
