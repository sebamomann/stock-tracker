import {Renderer} from "../Renderer";
import {prod} from "../../configuration/Logger";
import {IStock} from "../../interface/IStock";
import {HistoryRenderer} from "../history/history.renderer";
import {History} from "../../models/History";
import {TransactionDatabaseAccessor} from "../../database/accessor/TransactionDatabaseAccessor";

export class StockInformationRenderer extends Renderer {
    private stock: IStock;

    constructor(stock: IStock) {
        super();

        this.stock = stock;
    }

    render() {
        this.reset();

        const wrapper = document.getElementById("wrapper")!;

        const image = this.image();
        const info = this.info();
        const advanced = this.advanced();
        const web = this.web();
        const toTransactionList = this.htmlToTransactionList();

        wrapper.appendChild(image);
        wrapper.appendChild(info);
        wrapper.appendChild(advanced);
        wrapper.appendChild(web);
        wrapper.appendChild(toTransactionList);

        prod.info(`Created HTML Stock-Info for StockInfoRenderer`);
    }

    private image() {
        let infoWrapper = document.createElement('div');
        infoWrapper.className = "image-wrapper";

        const image = this.htmlImage();

        infoWrapper.append(image);

        return infoWrapper;
    }

    private info() {
        let infoWrapper = document.createElement('div');
        infoWrapper.className = "info-wrapper";

        const name = this.htmlName();
        const ticker = this.htmlTicker();
        const currency = this.htmlCurrency();
        const country = this.htmlCountry();

        infoWrapper.append(name);
        infoWrapper.append(ticker);
        infoWrapper.append(currency);
        infoWrapper.append(country);

        return infoWrapper;
    }

    private advanced() {
        let infoWrapper = document.createElement('div');
        infoWrapper.className = "info-wrapper advanced";

        const ceo = this.htmlCeo();
        const address = this.htmlAddress();
        const city = this.htmlCity();
        const state = this.htmlState();

        infoWrapper.append(ceo);
        infoWrapper.append(address);
        infoWrapper.append(city);
        infoWrapper.append(state);

        return infoWrapper;
    }

    private web() {
        let infoWrapper = document.createElement('div');
        infoWrapper.className = "info-wrapper - web";

        const web = this.htmlWeb();

        infoWrapper.append(web);

        return infoWrapper;
    }

    private htmlImage() {
        let src = this.stock.getRaw().image;

        const img = this.htmlImg("info-image table-div", src);

        return img;
    }

    private htmlName() {
        let name = this.stock.name;

        const div = this.htmlDiv("info-name table-div");
        const span1 = this.htmlSpan("", `Name`);
        const span2 = this.htmlSpan("", `${name}`);

        div.appendChild(span1);
        div.appendChild(span2);

        return div;
    }

    private htmlTicker() {
        let ticker = this.stock.ticker;

        const div = this.htmlDiv("info-ticker table-div");
        const span1 = this.htmlSpan("", `Ticker`);
        const span2 = this.htmlSpan("", `${ticker}`);

        div.appendChild(span1);
        div.appendChild(span2);

        return div;
    }

    private htmlCurrency() {
        let currency = this.stock.getRaw().currency;

        const div = this.htmlDiv("info-currency table-div");
        const span1 = this.htmlSpan("", `Currency`);
        const span2 = this.htmlSpan("", `${currency}`);

        div.appendChild(span1);
        div.appendChild(span2);

        return div;
    }

    private htmlCountry() {
        let country = this.stock.getRaw().country;

        const div = this.htmlDiv("info-country table-div");
        const span1 = this.htmlSpan("", `Country`);
        const span2 = this.htmlSpan("", `${country}`);

        div.appendChild(span1);
        div.appendChild(span2);

        return div;
    }

    private htmlCeo() {
        let ceo = this.stock.getRaw().ceo;

        const div = this.htmlDiv("advanced-ceo table-div");
        const span1 = this.htmlSpan("", `CEO`);
        const span2 = this.htmlSpan("", `${ceo}`);

        div.appendChild(span1);
        div.appendChild(span2);

        return div;
    }

    private htmlAddress() {
        let address = this.stock.getRaw().address;

        const div = this.htmlDiv("advanced-address table-div");
        const span1 = this.htmlSpan("", `Address`);
        const span2 = this.htmlSpan("", `${address}`);

        div.appendChild(span1);
        div.appendChild(span2);

        return div;
    }

    private htmlCity() {
        let city = this.stock.getRaw().city;

        const div = this.htmlDiv("advanced-city table-div");
        const span1 = this.htmlSpan("", `City`);
        const span2 = this.htmlSpan("", `${city}`);

        div.appendChild(span1);
        div.appendChild(span2);

        return div;
    }

    private htmlState() {
        let state = this.stock.getRaw().state;

        const div = this.htmlDiv("advanced-state table-div");
        const span1 = this.htmlSpan("", `State`);
        const span2 = this.htmlSpan("", `${state}`);

        div.appendChild(span1);
        div.appendChild(span2);

        return div;
    }

    private htmlWeb() {
        let web = this.stock.getRaw().website;

        const div = this.htmlDiv("web-web table-div");
        const span1 = this.htmlSpan("", `Website`);
        const a = this.htmlLink("", web, `${web}`);

        div.appendChild(span1);
        div.appendChild(a);

        return div;
    }

    private htmlToTransactionList() {
        let stockTransactionListButton = document.createElement('button');
        stockTransactionListButton.className = "stock-transaction-button button main-button margin"
        stockTransactionListButton.innerText = "Zu den Transaktionen";

        stockTransactionListButton.addEventListener("click",
            _ => {
                if (window.history.pushState) {
                    const newUrl = window.location.protocol + "//" + window.location.host + "/stock" + '?ticker=' + this.stock.ticker;
                    window.history.pushState({path: newUrl}, '', newUrl);
                }

                const transactionDatabaseAccessor = new TransactionDatabaseAccessor();
                const history = new History(transactionDatabaseAccessor, this.stock);

                let historyRenderer = new HistoryRenderer(history);
                historyRenderer.render()
                    .then(
                        _ => {
                        }
                    );
            });

        return stockTransactionListButton;
    }
}
