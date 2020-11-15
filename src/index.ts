import {StockList} from "./models/StockList";
import {DashboardRender} from "./usecases/dashboard/dashboard.render";

import "./style.scss";

document.addEventListener("DOMContentLoaded", function (event) {
    const list = new StockList();
    const dashboardRender = new DashboardRender(list);
    dashboardRender.render();
});
