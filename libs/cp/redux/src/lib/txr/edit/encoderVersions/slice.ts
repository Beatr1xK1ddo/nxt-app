import {createSlice} from "@reduxjs/toolkit";
import {IEncoderVersion} from "./types";
import {fetchMainSelectValues, resetTxr} from "../actions";

export const ENCODER_VERSIONS_SLICE_NAME = "encoderVersion";

const initialState: IEncoderVersion = {
    avds2: null,
    txr: null,
    sdi2web: null,
};

export const encoderVersionsSlice = createSlice({
    name: ENCODER_VERSIONS_SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(resetTxr, () => {
                return initialState;
            })
            .addCase(fetchMainSelectValues.fulfilled, (state, action) => {
                const keys = Object.keys(action.payload.encoderVersion);
                keys.forEach((key) => {
                    const currentValue = action.payload.encoderVersion[key as keyof IEncoderVersion];
                    if (currentValue) {
                        state[key as keyof IEncoderVersion] = {
                            keys: Object.values(currentValue),
                            values: Object.keys(currentValue),
                        };
                    }
                });
            });
    },
});

export default encoderVersionsSlice.reducer;
