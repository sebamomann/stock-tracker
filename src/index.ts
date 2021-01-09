import "./style.scss";
import {MainRouter} from "./router/MainRouter";


function run() {
    let loaded = false;

    document.addEventListener("DOMContentLoaded", async function (event) {
        if (!loaded) {
            loaded = true;

            console.log("INIT");

            const router = new MainRouter(window.location.pathname);
        }
    });
}

run();
