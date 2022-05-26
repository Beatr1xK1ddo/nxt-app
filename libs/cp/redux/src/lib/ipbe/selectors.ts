import {editSelectors, IPBE_EDIT_SLICE_NAME} from "./edit";
import {IPBE_LIST_SLICE_NAME, listSelectors} from "./list";
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
    selectIpbeEditAdvanced: (state: IIpbeState) => editSelectors.selectIpbeEditAdvanced(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditAudioEncoders: (state: IIpbeState) =>
        editSelectors.selectIpbeEditAudioEncoders(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditMain: (state: IIpbeState) => editSelectors.selectIpbeEditMain(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditMpegTsMuxer: (state: IIpbeState) =>
        editSelectors.selectIpbeEditMpegTsMuxer(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditRtpMuxer: (state: IIpbeState) => editSelectors.selectIpbeEditRtpMuxer(state[IPBE_EDIT_SLICE_NAME]),
    selectIpbeEditVideoEncoder: (state: IIpbeState) =>
        editSelectors.selectIpbeEditVideoEncoder(state[IPBE_EDIT_SLICE_NAME]),
};
