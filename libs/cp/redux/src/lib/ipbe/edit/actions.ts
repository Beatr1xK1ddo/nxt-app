import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
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
import {encoderVersionsActions} from "./encoderVersions";

export const resetIpbe = createAction(`${IPBE_EDIT_SLICE_NAME}/resetIpbe`);

export const fetchIpbe = createAsyncThunk(`${IPBE_EDIT_SLICE_NAME}/fetchIpbe`, async (id: NumericId) => {
    return await api.ipbe.fetchIpbe(id);
});

//todo: rewrite this actions with payload specified from action
export const updateIpbe = createAsyncThunk(`${IPBE_EDIT_SLICE_NAME}/updateIpbe`, async (_, payloadCreator) => {
    const state = payloadCreator.getState() as ICpRootState;
    const mappedData = createUpdateIpbeMapper(state.ipbe.edit);
    try {
        const result = await api.ipbe.updateIpbe(mappedData.result);
        return result;
    } catch (e) {
        return payloadCreator.rejectWithValue(e);
    }
});

export const createIpbe = createAsyncThunk(`${IPBE_EDIT_SLICE_NAME}/createIpbe`, async (_, payloadCreator) => {
    const state = payloadCreator.getState() as ICpRootState;
    console.log("this is state", state.ipbe.edit);
    const mappedData = createUpdateIpbeMapper(state.ipbe.edit);
    try {
        return await api.ipbe.createIpbe(mappedData.result);
    } catch (e) {
        return payloadCreator.rejectWithValue(e);
    }
});

export const editActions = {
    reset: resetIpbe,
    fetchIpbe,
    updateIpbe,
    createIpbe,
    ...mainActions,
    ...videoEncoderActions,
    ...audioEncoderActions,
    ...mpegTsMuxerActions,
    ...rtpMuxerActions,
    ...advancedActions,
    ...encoderVersionsActions,
};
