import {createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";

import {EAppGeneralStatus, EErrorType, ETXRAppType} from "@nxt-ui/cp/types";
import {isIApiIpbeEditErrorResponse} from "@nxt-ui/cp/utils";
import {IApiTxr, IApiIpbeEditErrorResponse} from "@nxt-ui/cp/api";

import {fetchTxr, resetTxr, updateTxr} from "../actions";
import {TXR_EDIT_SLICE_NAME} from "../constants";
import {ITxrEditMainState} from "./types";
import {apiResponseErrorMapper, txrApiToMainMapper, mainErrorState} from "./utils";

export const TXR_EDIT_MAIN_SLICE_NAME = "main";

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
        appType: null,
        sourceIp: null,
        sourcePort: null,
        txUseInterface: null,
        transmissionIp: null,
        transmissionPort: null,
        destinationIp: null,
        destinationPort: null,
        rxUseInterface: null,
        rxRunMonitor: null,
        doubleTransmission: null,
        openPortAt: null,
        txRunMonitor: null,
        ttl: null,
        buffer: null,
    },
    errors: mainErrorState,
};

// TODO Kate: Add validation

export const txrEditMainSlice = createSlice({
    name: `${TXR_EDIT_SLICE_NAME}/${TXR_EDIT_MAIN_SLICE_NAME}`,
    initialState,
    reducers: {
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
        setAppType(state, action: PayloadAction<ETXRAppType>) {
            const {payload} = action;
            state.values.appType = payload;
        },
        setSourceIp(state, action: PayloadAction<string>) {
            const {payload} = action;
            state.values.sourceIp = payload;
        },
        setSourcePort(state, action: PayloadAction<number>) {
            const {payload} = action;
            state.values.sourcePort = payload;
        },
        setTxUseInterface(state, action: PayloadAction<string>) {
            const {payload} = action;
            state.values.txUseInterface = payload;
        },
        setTransmissionIp(state, action: PayloadAction<string>) {
            const {payload} = action;
            state.values.transmissionIp = payload;
        },
        setDestinationIp(state, action: PayloadAction<string>) {
            const {payload} = action;
            state.values.destinationIp = payload;
        },
        setDestinationPort(state, action: PayloadAction<number>) {
            const {payload} = action;
            state.values.destinationPort = payload;
        },
        setTransmissionPort(state, action: PayloadAction<number>) {
            const {payload} = action;
            state.values.transmissionPort = payload;
        },
        setTTLPort(state, action: PayloadAction<number>) {
            const {payload} = action;
            state.values.ttl = payload;
        },
        setBufferHandler(state, action: PayloadAction<number>) {
            const {payload} = action;
            state.values.buffer = payload;
        },
        setRxUseInterface(state, action: PayloadAction<string>) {
            const {payload} = action;
            state.values.rxUseInterface = payload;
        },
        setDoubleTransmission(state, action: PayloadAction<string>) {
            const {payload} = action;
            state.values.doubleTransmission = payload;
        },
        setOpenPortAt(state, action: PayloadAction<string>) {
            const {payload} = action;
            state.values.openPortAt = payload;
        },
        toggleRxRunMonitor(state) {
            state.values.rxRunMonitor = !state.values.rxRunMonitor;
        },
        setTxNodeId(state, action: PayloadAction<number>) {
            const {payload} = action;

            if (state.errors.nodeId.error && payload) {
                state.errors.nodeId.error = false;
                delete state.errors.nodeId.helperText;
            }

            state.values.txNodeId = payload;
        },
        setRxNodeId(state, action: PayloadAction<number>) {
            const {payload} = action;

            if (state.errors.nodeId.error && payload) {
                state.errors.nodeId.error = false;
                delete state.errors.nodeId.helperText;
            }

            state.values.rxNodeId = payload;
        },
        setTxrFromTemplate(state, action) {
            const {payload} = action;
            state.values = {...state.values, ...payload};
        },
    },
    extraReducers(builder) {
        builder
            // .addCase(validateTxr, (state, action: PayloadAction<IValidateTxrPayload>) => {

            // })
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
