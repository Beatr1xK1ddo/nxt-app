import {EntityState} from "@reduxjs/toolkit";
import {ENotificationType, INotification, StringId} from "@nxt-ui/cp/types";

export interface INotificationsState {
    data: EntityState<INotification>;
    visible: Array<StringId>;
}

export interface INotificationAddActionPayload extends Omit<INotification, "id" | "created" | "type"> {
    id?: StringId;
    type?: ENotificationType;
}
