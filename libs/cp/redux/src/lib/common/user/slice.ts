import api from "@nxt-ui/cp/api";
import {EDataProcessingStatus} from "@nxt-ui/cp/types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IUserState} from "./types";

export const USER_SLICE_NAME = "user";

const initialState: IUserState = {
    status: EDataProcessingStatus.idle,
    user: null,
};

export const getUser = createAsyncThunk(`${USER_SLICE_NAME}/fetchUser`, async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore todo: damn ts build bug
    return await api.common.fetchUser();
});

export const userSlice = createSlice({
    name: USER_SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getUser.pending, (state) => {
                state.status = EDataProcessingStatus.loading;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.status = EDataProcessingStatus.succeeded;
                state.user = action.payload.user;
            })
            .addCase(getUser.rejected, (state) => {
                state.status = EDataProcessingStatus.failed;
            });
    },
});

export default userSlice.reducer;
