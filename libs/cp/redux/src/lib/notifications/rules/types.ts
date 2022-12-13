import {INotificationRuleApi} from "@nxt-ui/cp/api";
import {EDataProcessingStatus, INotificationRawData} from "@nxt-ui/cp/types";

export interface INodesState {
    data: EntityState<INodesListItem>;
    status: EDataProcessingStatus;
}

export type INotificationRules = {
    status: EDataProcessingStatus;
    history: Array<INotificationRawData>;
    rules: Array<INotificationRuleApi>;
    lastHistoryId: string;
};
