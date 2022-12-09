import {
    userNotificationsFormSlice,
    createNotification,
    getNotificationsRule,
    fetchNotificationAppTypes,
    fetchNotificationEmploye,
    fetchNotificationApps,
    fetchNotificationMessageTypes,
} from "./slices";

export const userNotificationFormActions = {
    ...userNotificationsFormSlice.actions,
    createNotification,
    getNotificationsRule,
    fetchNotificationAppTypes,
    fetchNotificationEmploye,
    fetchNotificationApps,
    fetchNotificationMessageTypes,
};
