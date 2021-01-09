import {Router} from "./Router";
import {DashboardRouter} from "./DashboardRouter";
import {StockRouter} from "./StockRouter";
import {prod} from "../configuration/Logger";

export class MainRouter extends Router {

    constructor(path: string) {
        super(path);

        prod.info("ROUTER - MAIN constructing ...");

        this.route().then(r => {
            prod.info("ROUTER - Main route routed");

            window.addEventListener('popstate', () => {
                console.log('LOCATION CHANGE!');

                this.path = window.location.pathname;

                this.route().then(r => {
                    prod.info("ROUTER - Main route routed");
                });
            })
        });
    }

    public async route() {
        prod.info("ROUTER - Main route called");

        const pathArray = this.path.split("/");
        const currentPath = pathArray[1];

        const redirectPath = pathArray.slice(2, pathArray.length);

        let router;

        prod.info(`ROUTER - Path: ${currentPath}`);

        if (!currentPath) {
            router = new DashboardRouter(redirectPath.join("/"));
        } else if (currentPath === "stock") {
            router = new StockRouter(redirectPath.join("/"));
        }
    }

}
