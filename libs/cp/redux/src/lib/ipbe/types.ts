import {IIpbeListState, IPBE_LIST_SLICE_NAME} from "./list";
import {IIpbeEditState, IPBE_EDIT_SLICE_NAME} from "./edit";

export * from "./edit/types";

export interface IIpbeState {
    [IPBE_LIST_SLICE_NAME]: IIpbeListState;
    [IPBE_EDIT_SLICE_NAME]: IIpbeEditState;
}
