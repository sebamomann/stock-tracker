import {Router} from "./Router";
import {DashboardRouter} from "./DashboardRouter";
import {StockRouter} from "./StockRouter";
import {prod} from "../configuration/Logger";
import {StockInformationRouter} from "./StockInformationRouter";

export class MainRouter extends Router {

    constructor(path: string) {
        super(path);

        prod.info("ROUTER - MAIN constructing ...");

        this.route()
            .then(
                _ => {
                    prod.info("ROUTER - Main route routed");

                    window.addEventListener('popstate', () => {
                        this.path = window.location.pathname;

                        this.route()
                            .then(
                                _ => {
                                    prod.info("ROUTER - Main route routed");
                                }
                            );
                    });
                }
            );
    }

    public async route() {
        prod.info("ROUTER - Main route called");

        const pathArray = this.path.split("/");
        const currentPath = pathArray[1];

        const redirectPath = pathArray.slice(2, pathArray.length);

        prod.info(`ROUTER - Path: ${currentPath}`);

        if (!currentPath) {
            new DashboardRouter(redirectPath.join("/"));
        } else if (currentPath === "stock") {
            new StockRouter(redirectPath.join("/"));
        } else if (currentPath === "stockInfo") {
            new StockInformationRouter(redirectPath.join("/"));
        }
    }

}
