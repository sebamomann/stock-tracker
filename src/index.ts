import {StockList} from "./models/StockList";
import {DashboardRenderer} from "./usecases/dashboard/dashboard.renderer";

import "./style.scss";

document.addEventListener("DOMContentLoaded", async function (event) {
    const list = new StockList();
    await list.loadStockList();

    const dashboardRender = new DashboardRenderer(list);
    dashboardRender.render();
});
