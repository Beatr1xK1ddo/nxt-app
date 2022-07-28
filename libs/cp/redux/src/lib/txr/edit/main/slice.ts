import {createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";

import {EAppGeneralStatus, EAppType, EErrorType, ELatencyMode, ETXRAppType} from "@nxt-ui/cp/types";
import {isIApiTxrEditErrorResponse, stringIpMask, validationPort} from "@nxt-ui/cp/utils";
import {IApiTxr, IApiTxrEditErrorResponse} from "@nxt-ui/cp/api";

import {fetchTxr, resetTxr, updateTxr, validateTxr} from "../actions";
import {TXR_EDIT_SLICE_NAME} from "../constants";
import {ITxrEditMainState} from "./types";
import {apiResponseErrorMapper, txrApiToMainMapper, mainErrorState} from "./utils";
import {txrMainRequiredFields} from "@nxt-ui/cp/constants";

export const TXR_EDIT_MAIN_SLICE_NAME = "main";
const DEFAULT_PORT = 1234;
const DEFAULT_IP = "0.0.0.0";

const initialState: ITxrEditMainState = {
    values: {
        id: null,
        name: "",
        company: null,
        status: EAppGeneralStatus.new,
        statusChange: null,
        startedAtMs: null,
        txNodeId: null,
        rxNodeId: null,
        appType: ETXRAppType.txr6,
        sourceIp: null,
        sourcePort: DEFAULT_PORT,
        txUseInterface: DEFAULT_IP,
        transmissionIp: DEFAULT_IP,
        transmissionPort: DEFAULT_PORT,
        destinationIp: null,
        destinationPort: DEFAULT_PORT,
        rxUseInterface: DEFAULT_IP,
        rxRunMonitor: true,
        doubleRetransmission: null,
        openPortAt: "rx",
        txRunMonitor: true,
        ttl: 64,
        buffer: 10000,
        endpoint: null,
        arq: true,
        fec: null,
        fecHorizontalSize: null,
        fecSize: null,
        latencyMode: ELatencyMode.autortt,
        latencyMultiplier: null,
        latencyTime: 10000,
        recvBuffer: null,
        proxyServersIds: null,
        isLockTransmission: false,
        type: null,
    },
    errors: mainErrorState,
};

// TODO Kate: make export function
const checkErrors = (state: any, payload: any, key: string, message: string, isValid = true) => {
    if (!payload || !isValid) {
        state.errors[key].error = true;
        state.errors[key].helperText = message; //EErrorType.required;
    }

    if (payload && state.errors[key].error && isValid) {
        state.errors[key].error = false;
        delete state.errors[key].helperText;
    }
};

export const txrEditMainSlice = createSlice({
    name: `${TXR_EDIT_SLICE_NAME}/${TXR_EDIT_MAIN_SLICE_NAME}`,
    initialState,
    reducers: {
        setName(state, action: PayloadAction<string>) {
            const {payload} = action;

            checkErrors(state, payload, "name", EErrorType.required);

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
            checkErrors(state, payload, "company", EErrorType.required);
            state.values.company = payload;
        },
        setAppType(state, action: PayloadAction<ETXRAppType>) {
            const {payload} = action;
            checkErrors(state, payload, "appType", EErrorType.required);
            state.values.appType = payload;
        },
        setSourceIp(state, action: PayloadAction<string>) {
            const {payload} = action;
            const isValid = stringIpMask(payload);
            checkErrors(state, payload, "sourceIp", EErrorType.badIp, isValid);
            state.values.sourceIp = payload;
        },
        setSourcePort(state, action: PayloadAction<number>) {
            const {payload} = action;
            const isValid = validationPort(payload);
            checkErrors(state, payload, "sourcePort", EErrorType.badPort, isValid);
            state.values.sourcePort = payload;
        },
        setTxUseInterface(state, action: PayloadAction<string>) {
            const {payload} = action;
            const isValid = stringIpMask(payload) || !payload;
            if (!isValid) {
                state.errors.txUseInterface.error = true;
                state.errors.txUseInterface.helperText = EErrorType.badIp;
            } else {
                state.errors.txUseInterface.error = false;
                delete state.errors.txUseInterface.helperText;
            }
            state.values.txUseInterface = payload;
        },
        setTransmissionIp(state, action: PayloadAction<string>) {
            const {payload} = action;
            const isValid = stringIpMask(payload);
            checkErrors(state, payload, "transmissionIp", EErrorType.badIp, isValid);
            state.values.transmissionIp = payload;
        },
        setDestinationIp(state, action: PayloadAction<string>) {
            const {payload} = action;
            const isValid = stringIpMask(payload);
            checkErrors(state, payload, "destinationIp", EErrorType.badIp, isValid);
            state.values.destinationIp = payload;
        },
        setDestinationPort(state, action: PayloadAction<number>) {
            const {payload} = action;
            const isValid = validationPort(payload);
            checkErrors(state, payload, "destinationPort", EErrorType.badPort, isValid);
            state.values.destinationPort = payload;
        },
        setTransmissionPort(state, action: PayloadAction<number>) {
            const {payload} = action;
            const isValid = validationPort(payload);
            checkErrors(state, payload, "destinationPort", EErrorType.badPort, isValid);
            state.values.transmissionPort = payload;
        },
        setTTLPort(state, action: PayloadAction<number>) {
            const {payload} = action;
            checkErrors(state, payload, "ttl", EErrorType.required);
            state.values.ttl = payload;
        },
        setBufferHandler(state, action: PayloadAction<number>) {
            const {payload} = action;
            checkErrors(state, payload, "buffer", EErrorType.required);
            state.values.buffer = payload;
        },
        setRxUseInterface(state, action: PayloadAction<string>) {
            const {payload} = action;
            const isValid = stringIpMask(payload) || !payload;
            if (!isValid) {
                state.errors.rxUseInterface.error = true;
                state.errors.rxUseInterface.helperText = EErrorType.badIp;
            } else {
                state.errors.rxUseInterface.error = false;
                delete state.errors.rxUseInterface.helperText;
            }
            state.values.rxUseInterface = payload;
        },
        setDoubleRetransmission(state, action: PayloadAction<number>) {
            const {payload} = action;
            checkErrors(state, payload, "doubleRetransmission", EErrorType.required);
            state.values.doubleRetransmission = payload;
        },
        setOpenPortAt(state, action: PayloadAction<string>) {
            const {payload} = action;
            checkErrors(state, payload, "openPortAt", EErrorType.required);
            state.values.openPortAt = payload;
        },
        toggleRxRunMonitor(state) {
            state.values.rxRunMonitor = !state.values.rxRunMonitor;
        },
        toggleFec(state) {
            state.values.fec = !state.values.fec;
        },
        toggleTxRunMonitor(state) {
            state.values.txRunMonitor = !state.values.txRunMonitor;
        },
        toggleLockTransmission(state) {
            state.values.isLockTransmission = !state.values.isLockTransmission;
        },
        toggleArq(state) {
            state.values.arq = !state.values.arq;
        },
        toggleEndpoint(state) {
            state.values.endpoint = !state.values.endpoint;
        },
        setLatencyMode(state, action: PayloadAction<string>) {
            const {payload} = action;
            state.values.latencyMode = payload;
        },
        setLatencyMultiplier(state, action: PayloadAction<number>) {
            const {payload} = action;
            state.values.latencyMultiplier = payload;
        },
        setLatencyTime(state, action: PayloadAction<number>) {
            const {payload} = action;
            state.values.latencyTime = payload;
        },
        setRecvBuffer(state, action: PayloadAction<number>) {
            const {payload} = action;
            state.values.recvBuffer = payload;
        },
        setFecSize(state, action: PayloadAction<number>) {
            const {payload} = action;
            state.values.fecSize = payload;
        },
        setTxNodeId(state, action: PayloadAction<number>) {
            const {payload} = action;
            checkErrors(state, payload, "txNodeId", EErrorType.required);
            state.values.txNodeId = payload;
        },
        setRxNodeId(state, action: PayloadAction<number>) {
            const {payload} = action;
            checkErrors(state, payload, "rxNodeId", EErrorType.required);

            state.values.rxNodeId = payload;
        },
        setProxyServers(state, action: PayloadAction<number>) {
            const {payload} = action;
            const proxyServersIds = state.values.proxyServersIds || [];
            if (!proxyServersIds.includes(payload)) {
                state.values.proxyServersIds = [...proxyServersIds, payload];
            }
        },
        removeProxyServerItem(state, action: PayloadAction<number>) {
            const {payload} = action;
            const proxyServers = state.values.proxyServersIds || [];
            state.values.proxyServersIds = proxyServers.filter((item) => item !== payload);
        },
        setTxrFromTemplate(state, action) {
            const {payload} = action;
            state.values = {...state.values, ...payload};
        },
    },
    extraReducers(builder) {
        builder
            .addCase(validateTxr, (state, action) => {
                const requiredFields = txrMainRequiredFields; // as ITxrMainRequiredKeys;
                requiredFields.forEach((key) => {
                    //@ts-ignore TODO Kate: fix it
                    if (!state.values[key]) {
                        //@ts-ignore
                        if (state.errors[key]) {
                            //@ts-ignore
                            state.errors[key].error = true;
                            //@ts-ignore
                            state.errors[key].helperText = EErrorType.required;
                        }
                    }
                });
            })
            .addCase(resetTxr, () => {
                return initialState;
            })
            .addCase(updateTxr.rejected, (state, action) => {
                const isBackendError = isIApiTxrEditErrorResponse(action.payload as IApiTxrEditErrorResponse);
                if (isBackendError) {
                    const errors = (action.payload as IApiTxrEditErrorResponse).errors;
                    //@ts-ignore
                    const mappedErrors = apiResponseErrorMapper(errors);
                    mappedErrors.forEach((error) => {
                        const {key, text} = error;
                        if (state.errors[key]) {
                            state.errors[key].error = true;
                            state.errors[key].helperText = text;
                        }
                    });
                }
            })
            .addMatcher(isAnyOf(updateTxr.fulfilled, fetchTxr.fulfilled), (state, action) => {
                state.values = txrApiToMainMapper(action.payload as IApiTxr);
            });
    },
});

export default txrEditMainSlice.reducer;
