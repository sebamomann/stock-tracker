export class Router {
    public path: string;

    constructor(path: string) {
        this.path = path;

        this.route().then();
    }

    /**
     * Route based on URL Path
     */
    public async route() {

    }
}
