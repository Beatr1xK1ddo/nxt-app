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
    selectIpbeEditMain: (state: IIpbeState) => editSelectors.selectIpbeEditMainValues(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditVideoEncoder: (state: IIpbeState) =>
        editSelectors.selectIpbeEditVideoEncoderValues(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditAudioEncoders: (state: IIpbeState) =>
        editSelectors.selectIpbeEditAudioEncoderValues(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditMpegTsMuxer: (state: IIpbeState) =>
        editSelectors.selectIpbeEditMpegTsMuxerValues(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditRtpMuxer: (state: IIpbeState) => editSelectors.selectIpbeEditRtpMuxerValues(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditAdvanced: (state: IIpbeState) => editSelectors.selectIpbeEditAdvancedValues(state[IPBE_EDIT_SLICE_NAME]),
};
