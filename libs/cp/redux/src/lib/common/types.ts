import {INodesState} from "./nodes";
import {ICompaniesState} from "./companies";
import {IApplicationTypeState} from "./applicationType/types";

export interface ICommonState {
    nodes: INodesState;
    companies: ICompaniesState;
    applicationTypes: IApplicationTypeState;
}
