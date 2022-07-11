import {createSlice} from "@reduxjs/toolkit";
import {getTemplateSelectedValues, resetTxr} from "../actions";
import {IApiTxr} from "@nxt-ui/cp/api";
import {txrApiToMainMapper} from "../main/utils";
import {ITxrTemplatesData} from "./types";

export const TXR_TEMPLATE_SLICE_NAME = "txrTemplate";

const initialState = {};

export const txrTemplatesSlice = createSlice({
    name: TXR_TEMPLATE_SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(resetTxr, () => {
                return initialState;
            })
            .addCase(getTemplateSelectedValues.fulfilled, (state, action) => {
                const templates = {};
                action.payload.data.forEach((item: ITxrTemplatesData) => {
                    const value = {} as IApiTxr;
                    JSON.parse(item.data).forEach((item: {name: string; value: string}) => {
                        // TODO Kate: fix
                        //@ts-ignore
                        value[item.name] = item.value;
                    });
                    // TODO Kate: fix
                    //@ts-ignore
                    templates[item.name] = txrApiToMainMapper(value);
                });
                return templates;
            });
    },
});

export default txrTemplatesSlice.reducer;
