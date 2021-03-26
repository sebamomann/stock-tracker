import {Router} from "./Router";
import {StockList} from "../models/stock/StockList";
import {DashboardRenderer} from "../usecases/dashboard/dashboard.renderer";
import {routeLogging} from "../configuration/Logger";

export class DashboardRouter extends Router {

    constructor(path: string) {
        super(path);

        routeLogging.info("Constructing DASHBOARD Router");

        this.route()
            .then(
                _ => {
                    routeLogging.info("Successfully routed DASHBOARD Route");
                }
            );
    }

    public async route() {
        routeLogging.info("Routing DASHBOARD ...");

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
