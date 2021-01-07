export interface IStock {
    name: string;
    ticker: string;
    pricing: number;

    /**
     * Return price of Stock. <br/>
     * Takes currency conversion into Account
     */
    getPrice(): Promise<number>
}
