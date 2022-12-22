import {IApiINotificationHistoryItem, INotificationRuleApi} from "@nxt-ui/cp/api";
import {INotificationRawData} from "@nxt-ui/cp/types";

export const historyMapper = (data: Array<IApiINotificationHistoryItem>): Array<INotificationRawData> => {
    return data.map((item) => ({
        msg_type: item.message.msgType,
        node_id: item.message.nodeId,
        apptype: item.message.appType,
        appid: item.message.appId,
        msg_priority: item.message.msgPriority,
        company_id: item.message.companyId,
        user_id: item.message.userId,
        msg_text: item.message.msgText,
        timestamp: item.createdAt,
        messageId: item.message.messageId,
    }));
};

export const enabledMapper = (data: INotificationRuleApi): INotificationRuleApi => {
    return {...data, enabled: !data.enabled};
};
