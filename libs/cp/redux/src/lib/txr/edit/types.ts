import {ITxrEditMainState} from "./main/types";
import {TXR_EDIT_STATUS_SLICE_NAME} from "./status";
import {TXR_EDIT_MAIN_SLICE_NAME} from "./main";

export type ITxrEditState = {
    [TXR_EDIT_STATUS_SLICE_NAME]: string;
    [TXR_EDIT_MAIN_SLICE_NAME]: ITxrEditMainState;
};
