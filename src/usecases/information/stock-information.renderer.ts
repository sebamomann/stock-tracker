import {Renderer} from "../Renderer";
import {IStock} from "../../interface/IStock";
import {TransactionListRenderer} from "../transactionList/transactionListRenderer";
import {TransactionList} from "../../models/TransactionList";
import {TransactionDatabaseAccessor} from "../../database/accessor/TransactionDatabaseAccessor";

export class StockInformationRenderer extends Renderer {
    private readonly stock: IStock;

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
        const toTransactionList = this.htmlNavigateToTransactionList();

        wrapper.appendChild(image);
        wrapper.appendChild(info);
        wrapper.appendChild(advanced);
        wrapper.appendChild(web);
        wrapper.appendChild(toTransactionList);
    }

    private image() {
        let infoWrapper = this.htmlDiv(["image-wrapper"]);
        const image = this.htmlImage();

        infoWrapper.append(image);

        return infoWrapper;
    }

    private info() {
        let infoWrapper = this.htmlDiv(["info-wrapper"]);

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
        const divClasses = [
            "info-wrapper",
            "advanced"
        ];
        const infoWrapper = this.htmlDiv(divClasses);

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
        const divClasses = [
            "info-wrapper",
            "web"
        ];
        const infoWrapper = this.htmlDiv(divClasses);

        const web = this.htmlWeb();

        infoWrapper.append(web);

        return infoWrapper;
    }

    private htmlImage() {
        let src = this.stock.getRaw().image;

        const imgClasses = [
            "info-image",
            "table-div"
        ]


        return this.htmlImg(imgClasses, src);
    }

    private htmlName() {
        let name = this.stock.name;

        const divClasses = [
            "info-name",
            "table-div"
        ]

        const div = this.htmlDiv(divClasses);
        const span1 = this.htmlSpan([], `Name`);
        const span2 = this.htmlSpan([], `${name}`);

        div.appendChild(span1);
        div.appendChild(span2);

        return div;
    }

    private htmlTicker() {
        let ticker = this.stock.ticker;

        const divClasses = [
            "info-ticker",
            "table-div"
        ]

        const div = this.htmlDiv(divClasses);
        const span1 = this.htmlSpan([], `Ticker`);
        const span2 = this.htmlSpan([], `${ticker}`);

        div.appendChild(span1);
        div.appendChild(span2);

        return div;
    }

    private htmlCurrency() {
        let currency = this.stock.getRaw().currency;

        const divClasses = [
            "info-currency",
            "table-div"
        ]

        const div = this.htmlDiv(divClasses);
        const span1 = this.htmlSpan([], `Currency`);
        const span2 = this.htmlSpan([], `${currency}`);

        div.appendChild(span1);
        div.appendChild(span2);

        return div;
    }

    private htmlCountry() {
        let country = this.stock.getRaw().country;

        const divClasses = [
            "info-country",
            "table-div"
        ]

        const div = this.htmlDiv(divClasses);
        const span1 = this.htmlSpan([], `Country`);
        const span2 = this.htmlSpan([], `${country}`);

        div.appendChild(span1);
        div.appendChild(span2);

        return div;
    }

    private htmlCeo() {
        let ceo = this.stock.getRaw().ceo;

        const divClasses = [
            "advanced-ceo",
            "table-div"
        ]

        const div = this.htmlDiv(divClasses);
        const span1 = this.htmlSpan([], `CEO`);
        const span2 = this.htmlSpan([], `${ceo}`);

        div.appendChild(span1);
        div.appendChild(span2);

        return div;
    }

    private htmlAddress() {
        let address = this.stock.getRaw().address;

        const divClasses = [
            "advanced-address",
            "table-div"
        ]

        const div = this.htmlDiv(divClasses);
        const span1 = this.htmlSpan([], `Address`);
        const span2 = this.htmlSpan([], `${address}`);

        div.appendChild(span1);
        div.appendChild(span2);

        return div;
    }

    private htmlCity() {
        let city = this.stock.getRaw().city;

        const divClasses = [
            "advanced-city",
            "table-div"
        ]

        const div = this.htmlDiv(divClasses);
        const span1 = this.htmlSpan([], `City`);
        const span2 = this.htmlSpan([], `${city}`);

        div.appendChild(span1);
        div.appendChild(span2);

        return div;
    }

    private htmlState() {
        let state = this.stock.getRaw().state;

        const divClasses = [
            "advanced-state",
            "table-div"
        ]

        const div = this.htmlDiv(divClasses);
        const span1 = this.htmlSpan([], `State`);
        const span2 = this.htmlSpan([], `${state}`);

        div.appendChild(span1);
        div.appendChild(span2);

        return div;
    }

    private htmlWeb() {
        let web = this.stock.getRaw().website;

        const divClasses = [
            "web-web",
            "table-div"
        ]

        const div = this.htmlDiv(divClasses);
        const span = this.htmlSpan([], `Website`);
        const a = this.htmlLink([], web, `${web}`);

        div.appendChild(span);
        div.appendChild(a);

        return div;
    }

    private htmlNavigateToTransactionList() {
        const buttonClasses = [
            "stock-transaction-button",
            "main-button",
            "margin"
        ];
        const buttonText = "Zu den Transaktionen";
        let navigateToTransactionList = this.htmlButton(buttonClasses, buttonText);

        navigateToTransactionList.addEventListener("click",
            this.navigateToTransactionClickListener()
        );

        return navigateToTransactionList;
    }

    private navigateToTransactionClickListener() {
        return () => {
            if (window.history.pushState) {
                const newUrl = window.location.protocol + "//" + window.location.host + "/stock" + '?ticker=' + this.stock.ticker;
                window.history.pushState({path: newUrl}, '', newUrl);
            }

            const transactionDatabaseAccessor = new TransactionDatabaseAccessor();
            const transactionList = new TransactionList(transactionDatabaseAccessor, this.stock);

            let historyRenderer = new TransactionListRenderer(transactionList);
            historyRenderer.render()
                .then(
                    _ => {
                    }
                );
        };
    }
}
