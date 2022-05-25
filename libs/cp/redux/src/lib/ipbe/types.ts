import {IPBE_EDIT_SLICE_NAME} from "./edit/slice";
import {IIpbeEditRootState} from "./edit/types";
import {IIpbeListState, IPBE_LIST_SLICE_NAME} from "./list";

export interface IIpbeState {
    [IPBE_LIST_SLICE_NAME]: IIpbeListState;
    [IPBE_EDIT_SLICE_NAME]: IIpbeEditRootState;
}
