import {Renderer} from "../Renderer";
import {StockListAnalyzer} from "../../models/stock/stockList/StockListAnalyzer";
import {StockList} from "../../models/stock/stockList/StockList";
import {DashboardRenderer} from "../dashboard/dashboard.renderer";

const stc = require('string-to-color');
const Chart = require('chart.js');

// noinspection JSMethodCanBeStatic
export class StockListAnalyticsRenderer extends Renderer {
    private stockListAnalyzer: StockListAnalyzer;

    constructor(stockListAnalyzer: StockListAnalyzer) {
        super();

        this.stockListAnalyzer = stockListAnalyzer;
    }

    render() {
        this.reset();

        const wrapper = document.getElementById("wrapper")!;

        const header = this.htmlHeader();
        const charts = this.htmlCharts();

        wrapper.appendChild(header);
        wrapper.appendChild(charts);
    }

    private htmlHeader() {
        const headerDiv = this.htmlDiv(["header-div"]);

        const htmlTitle = this.htmlTitle();
        const navigateToDashboardButton = this.htmlNavigateToDashboardButton();

        headerDiv.append(htmlTitle);
        headerDiv.append(navigateToDashboardButton);

        return headerDiv;
    }

    private htmlTitle() {
        return this.htmlH1(["header"], "Analytic");
    }

    private htmlNavigateToDashboardButton() {
        const buttonClasses = [
            "dashboard-button",
            "button",
            "main-button",
            "inline"
        ];
        const buttonText = "Dashboard";
        const navigateToDashboardButton = this.htmlButton(buttonClasses, buttonText)

        navigateToDashboardButton.addEventListener("click",
            this.toDashboardClickListener()
        );

        return navigateToDashboardButton;
    }

    private htmlCharts() {
        const chartsWrapper = this.htmlDiv(["charts-wrapper"]);

        const worthChart = this.htmlWorthChart();
        const pendingProfitChart = this.htmlPendingProfitChart();

        chartsWrapper.append(worthChart);
        chartsWrapper.append(pendingProfitChart);

        return chartsWrapper;
    }

    private htmlWorthChart() {
        const divClasses = [
            "worth-chart-wrapper",
            "chart-wrapper"
        ];
        const worthChartWrapper = this.htmlDiv(divClasses);

        const chartCanvas = document.createElement("canvas");
        chartCanvas.id = "worth-chart"
        chartCanvas.width = 500

        const totalWorthOfOwnedStocks = this.stockListAnalyzer.getCombinedStockWorth();

        const spanClasses = ["title"];
        const spanText = "Gesamtwert: " + String(totalWorthOfOwnedStocks) + "€";
        const totalWorthSpan = this.htmlSpan(spanClasses, spanText);

        const values: number[] = this.stockListAnalyzer
            .getStockAnalytics()
            .map(
                (mObj) => {
                    return mObj.currentTotalValue
                }
            );

        const labels: string[] = this.stockListAnalyzer
            .getStockAnalytics()
            .map(
                (mObj) => {
                    return mObj.ticker
                }
            );

        const colors = this.stockListAnalyzer
            .getStockAnalytics()
            .map(
                (mObj) => {
                    return stc(mObj.ticker);
                }
            );

        const data = {
            datasets: [{
                data: values,
                backgroundColor: colors
            }],

            labels
        };

        const chart = new Chart(chartCanvas, {
            type: 'pie',
            data,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                legend: {
                    position: 'left',
                    labels: {
                        fontColor: "white",
                        boxWidth: 20,
                        padding: 20
                    }
                }
            }
        });

        worthChartWrapper.append(totalWorthSpan);
        worthChartWrapper.append(chartCanvas)

        return worthChartWrapper;
    }

    private htmlPendingProfitChart() {
        const divClasses = [
            "pending-profit-chart-wrapper",
            "chart-wrapper"
        ];
        const worthChartWrapper = this.htmlDiv(divClasses);

        const chartCanvas = document.createElement("canvas");
        chartCanvas.id = "pending-profit-chart"

        const values: number[] = this.stockListAnalyzer
            .getStockAnalytics()
            .map(
                (mObj) => {
                    if (mObj.nrOfOwnedStocks > 0) {
                        const potentialWin = (mObj.currentTotalValue - Math.abs(mObj.spentMoneyPending));
                        const spentMoney = mObj.spentMoneyPending;

                        return Math.round((potentialWin / spentMoney) * 100)
                    }

                    return 0;
                }
            );

        const labels: string[] = this.stockListAnalyzer
            .getStockAnalytics()
            .map(
                (mObj) => {
                    return mObj.ticker
                }
            );

        const colors = this.stockListAnalyzer
            .getStockAnalytics()
            .map(
                (mObj) => {
                    return stc(mObj.ticker);
                }
            );

        const data = {
            datasets: [{
                label: "Potential win in %",
                minBarLength: 2,
                data: values,
                backgroundColor: colors,
            }],
            labels
        };

        const chart = new Chart(chartCanvas, {
            type: 'bar',
            data,
            options: {}
        });

        worthChartWrapper.append(chartCanvas)

        return worthChartWrapper;
    }

    private toDashboardClickListener() {
        return async () => {
            if (window.history.pushState) {
                const newUrl = window.location.protocol + "//" + window.location.host;
                window.history.pushState({path: newUrl}, '', newUrl);
            }

            const stockList = new StockList();
            await stockList.loadStockList();

            let dashboardRenderer = new DashboardRenderer(stockList);
            dashboardRenderer.render();
        };
    }
}
