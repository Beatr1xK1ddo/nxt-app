import {
    userNotificationsFormSlice,
    createNotification,
    getNotificationsRule,
    fetchNotificationAppTypes,
    fetchNotificationEmploye,
} from "./slices";

export const userNotificationFormActions = {
    ...userNotificationsFormSlice.actions,
    createNotification,
    getNotificationsRule,
    fetchNotificationAppTypes,
    fetchNotificationEmploye,
};
