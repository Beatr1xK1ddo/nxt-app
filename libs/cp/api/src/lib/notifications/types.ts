import {ENotificationDeliveryChannel, EFilterOption, ENotificationMessageType} from "@nxt-ui/cp/types";

export interface IApiINotificationHistoryItem {
    userId: string;
    quantity: number;
    order: number;
    lastMessageId: string;
    messageTypes: Array<ENotificationMessageType>;
    deliveryChannel: "One of 'sms', 'slack', 'email', 'cp_notification', 'crm_ticket'";
}

export interface INotificationRule {
    name: string;
    deliveryChannel: {
        type: ENotificationDeliveryChannel;
        phoneNumber: string;
    };
    filter: {
        type: EFilterOption;
        definitions: Array<{
            type: EApiDefinitionType;
            values: Array<string> | string | number;
        }>;
    };
}

export enum EApiDefinitionType {
    app_id = "app_id",
    app_type = "app_type",
    company_id = "company_id",
    message_priority = "message_priority",
    message_text = "message_text",
    message_type = "message_type",
    node_id = "node_id",
    user_id = "user_id",
}
