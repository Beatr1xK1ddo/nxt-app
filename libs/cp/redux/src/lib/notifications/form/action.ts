import {userNotificationsFormSlice, createNotification, getNotificationsRule} from "./slices";

export const userNotificationFormActions = {
    ...userNotificationsFormSlice.actions,
    createNotification,
    getNotificationsRule,
};
