import store from "@nxt-ui/cp-redux";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import "./styles.scss";
import Cp from "./app/app";
import {environment} from "./environments/environment";

const {deployPath} = environment;

const App = (
    <Provider store={store}>
        <Cp deployPath={deployPath} />
    </Provider>
);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(App);
