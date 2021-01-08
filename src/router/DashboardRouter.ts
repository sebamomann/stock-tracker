import {Router} from "./Router";
import {StockList} from "../models/StockList";
import {DashboardRenderer} from "../usecases/dashboard/dashboard.renderer";
import {prod} from "../configuration/Logger";

export class DashboardRouter extends Router {

    constructor(path: string) {
        super(path);

        this.route().then(r => {
            prod.info("ROUTER - Dashboard route initialized");
        });
    }

    public async route() {
        if (this.path) {

        }

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
