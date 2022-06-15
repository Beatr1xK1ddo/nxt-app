//selectors
import {createDraftSafeSelector} from "@reduxjs/toolkit";
import {INotifications} from "@nxt-ui/cp/types";

import {notificationAdapter} from "./slice";
import {INotificationsState} from "./types";

const notificationsSelectors = notificationAdapter.getSelectors((state: INotificationsState) => state.data);

export const byId = notificationsSelectors.selectById;
export const all = notificationsSelectors.selectAll;
export const ids = notificationsSelectors.selectIds;
export const visibleIds = (state: INotificationsState) => state.visible;

export const visible = createDraftSafeSelector(all, visibleIds, (notifications, ids): null | INotifications => {
    return ids.length ? notifications.filter((notification) => ids.includes(notification.id)) : null;
});
