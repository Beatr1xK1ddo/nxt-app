import {INotificationForm} from "./form/types";
import {INotificationRules} from "./rules/types";

export * from "./form/types";

export type IUserNotificationState = {
    form: INotificationForm;
    rules: INotificationRules;
};
