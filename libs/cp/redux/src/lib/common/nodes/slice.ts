import {createAsyncThunk, createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EDataProcessingStatus, IListData, INodeOnlineStatusPayload, INodesListItem, EAppType} from "@nxt-ui/cp/types";
import api from "@nxt-ui/cp/api";

import {INodesState} from "./types";
import {nodesMapper} from "./utils";

export const NODES_SLICE_NAME = "nodes";

export const fetchNodes = createAsyncThunk(`${NODES_SLICE_NAME}/fetchNodes`, async (appType?: EAppType) => {
    const response = await api.common.fetchNodes(appType);
    const result: IListData<INodesListItem> = {
        data: response.data.map(nodesMapper),
        total: response.total,
    };
    return result;
});

export const nodesAdapter = createEntityAdapter<INodesListItem>({
    sortComparer: (one, another) =>
        one.online === another.online ? another.id - one.id : Number(another.online) - Number(one.online),
});

const initialState: INodesState = {
    data: nodesAdapter.getInitialState(),
    status: EDataProcessingStatus.idle,
};

//state slice itself
export const nodesSlice = createSlice({
    name: NODES_SLICE_NAME,
    initialState,
    reducers: {
        setNodeStatus: (state, action: PayloadAction<INodeOnlineStatusPayload>) => {
            const {origin, payload} = action.payload;
            nodesAdapter.updateOne(state.data, {id: origin.nodeId, changes: {online: payload.online}});
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchNodes.pending, (state) => {
                state.status = EDataProcessingStatus.loading;
            })
            .addCase(fetchNodes.fulfilled, (state, action: PayloadAction<IListData<INodesListItem>>) => {
                state.status = EDataProcessingStatus.succeeded;
                nodesAdapter.setAll(state.data, action.payload.data);
            })
            .addCase(fetchNodes.rejected, (state) => {
                state.status = EDataProcessingStatus.failed;
            });
    },
});

//export reducer by default
export default nodesSlice.reducer;
