import {INotificationRuleApi} from "@nxt-ui/cp/api";
import {EDataProcessingStatus} from "@nxt-ui/cp/types";

export type INotificationRules = {
    rules: Array<INotificationRuleApi>;
    status: EDataProcessingStatus;
};
