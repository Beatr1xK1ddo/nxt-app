import {IPBE_LIST_SLICE_NAME, ipbeListSelectors as listSelectors} from "./list";
import {IPBE_EDIT_SLICE_NAME, ipbeEditSelectors as editSelectors} from "./edit";
import {IIpbeState} from "./types";

export const ipbeListSelectors = {
    selectIpbeListFilter: (state: IIpbeState) => listSelectors.selectIpbeListFilter(state[IPBE_LIST_SLICE_NAME]),
    selectIpbeListPagination: (state: IIpbeState) =>
        listSelectors.selectIpbeListPagination(state[IPBE_LIST_SLICE_NAME]),
    selectIpbeListViewMode: (state: IIpbeState) => listSelectors.selectIpbeListViewMode(state[IPBE_LIST_SLICE_NAME]),
    selectIpbeListItems: (state: IIpbeState) => listSelectors.selectIpbeListItems(state[IPBE_LIST_SLICE_NAME]),
    selectIpbeListStatus: (state: IIpbeState) => listSelectors.selectIpbeListStatus(state[IPBE_LIST_SLICE_NAME]),
};

export const ipbeEditSelectors = {
    selectIpbeEditStatus: (state: IIpbeState) => editSelectors.selectIpbeEditStatus(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditMainId: (state: IIpbeState) => editSelectors.selectIpbeEditMainId(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditValidStatus: (state: IIpbeState) =>
        editSelectors.selectIpbeEditValidStatus(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditMainApplication: (state: IIpbeState) =>
        editSelectors.selectIpbeEditMainApplication(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditNode: (state: IIpbeState) => editSelectors.selectIpbeEditNode(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditMainValues: (state: IIpbeState) =>
        editSelectors.selectIpbeEditMainValues(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditMainErrors: (state: IIpbeState) =>
        editSelectors.selectIpbeEditMainErrors(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditVideoEncoderValues: (state: IIpbeState) =>
        editSelectors.selectIpbeEditVideoEncoderValues(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditVideoEncoderErrors: (state: IIpbeState) =>
        editSelectors.selectIpbeEditVideoEncoderErrors(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditAudioEncodersValues: (state: IIpbeState) =>
        editSelectors.selectIpbeEditAudioEncoderValues(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditAudioEncodersErrors: (state: IIpbeState) =>
        editSelectors.selectIpbeEditAudioEncoderErrors(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditMpegTsMuxerValues: (state: IIpbeState) =>
        editSelectors.selectIpbeEditMpegTsMuxerValues(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditMpegTsMuxerErrors: (state: IIpbeState) =>
        editSelectors.selectIpbeEditMpegTsMuxerErrors(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditRtpMuxerValues: (state: IIpbeState) =>
        editSelectors.selectIpbeEditRtpMuxerValues(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditRtpMuxerErrors: (state: IIpbeState) =>
        editSelectors.selectIpbeEditRtpMuxerErrors(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditAdvancedValues: (state: IIpbeState) =>
        editSelectors.selectIpbeEditAdvancedValues(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditAdvancedErrors: (state: IIpbeState) =>
        editSelectors.selectIpbeEditAdvancedErrors(state[IPBE_EDIT_SLICE_NAME]),
    selectEncoderVersionsStatus: (state: IIpbeState) =>
        editSelectors.selectEncoderVersionsStatus(state[IPBE_EDIT_SLICE_NAME]),
    selectEncoderVersionsValues: (state: IIpbeState) =>
        editSelectors.selectEncoderVersionsValues(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditMainName: (state: IIpbeState) => editSelectors.selectIpbeEditMainName(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditMainError: (state: IIpbeState) => editSelectors.selectIpbeEditMainError(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditVideoEncoderError: (state: IIpbeState) =>
        editSelectors.selectIpbeEditVideoEncoderError(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditAudioEncoderError: (state: IIpbeState) =>
        editSelectors.selectIpbeEditAudioEncoderError(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditMpegTsMuxerError: (state: IIpbeState) =>
        editSelectors.selectIpbeEditMpegTsMuxerError(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditRtpMuxerError: (state: IIpbeState) =>
        editSelectors.selectIpbeEditRtpMuxerError(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditAdvancedError: (state: IIpbeState) =>
        editSelectors.selectIpbeEditAdvancedError(state[IPBE_EDIT_SLICE_NAME]),
};
