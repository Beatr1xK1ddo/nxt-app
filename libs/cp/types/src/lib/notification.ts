export enum ENotificationMessageType {
    Monitoring_Alert = "Monitoring_Alert",
    Application_Alert = "Application_Alert",
    Application_Event = "Application_Event",
    Server_Alert = "Server_Alert",
    Server_Event = "Server_Event",
    CP_Alert = "CP_Alert",
    CP_Event = "CP_Event",
    CP_Operation = "CP_Operation",
    Playout_Alert = "Playout_Alert",
    Playout_Event = "Playout_Event",
    MAM_Event = "MAM_Event",
    Cron_Event = "Cron_Event",
}

export interface INotificationRawData {
    msg_type: string;
    node_id: number;
    apptype: string;
    appid: string;
    msg_priority: number;
    company_id: number;
    user_id: number;
    msg_text: string;
    timestamp: number;
    messageId: string;
}

export enum ENotificationDeliveryChannel {
    sms = "sms",
    slack = "slack",
    email = "email",
    cp_notification = "cp_notification",
    crm_ticket = "crm_ticket",
}

export enum EFilterOption {
    and = "and",
    or = "or",
}

export enum ENotificationPriority {
    "Critical" = 1,
    "Important" = 2,
    "High Priority" = 3,
    "Normal Priority" = 4,
    "Low Priority" = 5,
}

export interface IGetNotificationHistoryOptions {
    userId: string;
    quantity: number;
    order: number;
    lastMessageId: string;
    messageTypes: Array<ENotificationMessageType>;
    deliveryChannel: ENotificationDeliveryChannel;
}
