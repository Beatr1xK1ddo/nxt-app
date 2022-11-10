import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {applicationInitialState} from "./applications/state";
import {logsInitialState} from "./logs/state";
import {monitoringInitialState} from "./monitoring/state";
import {nodeInitialState} from "./node/state";
import {playoutInitialState} from "./playout/state";
import {projectsInitialState} from "./projects/state";
import {satelliteInitialState} from "./satellite/state";
import {INavAppItemSetPayload, INavAppSetPayload, INavigationSimpleTabState, INavigationState, INavTab} from "./types";
import {setLocalStorageBoolState} from "./utils";

export const NAVIGATION_SLICE_NAME = "navigation";

const initialState: INavigationState = {
    applications: applicationInitialState,
    projects: projectsInitialState,
    playout: playoutInitialState,
    satellite: satelliteInitialState,
    monitoring: monitoringInitialState,
    logs: logsInitialState,
    node: nodeInitialState,
};
//state slice itself
export const navigationSlice = createSlice({
    name: NAVIGATION_SLICE_NAME,
    initialState,
    reducers: {
        setApplicationItem(state, action: PayloadAction<INavAppItemSetPayload>) {
            const {stateName, tabName, subTabName} = action.payload;
            if (tabName) {
                const navState = state[stateName] as INavTab;
                const subTab = navState[tabName].tabs[subTabName];
                subTab.active = !subTab.active;
                setLocalStorageBoolState(subTabName, subTab.active);
                let shouldDisable = true;
                for (const key in navState[tabName].tabs) {
                    if (navState[tabName].tabs[key].active) {
                        shouldDisable = false;
                    }
                }
                if (shouldDisable && navState[tabName].active) {
                    navState[tabName].active = false;
                    setLocalStorageBoolState(tabName, false);
                }
                if (!navState[tabName].active && !shouldDisable) {
                    navState[tabName].active = true;
                    setLocalStorageBoolState(tabName, true);
                }
            } else {
                const navState = state[stateName] as INavigationSimpleTabState;
                navState[subTabName].active = !navState[subTabName].active;
                setLocalStorageBoolState(subTabName, navState[subTabName].active);
            }
        },
        setApplication(state, action: PayloadAction<INavAppSetPayload>) {
            const {stateName, tabName} = action.payload;
            const navState = state[stateName] as INavTab;
            const tab = navState[tabName];
            tab.active = !tab.active;
            setLocalStorageBoolState(tabName, tab.active);
            Object.keys(tab.tabs).forEach((key) => {
                tab.tabs[key].active = tab.active;
                setLocalStorageBoolState(key, tab.active);
            });
        },
    },
});

//export reducer by default
export default navigationSlice.reducer;
