import {IIpbeListState, IPBE_LIST_SLICE_NAME} from "./list";

export interface IIpbeState {
    [IPBE_LIST_SLICE_NAME]: IIpbeListState;
    // edit: any;
}
