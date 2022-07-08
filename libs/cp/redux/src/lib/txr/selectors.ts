import {TXR_LIST_SLICE_NAME, txrListSelectors as listSelectors} from "./list";
import {TXR_EDIT_SLICE_NAME, txrEditSelectors as editSelectors} from "./edit";
import {ITxrState} from "./types";
export {TXR_SLICE_NAME} from "./constants";

export const txrListSelectors = {
    selectTxrListFilter: (state: ITxrState) => listSelectors.selectTxrListFilter(state[TXR_LIST_SLICE_NAME]),
    selectTxrListPagination: (state: ITxrState) =>
        listSelectors.selectTxrListPagination(state[TXR_LIST_SLICE_NAME]),
    selectTxrListViewMode: (state: ITxrState) => listSelectors.selectTxrListViewMode(state[TXR_LIST_SLICE_NAME]),
    selectTxrListItems: (state: ITxrState) => listSelectors.selectTxrListItems(state[TXR_LIST_SLICE_NAME]),
    selectTxrListStatus: (state: ITxrState) => listSelectors.selectTxrListStatus(state[TXR_LIST_SLICE_NAME]),
    selectTxrListAction: (state: ITxrState) => listSelectors.selectTxrListAction(state[TXR_LIST_SLICE_NAME]),
    selectTxrListSelected: (state: ITxrState) => listSelectors.selectTxrListSelected(state[TXR_LIST_SLICE_NAME]),
};

// TODO Kate Check selectors
export const txrEditSelectors = {
    selectTxrEditState: (state: ITxrState) => state[TXR_EDIT_SLICE_NAME],
    selectTxrEditStatus: (state: ITxrState) => editSelectors.selectTxrEditStatus(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditMainStartedAtMs: (state: ITxrState) =>
        editSelectors.selectTxrEditMainStartedAtMs(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditMainId: (state: ITxrState) => editSelectors.selectTxrEditMainId(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditMainStatus: (state: ITxrState) =>
        editSelectors.selectTxrEditMainStatus(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditValidStatus: (state: ITxrState) =>
        editSelectors.selectTxrEditValidStatus(state[TXR_EDIT_SLICE_NAME]),

    selectTxrEditMainValues: (state: ITxrState) =>
        editSelectors.selectTxrEditMainValues(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditMainErrors: (state: ITxrState) =>
        editSelectors.selectTxrEditMainErrors(state[TXR_EDIT_SLICE_NAME]),

    selectTxrEditCompany: (state: ITxrState) =>
        editSelectors.selectTxrEditCompany(state[TXR_EDIT_SLICE_NAME]),
    selectTxrAppType: (state: ITxrState) =>
        editSelectors.selectTxrAppType(state[TXR_EDIT_SLICE_NAME]),
    selectTxrDoubleTransmission: (state: ITxrState) =>
        editSelectors.selectTxrDoubleTransmission(state[TXR_EDIT_SLICE_NAME]),
    selectTxrOpenPortAt: (state: ITxrState) =>
        editSelectors.selectTxrOpenPortAt(state[TXR_EDIT_SLICE_NAME]),
    selectTxrNodes: (state: ITxrState) =>
        editSelectors.selectTxrNodes(state[TXR_EDIT_SLICE_NAME]),
    selectTxrSource: (state: ITxrState) =>
        editSelectors.selectTxrSource(state[TXR_EDIT_SLICE_NAME]),
    selectTxrDestination: (state: ITxrState) =>
        editSelectors.selectTxrDestination(state[TXR_EDIT_SLICE_NAME]),
    selectTxrUseInterface: (state: ITxrState) =>
        editSelectors.selectTxrUseInterface(state[TXR_EDIT_SLICE_NAME]),
    selectTxrTTL: (state: ITxrState) =>
        editSelectors.selectTxrTTL(state[TXR_EDIT_SLICE_NAME]),
    selectTxrBuffer: (state: ITxrState) =>
        editSelectors.selectTxrBuffer(state[TXR_EDIT_SLICE_NAME]),


    selectTxrEditMainName: (state: ITxrState) => editSelectors.selectTxrEditMainName(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditMainError: (state: ITxrState) => editSelectors.selectTxrEditMainError(state[TXR_EDIT_SLICE_NAME]),

};
