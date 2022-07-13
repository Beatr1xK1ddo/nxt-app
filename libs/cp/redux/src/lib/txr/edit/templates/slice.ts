import {createSlice} from "@reduxjs/toolkit";
import {getTemplateSelectedValues, resetTxr} from "../actions";
import {IApiTxr} from "@nxt-ui/cp/api";
import {txrApiToMainMapper} from "../main/utils";
import {ITxrTemplatesData} from "./types";
import {ValueOf} from "@nxt-ui/cp/types";

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
                    const template: Partial<IApiTxr> = {};
                    JSON.parse(item.data).forEach((item: {name: keyof IApiTxr; value: ValueOf<IApiTxr>}) => {
                        const name = item.name;
                        //@ts-ignore
                        template[name] = item.value;
                    });
                    //@ts-ignore
                    templates[item.name] = txrApiToMainMapper(template);
                });
                return templates;
            });
    },
});

export default txrTemplatesSlice.reducer;
