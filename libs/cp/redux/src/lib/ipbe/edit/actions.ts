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
    const result = createUpdateIpbeMapper(state.ipbe.edit);
    console.log("result", result);
    // const response = await api.ipbe.updateIpbe();
    // return response;
    return 11;
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
// export {updateIpbe} from "./slice";
// export * from "./advanced/actions";
// export * from "./audioEncoder/actions";
// export * from "./main/actions";
// export * from "./mpegTsMuxer/actions";
// export * from "./rtpMuxer/actions";
// export * from "./videoEncoder/actions";
