import {createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";

import {
    EAppGeneralStatus,
    EErrorType,
    ETxrApplicationType,
    ETxrEncoderVideoFormat,
    ETxrLatency,
    ETxrOutputType,
    ETxrVideoConnection,
    IOutputIpPayload,
    IOutputPortPayload,
    IValidateTxrPayload,
} from "@nxt-ui/cp/types";
import {isIApiIpbeEditErrorResponse, stringIpMask} from "@nxt-ui/cp/utils";
import {IApiTxr, IApiIpbeEditErrorResponse} from "@nxt-ui/cp/api";
import {ipbeMainRequiredFields, ipbeSdi2WebExtraFields} from "@nxt-ui/cp/constants";

import {fetchTxr, resetTxr, updateTxr, validateTxr} from "../actions";
import {TXR_EDIT_SLICE_NAME} from "../constants";
import {ITxrEditMainState, ITxrMainRequiredKeys, ITxrSdi2WebExtraFields} from "./types";
import {apiResponseErrorMapper, applicationTypeErrorChecker, txrApiToMainMapper, mainErrorState} from "./utils";

export const TXR_EDIT_MAIN_SLICE_NAME = "main";

const initialState: ITxrEditMainState = {
    values: {
        id: null,
        name: "",
        company: null,
        status: EAppGeneralStatus.new,
        statusChange: null,
        startedAtMs: null,
        nodeId: null,
        encoderVersion: null,
        applicationType: ETxrApplicationType.TXR,
        sdiDevice: null,
        inputFormat: ETxrEncoderVideoFormat.AutoDetect,
        videoConnection: ETxrVideoConnection.sdi,
        outputType: ETxrOutputType.udp,
        videoOutputIp: null,
        videoOutputPort: null,
        audioOutputIp: null,
        audioOutputPort: null,
        txrDestinations: [
            {
                id: undefined,
                outputIp: "",
                outputPort: 1234,
                ttl: 64,
            },
        ],
        latency: "normal",
    },
    errors: mainErrorState,
};

export const txrEditMainSlice = createSlice({
    name: `${TXR_EDIT_SLICE_NAME}/${TXR_EDIT_MAIN_SLICE_NAME}`,
    initialState,
    reducers: {
        addTxrDestination(state) {
            const result = {
                outputIp: "",
                ttl: null,
                outputPort: null,
            };
            const resultError = {
                outputIp: {error: false},
                ttl: {error: false},
                outputPort: {error: false},
            };
            state.values.txrDestinations?.push(result);
            state.errors.txrDestinations?.push(resultError);
        },
        deleteTxrDestination(state, action: PayloadAction<number>) {
            state.values.txrDestinations?.splice(action.payload, 1);
            state.errors.txrDestinations?.splice(action.payload, 1);
        },
        setName(state, action: PayloadAction<string>) {
            const {payload} = action;

            if (!payload) {
                state.errors.name.error = true;
                state.errors.name.helperText = EErrorType.required;
            }

            if (payload && state.errors.name.error) {
                state.errors.name.error = false;
                delete state.errors.name.helperText;
            }

            if (/^[a-z0-9_]+$/i.test(payload) || payload === "") {
                state.values.name = payload;
            } else {
                const strArray = payload.split("");
                strArray.forEach((char, i) => {
                    if (!/^[a-z0-9_]+$/i.test(char)) {
                        state.values.name = `${payload.slice(0, i)}_${payload.slice(i + 1, payload.length)}`;
                    }
                });
            }
        },
        setCompany(state, action: PayloadAction<number>) {
            const {payload} = action;
            state.values.company = payload;
        },
        setNode(state, action: PayloadAction<number>) {
            const {payload} = action;

            if (state.errors.nodeId.error && payload) {
                state.errors.nodeId.error = false;
                delete state.errors.nodeId.helperText;
            }

            state.values.nodeId = payload;
        },
        setVideoConnection(state, action: PayloadAction<ETxrVideoConnection>) {
            const {payload} = action;

            if (state.errors.videoConnection.error && payload) {
                state.errors.videoConnection.error = false;
                delete state.errors.videoConnection.helperText;
            }

            state.values.videoConnection = payload;
        },
        setEncoder(state, action: PayloadAction<string>) {
            const {payload} = action;

            if (state.errors.encoderVersion.error && payload) {
                state.errors.encoderVersion.error = false;
                delete state.errors.encoderVersion.helperText;
            }

            state.values.encoderVersion = payload;
        },
        setApplication(state, action: PayloadAction<ETxrApplicationType>) {
            const {payload} = action;
            applicationTypeErrorChecker(state.errors, payload);
            if (!state.values.txrDestinations.length) {
                state.values.txrDestinations = [
                    {
                        outputIp: "",
                        ttl: null,
                        outputPort: null,
                    },
                ];
            }
            if (payload === ETxrApplicationType.Sdi2Web && state.values.outputType === ETxrOutputType.udp) {
                state.values.outputType = ETxrOutputType.rtp;
            }
            if (payload !== ETxrApplicationType.Sdi2Web && state.values.outputType === ETxrOutputType.rtp) {
                state.values.outputType = ETxrOutputType.udp;
            }
            state.values.applicationType = payload;
        },
        setInputFormat(state, action: PayloadAction<ETxrEncoderVideoFormat>) {
            const {payload} = action;

            if (state.errors.inputFormat.error && payload) {
                state.errors.inputFormat.error = false;
                delete state.errors.inputFormat.helperText;
            }

            state.values.inputFormat = payload;
        },
        setOutputType(state, action: PayloadAction<ETxrOutputType>) {
            const {payload} = action;

            if (state.errors.outputType.error && payload) {
                state.errors.outputType.error = false;
                delete state.errors.outputType.helperText;
            }

            state.values.outputType = payload;
        },
        setLatency(state, action: PayloadAction<ETxrLatency>) {
            const {payload} = action;
            const keys = Object.keys(ETxrLatency);
            const result = keys.find((key) => ETxrLatency[key as keyof typeof ETxrLatency] === payload) as
                | keyof typeof ETxrLatency
                | undefined;
            if (result) {
                state.values.latency = result;
            }
        },
        setVideoOutputIp(state, action: PayloadAction<string>) {
            const {payload} = action;
            const isValid = stringIpMask(payload);
            if (!isValid && payload) {
                state.errors.videoOutputIp.error = true;
                state.errors.videoOutputIp.helperText = EErrorType.badIp;
            }
            if ((state.errors.videoOutputIp.error && isValid) || !payload) {
                state.errors.videoOutputIp.error = false;
                delete state.errors.videoOutputIp.helperText;
            }
            state.values.videoOutputIp = payload;
        },
        setAudioOutputIp(state, action: PayloadAction<string>) {
            const {payload} = action;
            const isValid = stringIpMask(payload);
            if (!isValid && payload) {
                state.errors.audioOutputIp.error = true;
                state.errors.audioOutputIp.helperText = EErrorType.badIp;
            }
            if ((state.errors.audioOutputIp.error && isValid) || !payload) {
                state.errors.audioOutputIp.error = false;
                delete state.errors.audioOutputIp.helperText;
            }
            state.values.audioOutputIp = payload;
        },
        setOutputIp(state, action: PayloadAction<IOutputIpPayload>) {
            const {payload} = action;
            const isValid = stringIpMask(payload.value);
            let itemIndex;
            const item = state.values?.txrDestinations?.find((_, index) => {
                if (index === payload.id) {
                    itemIndex = index;
                }
                return index === payload.id;
            });

            if (!item || (!itemIndex && typeof itemIndex !== "number")) {
                return;
            }
            if (!isValid && state.errors.txrDestinations?.length) {
                state.errors.txrDestinations[itemIndex].outputIp.error = true;
                state.errors.txrDestinations[itemIndex].outputIp.helperText = EErrorType.badIp;
            }

            if (state.errors.txrDestinations?.[itemIndex].outputIp.error && isValid) {
                state.errors.txrDestinations[itemIndex].outputIp.error = false;
                delete state.errors.txrDestinations[itemIndex].outputIp.helperText;
            }
            if (state.values.txrDestinations) {
                state.values.txrDestinations[itemIndex].outputIp = payload.value;
            }
        },
        setVideoOutputPort(state, action: PayloadAction<number>) {
            const {payload} = action;

            if (state.errors.videoOutputPort.error && !isNaN(payload)) {
                state.errors.videoOutputPort.error = false;
                delete state.errors.videoOutputPort.helperText;
            }

            if (isNaN(payload)) {
                state.errors.videoOutputPort.error = true;
                state.errors.videoOutputPort.helperText = EErrorType.required;
                state.values.videoOutputPort = null;
            } else {
                state.values.videoOutputPort = payload;
            }
        },
        setAudioOutputPort(state, action: PayloadAction<number>) {
            const {payload} = action;

            if (state.errors.audioOutputPort.error && !isNaN(payload)) {
                state.errors.audioOutputPort.error = false;
                delete state.errors.audioOutputPort.helperText;
            }

            if (isNaN(payload)) {
                state.errors.audioOutputPort.error = true;
                state.errors.audioOutputPort.helperText = EErrorType.required;
                state.values.audioOutputPort = null;
            } else {
                state.values.audioOutputPort = payload;
            }
        },
        setOutputPort(state, action: PayloadAction<IOutputPortPayload>) {
            const {payload} = action;
            const item = state.values.txrDestinations.find((_, index) => index === payload.id);

            if (item) {
                if (state.errors.txrDestinations?.[payload.id].outputPort.error && payload.value) {
                    state.errors.txrDestinations[payload.id].outputPort.error = false;
                    delete state.errors.txrDestinations[payload.id].outputPort.helperText;
                }
                item.outputPort = payload.value;
            }
        },
        setTtl(state, action: PayloadAction<IOutputPortPayload>) {
            const {payload} = action;
            const item = state.values.txrDestinations.find((_, index) => index === payload.id);
            if (item) {
                if (state.errors.txrDestinations?.[payload.id].ttl.error && payload.value) {
                    state.errors.txrDestinations[payload.id].ttl.error = false;
                    delete state.errors.txrDestinations[payload.id].ttl.helperText;
                }
                item.ttl = payload.value;
            }
        },
        setSDIDevice(state, action: PayloadAction<number>) {
            const {payload} = action;
            if (state.errors.sdiDevice.error && typeof payload === "number") {
                state.errors.sdiDevice.error = false;
                delete state.errors.sdiDevice.helperText;
            }
            state.values.sdiDevice = payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(validateTxr, (state, action: PayloadAction<IValidateTxrPayload>) => {
                const requiredFields = ipbeMainRequiredFields as ITxrMainRequiredKeys;
                requiredFields.forEach((key) => {
                    if (key === "sdiDevice") {
                        if (action.payload?.sdiValues?.keys.length && typeof state.values[key] !== "number") {
                            state.errors[key].error = true;
                            state.errors[key].helperText = EErrorType.required;
                        }
                    } else if (!state.values[key]) {
                        if (state.errors[key]) {
                            state.errors[key].error = true;
                            state.errors[key].helperText = EErrorType.required;
                        }
                    }
                });
                if (state.values.applicationType === ETxrApplicationType.Sdi2Web) {
                    const extraFields = ipbeSdi2WebExtraFields as ITxrSdi2WebExtraFields;
                    for (const key of extraFields) {
                        if (key === "videoOutputIp" || key === "audioOutputIp") {
                            if (!stringIpMask(state.values[key])) {
                                state.errors[key].error = true;
                                state.errors[key].helperText = EErrorType.badIp;
                            }
                        } else {
                            if (!state.values[key]) {
                                state.errors[key].error = true;
                                state.errors[key].helperText = EErrorType.required;
                            }
                        }
                    }
                } else {
                    state.values.txrDestinations?.forEach((destination, i) => {
                        if (!destination.outputPort && typeof destination.outputPort !== "number") {
                            if (state.errors.txrDestinations) {
                                state.errors.txrDestinations[i].outputPort.error = true;
                                state.errors.txrDestinations[i].outputPort.helperText = EErrorType.required;
                            }
                        }
                        if (!destination.ttl && typeof destination.outputPort !== "number") {
                            if (state.errors.txrDestinations) {
                                state.errors.txrDestinations[i].ttl.error = true;
                                state.errors.txrDestinations[i].ttl.helperText = EErrorType.required;
                            }
                        }
                        if (!destination.outputIp) {
                            if (state.errors.txrDestinations) {
                                state.errors.txrDestinations[i].outputIp.error = true;
                                state.errors.txrDestinations[i].outputIp.helperText = EErrorType.required;
                                return;
                            }
                        }
                        if (!stringIpMask(destination.outputIp)) {
                            if (state.errors.txrDestinations) {
                                state.errors.txrDestinations[i].outputIp.error = true;
                                state.errors.txrDestinations[i].outputIp.helperText = EErrorType.badIp;
                            }
                        }
                    });
                }
            })
            .addCase(resetTxr, () => {
                return initialState;
            })
            .addCase(updateTxr.rejected, (state, action) => {
                const isBackendError = isIApiIpbeEditErrorResponse(action.payload as IApiIpbeEditErrorResponse);
                if (isBackendError) {
                    const errors = (action.payload as IApiIpbeEditErrorResponse).errors;
                    //@ts-ignore
                    const mappedErrors = apiResponseErrorMapper(errors);
                    mappedErrors.forEach((error) => {
                        const {key, text} = error;
                        if (key === "txrDestinations") {
                            if (error.field && error.index && state.errors.txrDestinations) {
                                state.errors.txrDestinations[error.index][error.field].helperText = text;
                                state.errors.txrDestinations[error.index][error.field].error = true;
                            }
                        } else if (state.errors[key]) {
                            state.errors[key].error = true;
                            state.errors[key].helperText = text;
                        }
                    });
                }
            })
            .addMatcher(isAnyOf(updateTxr.fulfilled, fetchTxr.fulfilled), (state, action) => {
                state.values = txrApiToMainMapper(action.payload as IApiTxr);
                if (state.values.txrDestinations?.length) {
                    state.errors.txrDestinations = state.values.txrDestinations.map(() => ({
                        outputIp: {error: false},
                        ttl: {error: false},
                        outputPort: {error: false},
                    }));
                }
            });
    },
});

export default txrEditMainSlice.reducer;
