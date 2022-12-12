import store from "./store";
import {ICommonState, COMMON_SLICE_NAME} from "./common";
import {IProcessingState, PROCESSING_SLICE_NAME} from "./processing";
import {IIpbeState} from "./ipbe/types";
import {IPBE_SLICE_NAME} from "./ipbe";
import {TXR_SLICE_NAME} from "./txr";
import {ITxrState} from "./txr/types";
import {NOTIFICATIONS_SLICE_NAME} from "./notifications";
import {IUserNotificationState} from "./notifications/types";

export {
    EManualSelectionArr,
    isIEmailDelivery,
    isISlackDelivery,
    isIUserIdDelivery,
    isISmsDelivery,
} from "./notifications/types";

//infer the root state and dispatch types from the store itself
export type CpRootState = ReturnType<typeof store.getState>;
export type CpDispatch = typeof store.dispatch;
export * from "./common";
export interface ICpRootState {
    [COMMON_SLICE_NAME]: ICommonState;
    [PROCESSING_SLICE_NAME]: IProcessingState;
    [IPBE_SLICE_NAME]: IIpbeState;
    [TXR_SLICE_NAME]: ITxrState;
    [NOTIFICATIONS_SLICE_NAME]: IUserNotificationState;
}
