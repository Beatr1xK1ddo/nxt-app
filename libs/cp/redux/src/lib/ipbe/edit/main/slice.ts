import {
    EErrorType,
    EIpbeApplicationType,
    EIpbeEncoderVersion,
    EIpbeEncoderVideoFormat,
    EIpbeLatency,
    EIpbeOutputType,
    EIpbeVideoConnection,
    IOutputIpPayload,
    IOutputPortPayload,
} from "@nxt-ui/cp/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPBE_EDIT_SLICE_NAME} from "../slice";
import {IIpbeEditMainTabState} from "./types";
import {mainErrorState} from "./utils";
import {stringIpMask} from "@nxt-ui/cp/utils";

const IPBE_EDIT_MAIN_SLICE_NAME = `${IPBE_EDIT_SLICE_NAME}/main`;

const initialState: IIpbeEditMainTabState = {
    errors: mainErrorState,
    values: {},
};

export const ipbeEditMainFormSlice = createSlice({
    name: IPBE_EDIT_MAIN_SLICE_NAME,
    initialState,
    reducers: {
        changeName(state, action: PayloadAction<string>) {
            const {payload} = action;
            if (state.values) {
                state.values.name = payload;
            }
        },
        changeCompany(state, action: PayloadAction<number>) {
            const {payload} = action;
            if (state.values) {
                state.values.company = payload;
            }
        },
        changeNode(state, action: PayloadAction<number>) {
            const {payload} = action;
            if (state.values) {
                state.values.node = payload;
            }
        },
        changeVideoConnection(state, action: PayloadAction<EIpbeVideoConnection>) {
            const {payload} = action;
            if (state.values) {
                state.values.videoConnection = payload;
            }
        },
        changeEncoder(state, action: PayloadAction<keyof typeof EIpbeEncoderVersion>) {
            const {payload} = action;
            if (state.values) {
                state.values.encoderVersion = payload;
            }
        },
        changeApplication(state, action: PayloadAction<EIpbeApplicationType>) {
            const {payload} = action;
            if (state.values) {
                state.values.applicationType = payload;
            }
        },
        changeInputFormat(state, action: PayloadAction<EIpbeEncoderVideoFormat>) {
            const {payload} = action;
            if (state.values) {
                state.values.inputFormat = payload;
            }
        },
        changeOutputType(state, action: PayloadAction<EIpbeOutputType>) {
            const {payload} = action;
            if (state.values) {
                state.values.outputType = payload;
            }
        },
        changeLatency(state, action: PayloadAction<EIpbeLatency>) {
            const {payload} = action;
            if (state.values) {
                state.values.latency = payload;
            }
        },
        changeVideoOutputIp(state, action: PayloadAction<string>) {
            const {payload} = action;

            if (!state.values) {
                return;
            }

            const isValid = stringIpMask(payload);

            if (!isValid && payload) {
                state.errors.videoOutputIpError.error = true;
                state.errors.videoOutputIpError.helperText = EErrorType.badIp;
            }

            if ((state.errors.videoOutputIpError.error && isValid) || !payload) {
                state.errors.videoOutputIpError.error = false;
                delete state.errors.videoOutputIpError.helperText;
            }

            state.values.videoOutputIp = payload;
        },
        changeAudioOutputIp(state, action: PayloadAction<string>) {
            const {payload} = action;

            if (!state.values) {
                return;
            }

            const isValid = stringIpMask(payload);

            if (!isValid && payload) {
                state.errors.audioOutputIpError.error = true;
                state.errors.audioOutputIpError.helperText = EErrorType.badIp;
            }

            if ((state.errors.audioOutputIpError.error && isValid) || !payload) {
                state.errors.audioOutputIpError.error = false;
                delete state.errors.audioOutputIpError.helperText;
            }

            state.values.audioOutputIp = payload;
        },
        changeOutputIp(state, action: PayloadAction<IOutputIpPayload>) {
            const {payload} = action;

            const isValid = stringIpMask(payload.value);
            let itemIndex;
            const item = state.values?.ipbeDestinations?.find((item, index) => {
                if (item.id === payload.id) {
                    itemIndex = index;
                }
                return item.id === payload.id;
            });

            if (!item || (!itemIndex && typeof itemIndex !== "number")) {
                return;
            }

            if (!isValid && state.errors.ipbeDestinations?.length) {
                state.errors.ipbeDestinations[itemIndex].outputIp.error = true;
                state.errors.ipbeDestinations[itemIndex].outputIp.helperText = EErrorType.badIp;
            }

            if (state.errors.ipbeDestinations?.[itemIndex].outputIp.error && isValid) {
                state.errors.ipbeDestinations[itemIndex].outputIp.error = false;
                delete state.errors.ipbeDestinations[itemIndex].outputIp.helperText;
            }
        },
        changeVideoOutputPort(state, action: PayloadAction<number>) {
            const {payload} = action;

            if (state.values) {
                state.values.videoOutputPort = payload;
            }
        },
        changeAudioOutputPort(state, action: PayloadAction<number>) {
            const {payload} = action;

            if (state.values) {
                state.values.audioOutputPort = payload;
            }
        },
        changeOutputPort(state, action: PayloadAction<IOutputPortPayload>) {
            const {payload} = action;

            const item = state.values?.ipbeDestinations?.find((item) => item.id === payload.id);
            if (!item) {
                return;
            }
            item.outputPort = payload.value;
        },
        changeTtl(state, action: PayloadAction<IOutputPortPayload>) {
            const {payload} = action;

            const item = state.values?.ipbeDestinations?.find((item) => item.id === payload.id);
            if (!item) {
                return;
            }
            item.ttl = payload.value;
        },
    },
});

export default ipbeEditMainFormSlice.reducer;
