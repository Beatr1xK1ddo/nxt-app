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
    userId: string;
    quantity: number;
    order: number;
    lastMessageId: string;
    messageTypes: Array<ENotificationMessageType>;
    deliveryChannel: "One of 'sms', 'slack', 'email', 'cp_notification', 'crm_ticket'";
}

export type IDeliveryChannel = ISmsDelivery | IEmailDelivery | IUserIdDelivery | ISlackDelivery;

export type IFilterValue = {
    type: EApiDefinitionType;
    value: string | number;
};
export type IFilterValues = {
    type: EApiDefinitionType;
    values: Array<string>;
};

export interface INotificationRuleApi {
    id?: number;
    name: string;
    userId: string;
    deliveryChannel: {
        type: ENotificationDeliveryChannel;
    } & IDeliveryChannel;
    filter: {
        type: EFilterOption;
        definitions: Array<IFilterValues | IFilterValue>;
    };
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
