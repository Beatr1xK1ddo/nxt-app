import {
    EEncoderVersion,
    EErrorType,
    ELatency,
    EOutputType,
    EVideoConnection,
    EVideoFormat,
} from "@nxt-ui/cp/types";
import {createAction, createReducer, PayloadAction} from "@reduxjs/toolkit";
import {IOutputIpPayload, IOutputPortPayload} from "./types";
import {EApplicationType, IIpbe} from "@nxt-ui/cp/api";
import {stringIpMask} from "@nxt-ui/cp/utils";

export enum ETabs {
    main = "main",
}

export enum EMainFormError {
    name = "nameError",
    node = "nodeError",
    company = "companyError",
    applicationType = "applicationTypeError",
    videoConnection = "videoConnectionError",
    ipbeDestinations = "ipbeDestinationsError",
    videoOutputIp = "videoOutputIpError",
    videoOutputPort = "videoOutputPortError",
    audioOutputIp = "audioOutputIpError",
    audioOutputPort = "audioOutputPortError",
    encoderVersion = "encoderVersionError",
    inputFormat = "inputFormatError",
    latency = "latencyError",
    outputType = "outputTypeError",
}

const mainErrorState: IFormRootState["errors"]["main"] = Object.values(EMainFormError).reduce(
    (obj: any, key) => {
        obj[key] = {
            error: false,
        };
        return obj;
    },
    {}
);

export type IFormError = {
    error: boolean;
    helperText?: EErrorType;
    children?: ([ETabs.main]: {[key in EMainFormError]: IFormError})[];
};

export type IFormErrorState<T extends string> = {
    [key in T]: IFormError;
};

export type IErrorPayload = {tab: ETabs; field: EFormError; text?: EErrorType};

export type EFormError = EMainFormError;

export type IFormRootState = {
    loading: boolean;
    values?: IIpbe;
    errors: {
        [ETabs.main]: {[key in EMainFormError]: IFormError};
    };
};

export const initialState: IFormRootState = {
    loading: false,
    errors: {
        main: mainErrorState,
    },
};

export const setInitialState = createAction<IIpbe>("SET_INITIAL_STATE");

export const changeCompany = createAction<number>("CHANGE_COMPANY");

export const changeNode = createAction<number>("CHANGE_NODE");

export const changeName = createAction<string>("CHANGE_NAME");

export const sendForm = createAction("SEND_FORM");

export const changeEncoder = createAction<EEncoderVersion, "CHANGE_ENCODER_VERSION">(
    "CHANGE_ENCODER_VERSION"
);

export const changeVideoOutputIp = createAction<string, "CHANGE_VIDEO_OUTPUT_IP">(
    "CHANGE_VIDEO_OUTPUT_IP"
);

export const changeAudioOutputIp = createAction<string, "CHANGE_AUDIO_OUTPUT_IP">(
    "CHANGE_AUDIO_OUTPUT_IP"
);

export const changeAudioOutputPort = createAction<number, "CHANGE_AUDIO_OUTPUT_PORT">(
    "CHANGE_AUDIO_OUTPUT_PORT"
);

export const changeVideoOutputPort = createAction<number, "CHANGE_VIDEO_OUTPUT_PORT">(
    "CHANGE_VIDEO_OUTPUT_PORT"
);

export const changeOutputIp = createAction<IOutputIpPayload, "CHANGE_OUTPUT_IP">(
    "CHANGE_OUTPUT_IP"
);

export const changeOutputPort = createAction<IOutputPortPayload, "CHANGE_OUTPUT_PORT">(
    "CHANGE_OUTPUT_PORT"
);

export const changeInputFormat = createAction<EVideoFormat, "CHANGE_INPUT_FORMAT">(
    "CHANGE_INPUT_FORMAT"
);

export const changeApplication = createAction<EApplicationType, "CHANGE_APPLICATION_TYPE">(
    "CHANGE_APPLICATION_TYPE"
);

export const changeOutputType = createAction<EOutputType, "CHANGE_OUTPUT_TYPE">(
    "CHANGE_OUTPUT_TYPE"
);

export const changeLatency = createAction<ELatency, "CHANGE_LATENCY">("CHANGE_LATENCY");

export const setError = createAction<IErrorPayload, "SET_ERROR">("SET_ERROR");

export const removeError = createAction<IErrorPayload, "REMOVE_ERROR">("REMOVE_ERROR");

export const changeTtl = createAction<IOutputPortPayload, "CHANGE_TTL">("CHANGE_TTL");

export const changeVideoConnection = createAction<EVideoConnection, "CHANGE_VIDEO_CONNECTION">(
    "CHANGE_VIDEO_CONNECTION"
);

export const reducer = createReducer<IFormRootState>(initialState, {
    [setInitialState.type]: (state, action: PayloadAction<IIpbe>) => {
        state.values = action.payload;
    },
    [setError.type]: (state, action: PayloadAction<IErrorPayload>) => {
        const {tab, field, text} = action.payload;
        state.errors[tab][field].error = true;
        state.errors[tab][field].helperText = text;
    },
    [removeError.type]: (state, action: PayloadAction<IErrorPayload>) => {
        const {tab, field} = action.payload;
        state.errors[tab][field].error = false;
        state.errors[tab][field].helperText = undefined;
    },
    [changeName.type]: (state, action: PayloadAction<string>) => {
        const {payload} = action;
        if (state.values) {
            state.values.name = payload;
        }
    },
    [changeCompany.type]: (state, action: PayloadAction<number>) => {
        const {payload} = action;
        if (state.values) {
            state.values.company = payload;
        }
    },
    [changeNode.type]: (state, action: PayloadAction<number>) => {
        const {payload} = action;
        if (state.values) {
            state.values.node = payload;
        }
    },
    [changeVideoConnection.type]: (state, action: PayloadAction<EVideoConnection>) => {
        const {payload} = action;
        if (state.values) {
            state.values.videoConnection = payload;
        }
    },
    [changeEncoder.type]: (state, action: PayloadAction<keyof typeof EEncoderVersion>) => {
        const {payload} = action;
        if (state.values) {
            state.values.encoderVersion = payload;
        }
    },
    [changeApplication.type]: (state, action: PayloadAction<EApplicationType>) => {
        const {payload} = action;
        if (state.values) {
            state.values.applicationType = payload;
        }
    },
    [changeInputFormat.type]: (state, action: PayloadAction<EVideoFormat>) => {
        const {payload} = action;
        if (state.values) {
            state.values.inputFormat = payload;
        }
    },
    [changeOutputType.type]: (state, action: PayloadAction<EOutputType>) => {
        const {payload} = action;
        if (state.values) {
            state.values.outputType = payload;
        }
    },
    [changeLatency.type]: (state, action: PayloadAction<ELatency>) => {
        const {payload} = action;
        if (state.values) {
            state.values.latency = payload;
        }
    },
    [changeVideoOutputIp.type]: (state, action: PayloadAction<string>) => {
        const {payload} = action;
        if (state.values) {
            state.values.videoOutputIp = payload;
        }
    },
    [changeVideoOutputPort.type]: (state, action: PayloadAction<number>) => {
        const {payload} = action;
        if (state.values) {
            state.values.videoOutputPort = payload;
        }
    },
    [changeAudioOutputPort.type]: (state, action: PayloadAction<number>) => {
        const {payload} = action;
        if (state.values) {
            state.values.audioOutputPort = payload;
        }
    },
    [changeAudioOutputIp.type]: (state, action: PayloadAction<string>) => {
        const {payload} = action;
        if (state.values) {
            state.values.audioOutputIp = payload;
        }
    },
    [changeOutputIp.type]: (state, action: PayloadAction<IOutputIpPayload>) => {
        const {payload} = action;
        console.log("payload", payload);
        const isValid = stringIpMask(payload.value);
        let itemIndex;
        const item = state.values?.ipbeDestinations.find((item, index) => {
            if (item.id === payload.id) {
                itemIndex = index;
            }
            return item.id === payload.id;
        });

        console.log("itemIndex", itemIndex);
        console.log("item", item);

        if (!item || (!itemIndex && typeof itemIndex !== "number")) {
            return;
        }

        if (!isValid && state.errors.main.ipbeDestinationsError?.children) {
            state.errors.main.ipbeDestinationsError.children[itemIndex].error = true;
            state.errors.main.ipbeDestinationsError.children[itemIndex].helperText =
                EErrorType.badIp;
        }

        item.outputIp = payload.value;
    },
    [changeOutputPort.type]: (state, action: PayloadAction<IOutputPortPayload>) => {
        const {payload} = action;
        const item = state.values?.ipbeDestinations.find((item) => item.id === payload.id);
        if (!item) {
            return;
        }
        item.outputPort = payload.value;
    },
    [changeTtl.type]: (state, action: PayloadAction<IOutputPortPayload>) => {
        const {payload} = action;
        const item = state.values?.ipbeDestinations.find((item) => item.id === payload.id);
        if (!item) {
            return;
        }
        item.ttl = payload.value;
    },
});
