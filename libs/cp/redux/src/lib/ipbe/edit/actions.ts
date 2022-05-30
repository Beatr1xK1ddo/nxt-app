<<<<<<< HEAD
import {createAsyncThunk} from "@reduxjs/toolkit";
import {NumericId} from "@nxt-ui/cp/types";
import api from "@nxt-ui/cp/api";
import {IPBE_EDIT_SLICE_NAME} from "./reducer";
import {advancedActions} from "./advanced";
import {audioEncoderActions} from "./audioEncoder";
import {mainActions} from "./main";
import {mpegTsMuxerActions} from "./mpegTsMuxer";
import {rtpMuxerActions} from "./rtpMuxer";
import {videoEncoderActions} from "./videoEncoder";

export const fetchIpbe = createAsyncThunk(`${IPBE_EDIT_SLICE_NAME}/fetchIpbe`, async (id: NumericId) => {
    const response = await api.ipbe.fetchIpbe(id);
    return response;
});

export const editActions = {
    fetchIpbe,
    ...mainActions,
    ...videoEncoderActions,
    ...audioEncoderActions,
    ...mpegTsMuxerActions,
    ...rtpMuxerActions,
    ...advancedActions,
};
=======
export {fetchIpbe, updateIpbe} from "./slice";
export * from "./advanced/actions";
export * from "./audioEncoders/actions";
export * from "./main/actions";
export * from "./mpegTsMuxer/actions";
export * from "./rtpMuxer/actions";
export * from "./videoEncoder/actions";
>>>>>>> main
