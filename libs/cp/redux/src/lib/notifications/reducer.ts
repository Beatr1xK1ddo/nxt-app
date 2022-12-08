import {combineReducers} from "@reduxjs/toolkit";
import formReducer, {NOTIFICATION_FORM} from "./form/slices";
import rulesReducer, {NOTIFICATION_RULES} from "./rules/slices";
import {IUserNotificationState} from "./types";

export const NOTIFICATIONS_SLICE_NAME = "notifications";

export default combineReducers<IUserNotificationState>({
    [NOTIFICATION_FORM]: formReducer,
    [NOTIFICATION_RULES]: rulesReducer,
});
