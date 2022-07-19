import {INodesState} from "./nodes";
import {ICompaniesState} from "./companies";
import {INotificationsState} from "./notifications";
import {IProxyServersState} from "./proxyServers";

export interface ICommonState {
    nodes: INodesState;
    companies: ICompaniesState;
    notifications: INotificationsState;
    proxyServers: IProxyServersState;
}
