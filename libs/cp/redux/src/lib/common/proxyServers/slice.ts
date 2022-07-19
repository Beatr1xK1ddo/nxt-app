import {createAsyncThunk, createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {EDataProcessingStatus, IListData, IProxyServerItem} from "@nxt-ui/cp/types";
import api from "@nxt-ui/cp/api";

import {IProxyServersState} from "./types";
import {proxyServersMapper} from "./utils";

export const PROXY_SERVERS_SLICE_NAME = "proxyServers";

export const getProxyServers = createAsyncThunk(`${PROXY_SERVERS_SLICE_NAME}/getItems`, async () => {
    const response = await api.common.fetchProxyServers();
    const result: IListData<IProxyServerItem> = {
        data: response.data.map(proxyServersMapper),
        total: response.total,
    };
    return result;
});

export const proxyServersAdapter = createEntityAdapter<IProxyServerItem>();

const initialState: IProxyServersState = {
    data: proxyServersAdapter.getInitialState(),
    status: EDataProcessingStatus.idle,
};

export const proxyServersSlice = createSlice({
    name: PROXY_SERVERS_SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getProxyServers.pending, (state) => {
                state.status = EDataProcessingStatus.loading;
            })
            .addCase(getProxyServers.fulfilled, (state, action: PayloadAction<IListData<IProxyServerItem>>) => {
                state.status = EDataProcessingStatus.succeeded;
                proxyServersAdapter.setAll(state.data, action.payload.data);
            })
            .addCase(getProxyServers.rejected, (state) => {
                state.status = EDataProcessingStatus.failed;
            });
    },
});

export default proxyServersSlice.reducer;
