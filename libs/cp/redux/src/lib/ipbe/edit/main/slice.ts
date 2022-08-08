import {createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";

import {
    EAppGeneralStatus,
    EErrorType,
    EIpbeApplicationType,
    EIpbeEncoderVideoFormat,
    EIpbeLatency,
    EIpbeOutputType,
    EIpbeVideoConnection,
    IOutputIpPayload,
    IOutputPortPayload,
    IValidateIpbePayload,
} from "@nxt-ui/cp/types";
import {isIApiIpbeEditErrorResponse, stringIpMask} from "@nxt-ui/cp/utils";
import {IApiIpbe, IApiIpbeEditErrorResponse} from "@nxt-ui/cp/api";
import {ipbeMainRequiredFields, ipbeSdi2WebExtraFields} from "@nxt-ui/cp/constants";

import {fetchIpbe, resetIpbe, updateIpbe, validateIpbe, cloneIpbes} from "../actions";
import {IPBE_EDIT_SLICE_NAME} from "../constants";
import {IIpbeEditMainState, IIpbeMainRequiredKeys, IIpbeSdi2WebExtraFields} from "./types";
import {apiResponseErrorMapper, applicationTypeErrorChecker, ipbeApiToMainMapper, mainErrorState} from "./utils";

export const IPBE_EDIT_MAIN_SLICE_NAME = "main";

const initialState: IIpbeEditMainState = {
    values: {
        id: null,
        name: "",
        company: null,
        status: EAppGeneralStatus.new,
        statusChange: null,
        startedAtMs: null,
        nodeId: null,
        encoderVersion: null,
        applicationType: EIpbeApplicationType.IPBE,
        sdiDevice: null,
        inputFormat: EIpbeEncoderVideoFormat.AutoDetect,
        videoConnection: EIpbeVideoConnection.sdi,
        outputType: EIpbeOutputType.udp,
        videoOutputIp: null,
        videoOutputPort: null,
        audioOutputIp: null,
        audioOutputPort: null,
        ipbeDestinations: [
            {
                id: undefined,
                outputIp: "",
                outputPort: 1234,
                ttl: 64,
            },
        ],
        latency: "normal",
        type: null,
    },
    errors: mainErrorState,
};

export const ipbeEditMainSlice = createSlice({
    name: `${IPBE_EDIT_SLICE_NAME}/${IPBE_EDIT_MAIN_SLICE_NAME}`,
    initialState,
    reducers: {
        addIpbeDestination(state) {
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
            state.values.ipbeDestinations?.push(result);
            state.errors.ipbeDestinations?.push(resultError);
        },
        deleteIpbeDestination(state, action: PayloadAction<number>) {
            state.values.ipbeDestinations?.splice(action.payload, 1);
            state.errors.ipbeDestinations?.splice(action.payload, 1);
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
        setVideoConnection(state, action: PayloadAction<EIpbeVideoConnection>) {
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
        setApplication(state, action: PayloadAction<EIpbeApplicationType>) {
            const {payload} = action;
            applicationTypeErrorChecker(state.errors, payload);
            if (!state.values.ipbeDestinations.length) {
                state.values.ipbeDestinations = [
                    {
                        outputIp: "",
                        ttl: null,
                        outputPort: null,
                    },
                ];
            }
            if (payload === EIpbeApplicationType.Sdi2Web && state.values.outputType === EIpbeOutputType.udp) {
                state.values.outputType = EIpbeOutputType.rtp;
            }
            if (payload !== EIpbeApplicationType.Sdi2Web && state.values.outputType === EIpbeOutputType.rtp) {
                state.values.outputType = EIpbeOutputType.udp;
            }
            state.values.applicationType = payload;
        },
        setInputFormat(state, action: PayloadAction<EIpbeEncoderVideoFormat>) {
            const {payload} = action;

            if (state.errors.inputFormat.error && payload) {
                state.errors.inputFormat.error = false;
                delete state.errors.inputFormat.helperText;
            }

            state.values.inputFormat = payload;
        },
        setOutputType(state, action: PayloadAction<EIpbeOutputType>) {
            const {payload} = action;

            if (state.errors.outputType.error && payload) {
                state.errors.outputType.error = false;
                delete state.errors.outputType.helperText;
            }

            state.values.outputType = payload;
        },
        setLatency(state, action: PayloadAction<EIpbeLatency>) {
            const {payload} = action;
            const keys = Object.keys(EIpbeLatency);
            const result = keys.find((key) => EIpbeLatency[key as keyof typeof EIpbeLatency] === payload) as
                | keyof typeof EIpbeLatency
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
            const item = state.values?.ipbeDestinations?.find((_, index) => {
                if (index === payload.id) {
                    itemIndex = index;
                }
                return index === payload.id;
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
            if (state.values.ipbeDestinations) {
                state.values.ipbeDestinations[itemIndex].outputIp = payload.value;
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
            const item = state.values.ipbeDestinations.find((_, index) => index === payload.id);

            if (item) {
                if (state.errors.ipbeDestinations?.[payload.id].outputPort.error && payload.value) {
                    state.errors.ipbeDestinations[payload.id].outputPort.error = false;
                    delete state.errors.ipbeDestinations[payload.id].outputPort.helperText;
                }
                item.outputPort = payload.value;
            }
        },
        setTtl(state, action: PayloadAction<IOutputPortPayload>) {
            const {payload} = action;
            const item = state.values.ipbeDestinations.find((_, index) => index === payload.id);
            if (item) {
                if (state.errors.ipbeDestinations?.[payload.id].ttl.error && payload.value) {
                    state.errors.ipbeDestinations[payload.id].ttl.error = false;
                    delete state.errors.ipbeDestinations[payload.id].ttl.helperText;
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
            .addCase(validateIpbe, (state, action: PayloadAction<IValidateIpbePayload>) => {
                const requiredFields = ipbeMainRequiredFields as IIpbeMainRequiredKeys;
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
                if (state.values.applicationType === EIpbeApplicationType.Sdi2Web) {
                    const extraFields = ipbeSdi2WebExtraFields as IIpbeSdi2WebExtraFields;
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
                    state.values.ipbeDestinations?.forEach((destination, i) => {
                        if (!destination.outputPort && typeof destination.outputPort !== "number") {
                            if (state.errors.ipbeDestinations) {
                                state.errors.ipbeDestinations[i].outputPort.error = true;
                                state.errors.ipbeDestinations[i].outputPort.helperText = EErrorType.required;
                            }
                        }
                        if (!destination.ttl && typeof destination.outputPort !== "number") {
                            if (state.errors.ipbeDestinations) {
                                state.errors.ipbeDestinations[i].ttl.error = true;
                                state.errors.ipbeDestinations[i].ttl.helperText = EErrorType.required;
                            }
                        }
                        if (!destination.outputIp) {
                            if (state.errors.ipbeDestinations) {
                                state.errors.ipbeDestinations[i].outputIp.error = true;
                                state.errors.ipbeDestinations[i].outputIp.helperText = EErrorType.required;
                                return;
                            }
                        }
                        if (!stringIpMask(destination.outputIp)) {
                            if (state.errors.ipbeDestinations) {
                                state.errors.ipbeDestinations[i].outputIp.error = true;
                                state.errors.ipbeDestinations[i].outputIp.helperText = EErrorType.badIp;
                            }
                        }
                    });
                }
            })
            .addCase(resetIpbe, () => {
                return initialState;
            })
            .addCase(updateIpbe.rejected, (state, action) => {
                const isBackendError = isIApiIpbeEditErrorResponse(action.payload as IApiIpbeEditErrorResponse);
                if (isBackendError) {
                    const errors = (action.payload as IApiIpbeEditErrorResponse).errors;
                    const mappedErrors = apiResponseErrorMapper(errors);
                    mappedErrors.forEach((error) => {
                        const {key, text} = error;
                        if (key === "ipbeDestinations") {
                            if (error.field && error.index && state.errors.ipbeDestinations) {
                                state.errors.ipbeDestinations[error.index][error.field].helperText = text;
                                state.errors.ipbeDestinations[error.index][error.field].error = true;
                            }
                        } else if (state.errors[key]) {
                            state.errors[key].error = true;
                            state.errors[key].helperText = text;
                        }
                    });
                }
            })
            .addMatcher(isAnyOf(updateIpbe.fulfilled, fetchIpbe.fulfilled, cloneIpbes.fulfilled), (state, action) => {
                state.values = ipbeApiToMainMapper(action.payload as IApiIpbe);
                if (state.values.ipbeDestinations.length) {
                    state.errors.ipbeDestinations = state.values.ipbeDestinations.map(() => ({
                        outputIp: {error: false},
                        ttl: {error: false},
                        outputPort: {error: false},
                    }));
                }
            });
    },
});

export default ipbeEditMainSlice.reducer;
