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
import {IPBE_EDIT_SLICE_NAME} from "../reducer";
import {fetchIpbe} from "../actions";
import {IIpbeEditMainState} from "./types";
import {ipbeEditFormMainMapper, mainErrorsInitialState} from "./utils";
import {stringIpMask} from "@nxt-ui/cp/utils";
import {IApiIpbe} from "@nxt-ui/cp/api";

export const IPBE_EDIT_MAIN_SLICE_NAME = "main";

const initialState: IIpbeEditMainState = {
    values: {
        name: "",
        company: undefined,
        node: undefined,
        encoderVersion: undefined,
        applicationType: EIpbeApplicationType.IPBE,
        cardIdx: undefined,
        inputFormat: EIpbeEncoderVideoFormat.NTSC,
        videoConnection: EIpbeVideoConnection.sdi,
        outputType: EIpbeOutputType.udp,
        ipbeDestinations: [
            {
                id: undefined,
                outputIp: "",
                outputPort: 1234,
                ttl: 64,
            },
        ],
        latency: EIpbeLatency.normal,
    },
    errors: mainErrorsInitialState,
};

export const ipbeEditMainSlice = createSlice({
    name: `${IPBE_EDIT_SLICE_NAME}/${IPBE_EDIT_MAIN_SLICE_NAME}`,
    initialState,
    reducers: {
        changeName(state, action: PayloadAction<string>) {
            const {payload} = action;
            state.values.name = payload;
        },
        changeCompany(state, action: PayloadAction<number>) {
            const {payload} = action;
            state.values.company = payload;
        },
        changeNode(state, action: PayloadAction<number>) {
            const {payload} = action;
            state.values.node = payload;
        },
        changeVideoConnection(state, action: PayloadAction<EIpbeVideoConnection>) {
            const {payload} = action;
            state.values.videoConnection = payload;
        },
        changeEncoder(state, action: PayloadAction<keyof typeof EIpbeEncoderVersion>) {
            const {payload} = action;
            state.values.encoderVersion = payload;
        },
        changeApplication(state, action: PayloadAction<EIpbeApplicationType>) {
            const {payload} = action;
            state.values.applicationType = payload;
        },
        changeInputFormat(state, action: PayloadAction<EIpbeEncoderVideoFormat>) {
            const {payload} = action;
            state.values.inputFormat = payload;
        },
        changeOutputType(state, action: PayloadAction<EIpbeOutputType>) {
            const {payload} = action;
            state.values.outputType = payload;
        },
        changeLatency(state, action: PayloadAction<EIpbeLatency>) {
            const {payload} = action;
            state.values.latency = payload;
        },
        changeVideoOutputIp(state, action: PayloadAction<string>) {
            const {payload} = action;
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
            state.values.videoOutputPort = payload;
        },
        changeAudioOutputPort(state, action: PayloadAction<number>) {
            const {payload} = action;
            state.values.audioOutputPort = payload;
        },
        changeOutputPort(state, action: PayloadAction<IOutputPortPayload>) {
            const {payload} = action;
            const item = state.values.ipbeDestinations.find((item) => item.id === payload.id);
            if (item) {
                item.outputPort = payload.value;
            }
        },
        changeTtl(state, action: PayloadAction<IOutputPortPayload>) {
            const {payload} = action;
            const item = state.values.ipbeDestinations.find((item) => item.id === payload.id);
            if (item) {
                item.ttl = payload.value;
            }
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchIpbe.fulfilled, (state, action: PayloadAction<IApiIpbe>) => {
            state.values = ipbeEditFormMainMapper(action.payload);
        });
    },
});

export default ipbeEditMainSlice.reducer;
