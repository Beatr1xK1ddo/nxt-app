import {ENotificationDeliveryChannel, EFilterOption, ENotificationMessageType, Optional} from "@nxt-ui/cp/types";
export interface ISmsDelivery {
    phoneNumber: string;
}
export interface ISlackDelivery {
    channel: string;
    username: string;
}
export interface IEmailDelivery {
    email: string;
}
export interface IUserIdDelivery {
    userId: string;
}
export interface IApiINotificationHistoryItem {
    id: string;
    userId: string;
    deliveryChannel: {
        type: ENotificationDeliveryChannel;
    } & IDeliveryChannel;
    message: {
        messageId: string;
        msgType: string;
        nodeId: number;
        appType: string;
        appId: string;
        msgPriority: number;
        companyId: number;
        userId: number;
        msgText: string;
        timestamp: number;
    };
    createdAt: number;
}

export type IDeliveryChannel = ISmsDelivery | IEmailDelivery | IUserIdDelivery | ISlackDelivery;

export type IFilterValue = {
    type: EApiDefinitionType;
    value: string | number;
};
export type IFilterValues = {
    type: EApiDefinitionType;
    values: Array<string | number>;
};

export interface INotificationRuleApi {
    id?: string;
    name: string;
    userId: string;
    deliveryChannel: {
        type: ENotificationDeliveryChannel;
    } & IDeliveryChannel;
    filter: {
        type: EFilterOption;
        definitions: Array<IFilterValues | IFilterValue>;
    };
    deliveryTime?: {
        weekdays?: Array<string>;
        timerange?: {
            start: string;
            end: string;
        };
        timezone?: string;
    };
    enabled: boolean;
}

export enum EApiDefinitionType {
    app_id = "appid",
    app_type = "apptype",
    company_id = "company_id",
    message_priority = "msg_priority",
    message_text = "msg_text",
    message_type = "msg_type",
    node_id = "node_id",
    user_id = "user_id",
}

export type INotificationAppType = {
    type: string;
    title: string;
};

export type INotificationEmploye = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
};

export type INotificationEmployeList = {
    total: number;
    data: Array<INotificationEmploye>;
};

export type INotificationApp = {
    id: number;
    name: string;
};

export type INotificationMessageType = {
    name: string;
    category: string;
};
