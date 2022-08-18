import {EIpbeNavAppList, ETxrNavAppList} from "@nxt-ui/cp/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ENavApplicationKeys, INavigationState} from "./types";
import {getLocalStorageBoolState, isEIpbeNavAppList, isETxrNavAppList, setLocalStorageBoolState} from "./utils";

export const NAVIGATION_SLICE_NAME = "navigation";

const initialState: INavigationState = {
    applications: {
        ipbe: {
            key: "ipbe",
            name: "SDI to IP Encoder",
            active: getLocalStorageBoolState("ipbe"),
            tabs: {
                manageIpbe: getLocalStorageBoolState("manageIpbe"),
                createIpbe: getLocalStorageBoolState("manageIpbe"),
            },
        },
        txr: {
            key: "txr",
            name: "Transfer",
            active: getLocalStorageBoolState("txr"),
            tabs: {
                manageTxr: getLocalStorageBoolState("manageTxr"),
                createTxr: getLocalStorageBoolState("createTxr"),
            },
        },
    },
};
//state slice itself
export const navigationSlice = createSlice({
    name: NAVIGATION_SLICE_NAME,
    initialState,
    reducers: {
        setApplicationItem(state, action: PayloadAction<string>) {
            if (isEIpbeNavAppList(action.payload)) {
                state.applications.ipbe.tabs[action.payload] = !state.applications.ipbe.tabs[action.payload];
                setLocalStorageBoolState(action.payload, state.applications.ipbe.tabs[action.payload]);
            }
            if (isETxrNavAppList(action.payload)) {
                state.applications.txr.tabs[action.payload] = !state.applications.txr.tabs[action.payload];
                setLocalStorageBoolState(action.payload, state.applications.txr.tabs[action.payload]);
            }
        },
        setApplication(state, action: PayloadAction<string>) {
            const app = state.applications[action.payload as ENavApplicationKeys];

            if (app) {
                app.active = !app.active;
                setLocalStorageBoolState(action.payload, app.active);

                if (action.payload === "ipbe") {
                    const keys = Object.keys(state.applications.ipbe.tabs) as Array<keyof typeof EIpbeNavAppList>;
                    keys.forEach((key) => {
                        state.applications.ipbe.tabs[key] = app.active;
                        setLocalStorageBoolState(key, app.active);
                    });
                }
                if (action.payload === "txr") {
                    const keys = Object.keys(state.applications.txr.tabs) as Array<keyof typeof ETxrNavAppList>;
                    keys.forEach((key) => {
                        state.applications.txr.tabs[key] = app.active;
                        setLocalStorageBoolState(key, app.active);
                    });
                }
            }
        },
    },
});

//export reducer by default
export default navigationSlice.reducer;
