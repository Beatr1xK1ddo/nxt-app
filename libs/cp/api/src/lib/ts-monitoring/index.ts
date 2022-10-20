import {ITsMonitoringParams} from "@nxt-ui/cp/types";
import axios from "axios";
import instance from "../axios";

const tsMonitoringBaseUrl = "/v2/ipbe2";

async function getTsMonitoring(params: ITsMonitoringParams) {
    try {
        const queryString = {
            nodeId: params.nodeId.toString(),
            ip: params.ip,
            port: params.port.toString(),
            appType: params.appType,
            appId: params.appId.toString(),
        };
        const searchString = new URLSearchParams(queryString).toString();
        const requestUrl = `${tsMonitoringBaseUrl}?${searchString}`;
        const response = await instance.get(requestUrl);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("Axios error: ", error);
        } else {
            console.log("Unknown error: ", error);
        }
        return Promise.reject();
    }
}

const tsMonitoring = {
    getTsMonitoring,
};

export default tsMonitoring;
