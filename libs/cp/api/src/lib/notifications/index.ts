import {IGetNotificationHistoryOptions} from "@nxt-ui/cp/types";
import axios from "axios";
import {IApiINotificationHistoryItem, INotificationRuleApi} from "./types";

export * from "./types";

const instance = axios.create({
    baseURL: "https://qa.nextologies.com/",
    withCredentials: true,
});

const notificationsApi = {
    fetchNotificationRules,
    fetchNotificationHistory,
    fetchNotificationRule,
    postNotification,
};

export default notificationsApi;

async function postNotification(data: INotificationRuleApi): Promise<INotificationRuleApi> {
    try {
        const request = "https://n1.nextologies.com/api/rules";
        const response = await instance.post(request, data);
        console.log("postNotification response", response.data);
        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log("Axios error: ", e);
        } else {
            console.log("Unknown error: ", e);
        }
        return Promise.reject(e);
    }
}

async function fetchNotificationRules(): Promise<Array<INotificationRuleApi>> {
    try {
        const request = "https://n1.nextologies.com/api/rules";
        const response = await instance.get(request);
        console.log("response.data", response.data);
        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log("Axios error: ", e);
        } else {
            console.log("Unknown error: ", e);
        }
        return Promise.reject();
    }
}

async function fetchNotificationRule(ruleId: string): Promise<INotificationRuleApi> {
    try {
        const request = `https://n1.nextologies.com/api/rules/${ruleId}`;
        const response = await instance.get(request);
        console.log("response.data", response.data);
        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log("Axios error: ", e);
        } else {
            console.log("Unknown error: ", e);
        }
        return Promise.reject();
    }
}

async function fetchNotificationHistory(
    options: IGetNotificationHistoryOptions
): Promise<Array<IApiINotificationHistoryItem>> {
    try {
        const request = "https://n1.nextologies.com/api/history";
        const response = await instance.post(request, options);
        console.log("response.data", response.data);
        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log("Axios error: ", e);
        } else {
            console.log("Unknown error: ", e);
        }
        return Promise.reject();
    }
}
