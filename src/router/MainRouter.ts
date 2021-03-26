import {Router} from "./Router";
import {DashboardRouter} from "./DashboardRouter";
import {StockRouter} from "./StockRouter";
import {routeLogging} from "../configuration/Logger";
import {StockInformationRouter} from "./StockInformationRouter";

export class MainRouter extends Router {

    constructor(path: string) {
        super(path);

        routeLogging.info("Constructing MAIN Router");

        this.route()
            .then(
                _ => {
                    routeLogging.info("Successfully routed MAIN Route");

                    /**
                     * When going back
                     */
                    window.addEventListener('popstate', () => {
                        this.path = window.location.pathname;

                        this.route()
                            .then(
                                _ => {
                                    routeLogging.info("Successfully routed MAIN Route");
                                }
                            );
                    });
                }
            );
    }

    public async route() {
        routeLogging.info("Routing MAIN ...");

        const pathArray = this.path.split("/");
        const currentPath = pathArray[1];

        const redirectPath = pathArray.slice(2, pathArray.length);

        routeLogging.info(`MAIN routing to Path: ${currentPath}`);

        if (!currentPath) {
            new DashboardRouter(redirectPath.join("/"));
        } else if (currentPath === "stock") {
            new StockRouter(redirectPath.join("/"));
        } else if (currentPath === "stockInfo") {
            new StockInformationRouter(redirectPath.join("/"));
        }
    }

}
