import {IGetNotificationHistoryOptions} from "@nxt-ui/cp/types";
import axios from "axios";
import {
    IApiINotificationHistoryItem,
    INotificationApp,
    INotificationAppType,
    INotificationEmployeList,
    INotificationMessageType,
    INotificationRuleApi,
} from "./types";

export * from "./types";

const instance = axios.create({
    baseURL: "https://qa.nextologies.com/v2/",
    withCredentials: true,
});

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

async function postNotification(data: INotificationRuleApi): Promise<INotificationRuleApi> {
    try {
        const request = "https://n1.nextologies.com/api/rules";
        const response = await instance.post(request, data);
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
        const response = await instance.get("notification-server/app-types");
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
        const response = await instance.get("user");
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
        const response = await instance.delete(`https://n1.nextologies.com/api/rules/${ruleId}`);
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
        const response = await instance.get(`notification-server/app-types/${appType}`);

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
        const response = await instance.get("https://n1.nextologies.com/api/message-types");
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
