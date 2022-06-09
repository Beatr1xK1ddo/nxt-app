import {EntityState} from "@reduxjs/toolkit";
import {INotification, StringId} from "@nxt-ui/cp/types";

export interface INotificationsState {
    data: EntityState<INotification>;
    visible: Array<StringId>;
}
