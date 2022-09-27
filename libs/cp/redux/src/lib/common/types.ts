import {INodesState} from "./nodes";
import {ICompaniesState} from "./companies";
import {INotificationsState} from "./notifications";
import {IProxyServersState} from "./proxyServers";
import {INavigationState} from "./navigation";
import {IApplicationsState} from "./applications";
import {IBaseAppState} from "./baseApp";

export interface ICommonState {
    nodes: INodesState;
    companies: ICompaniesState;
    notifications: INotificationsState;
    proxyServers: IProxyServersState;
    navigation: INavigationState;
    applications: IApplicationsState;
    baseApp: IBaseAppState;
}
