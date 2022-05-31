import {createAsyncThunk} from "@reduxjs/toolkit";
import {NumericId} from "@nxt-ui/cp/types";
import api from "@nxt-ui/cp/api";
import {advancedActions} from "./advanced";
import {audioEncoderActions} from "./audioEncoder";
import {mainActions} from "./main";
import {mpegTsMuxerActions} from "./mpegTsMuxer";
import {rtpMuxerActions} from "./rtpMuxer";
import {videoEncoderActions} from "./videoEncoder";
import {createUpdateIpbeMapper} from "./utils";
import {ICpRootState} from "../../types";
import {IPBE_EDIT_SLICE_NAME} from "./constants";

export const fetchIpbe = createAsyncThunk(`${IPBE_EDIT_SLICE_NAME}/fetchIpbe`, async (id: NumericId) => {
    const response = await api.ipbe.fetchIpbe(id);
    return response;
});

export const updateIpbe = createAsyncThunk(`${IPBE_EDIT_SLICE_NAME}/updateIpbe`, async (_, payloadCreator) => {
    const state = payloadCreator.getState() as ICpRootState;
    const mappedData = createUpdateIpbeMapper(state.ipbe.edit);
    const response = await api.ipbe.updateIpbe(mappedData.result);
    return response;
});

export const editActions = {
    fetchIpbe,
    updateIpbe,
    ...mainActions,
    ...videoEncoderActions,
    ...audioEncoderActions,
    ...mpegTsMuxerActions,
    ...rtpMuxerActions,
    ...advancedActions,
};
