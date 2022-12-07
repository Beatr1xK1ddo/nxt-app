import {IEmailDelivery, ISlackDelivery, ISmsDelivery, IUserIdDelivery} from "@nxt-ui/cp/api";
import {ENotificationDeliveryChannel, IFormError, Optional} from "@nxt-ui/cp/types";

export type IUserNotificationKeys = keyof INotificationErrorState;

export enum EManualSelectionBool {
    cpOperations = "cpOperations",
    playoutEvents = "playoutEvents",
    mamEvents = "mamEvents",
    cronEvents = "cronEvents",
    selectAll = "selectAll",
    applicationEvents = "applicationEvents",
}
export enum EManualSelectionArr {
    ipMonitoringEvents = "ipMonitoringEvents",
    serverEvents = "serverEvents",
}

export type INotificationState = {
    id?: number;
    where: {
        nodeId: Optional<number>;
        appType: Optional<number>;
        apps: Optional<number>;
    };
    whome: {
        company: Optional<number>;
        employe: Optional<string>;
    };
    filter: {
        type: string;
        priority: Optional<number>;
        manualSelection: {
            cpOperations: boolean;
            playoutEvents: boolean;
            mamEvents: boolean;
            cronEvents: boolean;
            selectAll: boolean;
            applicationEvents: boolean;
            ipMonitoringEvents: Array<string>;
            serverEvents: Array<string>;
        };
        keyWords: string;
    };
    dayTime: {
        setRange: boolean;
        day: Optional<string>;
        timeStart: string;
        timeEnd: string;
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
        // timeStart: string;
        // timeEnd: string;
    };
    deliveryChannel?: {
        type?: IFormError;
        value?: {[key: string]: IFormError};
    };
    ruleName?: IFormError;
};

export type INotificationForm = {
    values: INotificationState;
    errors: Optional<INotificationErrorState>;
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
