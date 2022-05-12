import store from "./store";
import {IProcessingState, PROCESSING_SLICE_NAME} from "./processing";
import {IIpbeState, IPBE_SLICE_NAME} from "./ipbe";

//infer the root state and dispatch types from the store itself
export type CpRootState = ReturnType<typeof store.getState>;
export type CpDispatch = typeof store.dispatch;

export interface ICpRootState {
    [PROCESSING_SLICE_NAME]: IProcessingState;
    [IPBE_SLICE_NAME]: IIpbeState;
}