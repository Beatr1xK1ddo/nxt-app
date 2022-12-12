import {IGetNotificationHistoryOptions} from "@nxt-ui/cp/types";
import axios from "axios";
import instance from "../axios";
import {
    IApiINotificationHistoryItem,
    INotificationApp,
    INotificationAppType,
    INotificationEmployeList,
    INotificationMessageType,
    INotificationRuleApi,
} from "./types";

export * from "./types";

const notificationsApi = {
    fetchNotificationRules,
    fetchNotificationHistory,
    fetchNotificationRule,
    fetchNotificationAppTypes,
    fetchNotificationEmploye,
    postNotification,
    deleteNotificationRule,
    fetchNotificationApps,
    fetchNotificationMessageTypes,
};

export default notificationsApi;

const instanceN1 = axios.create({
    baseURL: "https://qa.nextologies.com/v2/",
    withCredentials: true,
});

async function postNotification(data: INotificationRuleApi): Promise<INotificationRuleApi> {
    try {
        const request = "https://n1.nextologies.com/api/rules";
        const response = await instanceN1.post(request, data);
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
        const response = await instanceN1.get(request);
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
        const response = await instanceN1.get(request);
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
        const response = await instanceN1.post(request, options);
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

async function fetchNotificationAppTypes(): Promise<Array<INotificationAppType>> {
    try {
        const response = await instance.get("v2/notification-server/app-types");
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

async function fetchNotificationEmploye(): Promise<INotificationEmployeList> {
    try {
        const response = await instance.get("v2/user");
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

async function deleteNotificationRule(ruleId: string) {
    try {
        const response = await instanceN1.delete(`https://n1.nextologies.com/api/rules/${ruleId}`);
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

async function fetchNotificationApps(appType: string): Promise<Array<INotificationApp>> {
    try {
        const response = await instance.get(`v2/notification-server/app-types/${appType}`);

        console.log("response.data", response.data);
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

async function fetchNotificationMessageTypes(): Promise<Array<INotificationMessageType>> {
    try {
        const response = await instanceN1.get("https://n1.nextologies.com/api/message-types");
        console.log("response.data", response.data);
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
