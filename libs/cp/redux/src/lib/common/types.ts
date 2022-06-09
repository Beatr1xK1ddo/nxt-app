import {INodesState} from "./nodes";
import {ICompaniesState} from "./companies";
import {INotificationsState} from "./notifications";

export interface ICommonState {
    nodes: INodesState;
    companies: ICompaniesState;
    notifications: INotificationsState;
}
