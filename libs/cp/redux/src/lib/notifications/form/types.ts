import {
    IEmailDelivery,
    INotificationApp,
    INotificationAppType,
    INotificationEmploye,
    INotificationMessageType,
    ISlackDelivery,
    ISmsDelivery,
    IUserIdDelivery,
} from "@nxt-ui/cp/api";
import {ENotificationDeliveryChannel, IFormError, Optional} from "@nxt-ui/cp/types";
import {EntityState} from "@reduxjs/toolkit";

export type IUserNotificationKeys = keyof INotificationErrorState;

export enum EManualSelectionArr {
    ipMonitoringEvents = "ipMonitoringEvents",
    serverEvents = "serverEvents",
}

export type INotificationState = {
    id?: string;
    where: {
        nodeId: Optional<number>;
        appType: Optional<string>;
        apps: Optional<number>;
    };
    whome: {
        company: Optional<number>;
        employe: Optional<number>;
    };
    filter: {
        type: string;
        priority: Array<number>;
        manualSelection: Array<INotificationMessageType>;
        keyWords: string;
    };
    dayTime: {
        weekdays: Array<string>;
        timezone: string;
        timerange: {
            start: Optional<string>;
            end: Optional<string>;
        };
    };
    deliveryChannel: {
        type: Optional<ENotificationDeliveryChannel>;
        value: Optional<IUserIdDelivery | IEmailDelivery | ISlackDelivery | ISmsDelivery>;
    };
    ruleName: string;
};

export type INotificationErrorState = {
    where?: {
        nodeId?: IFormError;
        appType?: IFormError;
        apps?: IFormError;
    };
    whome?: {
        company?: IFormError;
        employe?: IFormError;
    };
    what?: {
        priority?: IFormError;
        manualSelection: {
            cpOperations?: IFormError;
            ipMonitoringEvents?: IFormError;
            serverEvents?: IFormError;
            keyWords?: IFormError;
        };
    };
    dayTime?: {
        day?: IFormError;
        timeStart?: IFormError;
        timeEnd?: IFormError;
    };
    deliveryChannel?: {
        type?: IFormError;
        value?: {[key: string]: IFormError | undefined};
    };
    ruleName?: IFormError;
};

export type INotificationForm = {
    values: INotificationState;
    errors: Optional<INotificationErrorState>;
    appTypes: EntityState<INotificationAppType>;
    employes: EntityState<INotificationEmploye>;
    apps: EntityState<INotificationApp>;
    messageTypes: EntityState<INotificationMessageType>;
};

export const isIUserIdDelivery = (data: any): data is IUserIdDelivery => {
    return data && typeof data === "object" && "userId" in data;
};
export const isISmsDelivery = (data: any): data is ISmsDelivery => {
    return data && typeof data === "object" && "phoneNumber" in data;
};
export const isISlackDelivery = (data: any): data is ISlackDelivery => {
    return data && typeof data === "object" && "channel" in data;
};
export const isIEmailDelivery = (data: any): data is IEmailDelivery => {
    return data && typeof data === "object" && "email" in data;
};
