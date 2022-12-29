import {IGetNotificationHistoryOptions, Optional} from "@nxt-ui/cp/types";
import axios from "axios";
import instance from "../axios";
import {
    IApiINotificationHistoryItem,
    INotificationApp,
    INotificationAppType,
    INotificationEmployeList,
    INotificationMessageType,
    INotificationRuleApi,
    INotificationRulesActionPayload,
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
    notificationRulesAction,
    deleteNotificationRulesAction,
};

export default notificationsApi;

const instanceN1 = axios.create({
    baseURL: "/v2/",
    withCredentials: true,
});

async function postNotification(data: Omit<INotificationRuleApi, "createdAt">): Promise<INotificationRuleApi> {
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
        return Promise.reject(e);
    }
}

async function fetchNotificationHistory(
    options: IGetNotificationHistoryOptions
): Promise<Array<IApiINotificationHistoryItem>> {
    try {
        const request = "https://n1.nextologies.com/api/history";
        const response = await instanceN1.post(request, {...options, userId: "andreykat@nextologies.com"});
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

async function fetchNotificationAppTypes(nodeId: Optional<number>): Promise<Array<INotificationAppType>> {
    try {
        const response = await instance.get(
            nodeId ? `v2/notification-server/app-types/${nodeId}` : `v2/notification-server/app-types`
        );
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

async function fetchNotificationEmploye(id: Optional<number>): Promise<INotificationEmployeList> {
    try {
        const url = id ? `v2/user?filter[company]=${id}` : "v2/user";
        const response = await instance.get(url);
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
        return Promise.reject(e);
    }
}

async function notificationRulesAction(data: INotificationRulesActionPayload) {
    try {
        const response = await instanceN1.patch(`https://n1.nextologies.com/api/rules/toggle`, data);
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

async function deleteNotificationRulesAction(ruleIds: Array<string>) {
    try {
        const response = await instanceN1.delete(`https://n1.nextologies.com/api/rules`, {
            data: {ruleIds},
        });
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

async function fetchNotificationApps(appType?: string, nodeId?: number): Promise<Array<INotificationApp>> {
    try {
        const request =
            nodeId && appType
                ? `v2/notification-server/apps/${appType}/${nodeId}`
                : nodeId
                ? `v2/notification-server/apps/${nodeId}`
                : appType
                ? `v2/notification-server/apps/${appType}`
                : `v2/notification-server/apps`;
        const response = await instance.get(request);

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
