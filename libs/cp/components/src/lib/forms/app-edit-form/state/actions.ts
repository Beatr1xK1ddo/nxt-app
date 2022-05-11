import {EApplicationType, IIpbe} from "@nxt-ui/cp/api";
import {
    EEncoderVersion,
    ELatency,
    EOutputType,
    EVideoConnection,
    EVideoFormat,
} from "@nxt-ui/cp/types";
import {createAction} from "@reduxjs/toolkit";
import {IErrorPayload} from "../reducers";
import {IOutputIpPayload, IOutputPortPayload} from "../types";

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
