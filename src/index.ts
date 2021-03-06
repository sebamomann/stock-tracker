import "./style.scss";
import {MainRouter} from "./router/MainRouter";


function run() {
    let loaded = false;

    document.addEventListener("DOMContentLoaded", async _ => {
        if (!loaded) {
            loaded = true;

            new MainRouter(window.location.pathname);
        }
    });
}

run();
