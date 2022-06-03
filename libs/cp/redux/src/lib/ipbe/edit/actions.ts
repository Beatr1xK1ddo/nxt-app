import {createAction, createAsyncThunk} from "@reduxjs/toolkit";

import {NumericId} from "@nxt-ui/cp/types";
import api from "@nxt-ui/cp/api";

import {ICpRootState} from "../../types";

import {IPBE_EDIT_SLICE_NAME} from "./constants";
import {mainActions} from "./main";
import {videoEncoderActions} from "./videoEncoder";
import {audioEncoderActions} from "./audioEncoder";
import {mpegTsMuxerActions} from "./mpegTsMuxer";
import {rtpMuxerActions} from "./rtpMuxer";
import {advancedActions} from "./advanced";
import {createUpdateIpbeMapper} from "./utils";
import {encoderVersionsActions} from "./encoderVersions";

export const resetIpbe = createAction(`${IPBE_EDIT_SLICE_NAME}/resetIpbe`);
export const validateAndSaveIpbe = createAction(`${IPBE_EDIT_SLICE_NAME}/validateAndSaveIpbe`);
export const resetIpbeValidation = createAction(`${IPBE_EDIT_SLICE_NAME}/resetIpbeValidation`);

export const fetchIpbe = createAsyncThunk(`${IPBE_EDIT_SLICE_NAME}/fetchIpbe`, async (id: NumericId) => {
    return await api.ipbe.fetchIpbe(id);
});

//todo: rewrite this actions with payload specified from action
export const updateIpbe = createAsyncThunk(`${IPBE_EDIT_SLICE_NAME}/updateIpbe`, async (_, payloadCreator) => {
    const state = payloadCreator.getState() as ICpRootState;
    const mappedData = createUpdateIpbeMapper(state.ipbe.edit);
    if (!mappedData.error) {
        try {
            return await api.ipbe.updateIpbe(mappedData.result);
        } catch (e) {
            return payloadCreator.rejectWithValue(e);
        }
    } else {
        return Promise.reject();
    }
});

export const createIpbe = createAsyncThunk(`${IPBE_EDIT_SLICE_NAME}/createIpbe`, async (_, payloadCreator) => {
    const state = payloadCreator.getState() as ICpRootState;
    const mappedData = createUpdateIpbeMapper(state.ipbe.edit);

    if (!mappedData.error) {
        try {
            return await api.ipbe.createIpbe(mappedData.result);
        } catch (e) {
            return payloadCreator.rejectWithValue(e);
        }
    } else {
        return Promise.reject();
    }
});

export const editActions = {
    fetchIpbe,
    updateIpbe,
    createIpbe,
    resetIpbe,
    validateAndSaveIpbe,
    resetIpbeValidation,
    ...mainActions,
    ...videoEncoderActions,
    ...audioEncoderActions,
    ...mpegTsMuxerActions,
    ...rtpMuxerActions,
    ...advancedActions,
    ...encoderVersionsActions,
};
