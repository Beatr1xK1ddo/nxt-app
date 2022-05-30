import {INodesState} from "./nodes";
import {ICompaniesState} from "./companies";
import {IEncoderVersion} from "./encoderVersions/types";

export interface ICommonState {
    nodes: INodesState;
    companies: ICompaniesState;
    encoderVersion: IEncoderVersion;
}
