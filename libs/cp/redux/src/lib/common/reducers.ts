import {combineReducers} from "@reduxjs/toolkit";
import {ICommonState} from "./types";
import nodesReducer, {NODES_SLICE_NAME} from "./nodes";
import companiesReducer, {COMPANIES_SLICE_NAME} from "./companies";
import notificationsReducer, {NOTIFICATIONS_SLICE_NAME} from "./notifications";
import proxyServersReducer, {PROXY_SERVERS_SLICE_NAME} from "./proxyServers";
import navigationReducer, {NAVIGATION_SLICE_NAME} from "./navigation";
import appsReducer, {APPLICATIONS_SLICE_NAME} from "./applications";
import baseAppReduser, {BASE_APP_SLICE_NAME} from "./baseApp";

export const COMMON_SLICE_NAME = "common";

//state slice itself
export default combineReducers<ICommonState>({
    [NODES_SLICE_NAME]: nodesReducer,
    [COMPANIES_SLICE_NAME]: companiesReducer,
    [NOTIFICATIONS_SLICE_NAME]: notificationsReducer,
    [PROXY_SERVERS_SLICE_NAME]: proxyServersReducer,
    [NAVIGATION_SLICE_NAME]: navigationReducer,
    [APPLICATIONS_SLICE_NAME]: appsReducer,
    [BASE_APP_SLICE_NAME]: baseAppReduser,
});
