// //selectors
import {INavigationState} from "./types";

export const selectIpbeNavTabs = (state: INavigationState) => state.applications.ipbe.tabs;
export const selectTxrNavTabs = (state: INavigationState) => state.applications.txr.tabs;
export const selectIpbeNavActive = (state: INavigationState) => state.applications.ipbe.active;
export const selectTxrNavActive = (state: INavigationState) => state.applications.txr.active;
export const selectIpbeKeyName = (state: INavigationState) => {
    const {key, name} = state.applications.ipbe;
    return {key, name};
};
export const selectTxrKeyName = (state: INavigationState) => {
    const {key, name} = state.applications.txr;
    return {key, name};
};
