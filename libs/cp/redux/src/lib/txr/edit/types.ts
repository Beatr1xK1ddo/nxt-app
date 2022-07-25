import {ITxrEditMainState} from "./main/types";
import {TXR_EDIT_STATUS_SLICE_NAME} from "./status";
import {TXR_EDIT_MAIN_SLICE_NAME} from "./main";
import {ITxrTemplates, TXR_TEMPLATE_SLICE_NAME} from "./templates";

export type ITxrEditState = {
    [TXR_EDIT_STATUS_SLICE_NAME]: string;
    [TXR_EDIT_MAIN_SLICE_NAME]: ITxrEditMainState;
    [TXR_TEMPLATE_SLICE_NAME]: ITxrTemplates;
};
