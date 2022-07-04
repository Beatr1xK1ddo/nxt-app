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

//export const txrListSelectors = (state: ITxrState) => getIpbeListSelectors(state, editSelectors, TXR_EDIT_SLICE_NAME);

export const txrEditSelectors = {
    selectTxrEditState: (state: ITxrState) => state[TXR_EDIT_SLICE_NAME],
    selectTxrEditStatus: (state: ITxrState) => editSelectors.selectTxrEditStatus(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditMainStartedAtMs: (state: ITxrState) =>
        editSelectors.selectTxrEditMainStartedAtMs(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditVideoConnections: (state: ITxrState) =>
        editSelectors.selectTxrEditVideoConnections(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditMainId: (state: ITxrState) => editSelectors.selectTxrEditMainId(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditMainStatus: (state: ITxrState) =>
        editSelectors.selectTxrEditMainStatus(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditValidStatus: (state: ITxrState) =>
        editSelectors.selectTxrEditValidStatus(state[TXR_EDIT_SLICE_NAME]),
    selectBasicApplication: (state: ITxrState) => editSelectors.selectBasicApplication(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditMainApplication: (state: ITxrState) =>
        editSelectors.selectTxrEditMainApplication(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditMainOutputType: (state: ITxrState) =>
        editSelectors.selectTxrEditMainOutputType(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditNode: (state: ITxrState) => editSelectors.selectTxrEditNode(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditMainValues: (state: ITxrState) =>
        editSelectors.selectTxrEditMainValues(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditMainErrors: (state: ITxrState) =>
        editSelectors.selectTxrEditMainErrors(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditVideoEncoderValues: (state: ITxrState) =>
        editSelectors.selectTxrEditVideoEncoderValues(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditVideoEncoderErrors: (state: ITxrState) =>
        editSelectors.selectTxrEditVideoEncoderErrors(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditAudioEncodersValues: (state: ITxrState) =>
        editSelectors.selectTxrEditAudioEncoderValues(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditAudioEncodersErrors: (state: ITxrState) =>
        editSelectors.selectTxrEditAudioEncoderErrors(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditMpegTsMuxerValues: (state: ITxrState) =>
        editSelectors.selectTxrEditMpegTsMuxerValues(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditMpegTsMuxerErrors: (state: ITxrState) =>
        editSelectors.selectTxrEditMpegTsMuxerErrors(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditRtpMuxerValues: (state: ITxrState) =>
        editSelectors.selectTxrEditRtpMuxerValues(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditRtpMuxerErrors: (state: ITxrState) =>
        editSelectors.selectTxrEditRtpMuxerErrors(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditAdvancedValues: (state: ITxrState) =>
        editSelectors.selectTxrEditAdvancedValues(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditAdvancedErrors: (state: ITxrState) =>
        editSelectors.selectTxrEditAdvancedErrors(state[TXR_EDIT_SLICE_NAME]),
    selectEncoderVersions: (state: ITxrState) => editSelectors.selectEncoderVersions(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditMainName: (state: ITxrState) => editSelectors.selectTxrEditMainName(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditMainError: (state: ITxrState) => editSelectors.selectTxrEditMainError(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditVideoEncoderError: (state: ITxrState) =>
        editSelectors.selectTxrEditVideoEncoderError(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditAudioEncoderError: (state: ITxrState) =>
        editSelectors.selectTxrEditAudioEncoderError(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditAudioEncoderDirty: (state: ITxrState, index: number) =>
        editSelectors.selectTxrEditAudioEncoderDirty(state[TXR_EDIT_SLICE_NAME], index),
    selectTxrEditMpegTsMuxerError: (state: ITxrState) =>
        editSelectors.selectTxrEditMpegTsMuxerError(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditRtpMuxerError: (state: ITxrState) =>
        editSelectors.selectTxrEditRtpMuxerError(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditAdvancedError: (state: ITxrState) =>
        editSelectors.selectTxrEditAdvancedError(state[TXR_EDIT_SLICE_NAME]),
    selectTxrEditAdvancedImageUrl: (state: ITxrState) =>
        editSelectors.selectTxrEditAdvancedImageUrl(state[TXR_EDIT_SLICE_NAME]),
};
