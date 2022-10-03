import {createSlice} from "@reduxjs/toolkit";
import {IEncoderVersion} from "./types";
import {fetchMainSelectValues, resetIpbe} from "../actions";
import {EDataProcessingStatus} from "@nxt-ui/cp/types";

export const ENCODER_VERSIONS_SLICE_NAME = "encoderVersion";

const initialState: IEncoderVersion = {
    values: {
        avds2: null,
        ipbe: null,
        sdi2web: null,
    },
    status: EDataProcessingStatus.fetchRequired,
};

export const encoderVersionsSlice = createSlice({
    name: ENCODER_VERSIONS_SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(resetIpbe, () => {
                return initialState;
            })
            .addCase(fetchMainSelectValues.rejected, (state) => {
                state.status = EDataProcessingStatus.failed;
            })
            .addCase(fetchMainSelectValues.fulfilled, (state, action) => {
                const keys = Object.keys(action.payload.encoderVersion);
                keys.forEach((key) => {
                    const currentValue = action.payload.encoderVersion[key as keyof IEncoderVersion["values"]];
                    if (currentValue) {
                        state.values[key as keyof IEncoderVersion["values"]] = {
                            keys: Object.values(currentValue),
                            values: Object.keys(currentValue),
                        };
                    }
                });
                state.status = EDataProcessingStatus.succeeded;
            });
    },
});

export default encoderVersionsSlice.reducer;
