export interface IRenderer {
    /**
     * Render the current value
     */
    render(): void;

    /**
     * Reset the page
     */
    reset(): void;
}
