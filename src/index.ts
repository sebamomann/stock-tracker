import {StockList} from "./models/StockList";
import {DashboardRenderer} from "./usecases/dashboard/dashboard.renderer";

import "./style.scss";

document.addEventListener("DOMContentLoaded", function (event) {
    const list = new StockList();
    const dashboardRender = new DashboardRenderer(list);
    dashboardRender.render();
});
