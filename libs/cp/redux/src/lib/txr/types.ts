import {ITxrListState, TXR_LIST_SLICE_NAME} from "./list";
import {ITxrEditState, TXR_EDIT_SLICE_NAME} from "./edit";
import {NumericId} from "@nxt-ui/cp/types";

export interface ITxrState {
    [TXR_LIST_SLICE_NAME]: ITxrListState;
    [TXR_EDIT_SLICE_NAME]: ITxrEditState;
}

export type IRemoveTxr = {
    id: NumericId;
    name: string;
};

export type IDeleteRequestData = Array<NumericId> | IRemoveTxr;
