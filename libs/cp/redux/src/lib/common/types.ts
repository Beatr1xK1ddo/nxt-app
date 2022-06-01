import {INodesState} from "./nodes";
import {ICompaniesState} from "./companies";

export interface ICommonState {
    nodes: INodesState;
    companies: ICompaniesState;
}
