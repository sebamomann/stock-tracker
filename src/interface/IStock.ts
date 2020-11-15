export interface IStock {
    name: string;
    ticker: string;
    pricing: number;

    /**
     * Fetch the current stock information from an API
     */
    getStockInfo(): void;
}
