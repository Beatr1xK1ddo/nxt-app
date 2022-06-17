import {IIpbeListState, IPBE_LIST_SLICE_NAME} from "./list";
import {IIpbeEditState, IPBE_EDIT_SLICE_NAME} from "./edit";
import {NumericId} from "@nxt-ui/cp/types";

export interface IIpbeState {
    [IPBE_LIST_SLICE_NAME]: IIpbeListState;
    [IPBE_EDIT_SLICE_NAME]: IIpbeEditState;
}

export type IRemoveIpbe = {
    id: NumericId;
    name: string;
};

export type IDeleteRequestData = Array<NumericId> | IRemoveIpbe;
