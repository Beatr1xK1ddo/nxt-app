import {INotificationRuleApi} from "@nxt-ui/cp/api";
import {EDataProcessingStatus, INotificationRawData} from "@nxt-ui/cp/types";

export type INotificationRules = {
    status: EDataProcessingStatus;
    history: {
        values: Array<INotificationRawData>;
        lastHistoryId: string;
        process: boolean;
    };
    rules: Array<INotificationRuleApi>;
    selected: Array<string>;
};
