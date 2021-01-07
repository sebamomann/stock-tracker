import {Stock} from "./Stock";

export class EUR_Stock extends Stock {
    constructor(ticker: string, name: string, price: number) {
        super(ticker, name, price);
    }

    // Override
    async getPrice(): Promise<number> {
        return new Promise((resolve) => {
            return resolve(this.pricing);
        });
    }
}
