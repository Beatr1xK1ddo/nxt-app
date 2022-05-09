import store from "@nxt-ui/cp-redux";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import "./styles.scss";
import App from "./app/app";

const Application = (
    <Provider store={store}>
        <App />
    </Provider>
);

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(Application);
