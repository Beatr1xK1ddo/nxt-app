import {ECardView} from "@nxt-ui/cp/types";
import {createReducer, PayloadAction} from "@reduxjs/toolkit";
import {changeCardView} from "./actions";
import {ICardViewState} from "./types";

const defaultState = {
    mode: ECardView.table,
};

export const changeCardReducer = createReducer<ICardViewState>(defaultState, {
    [changeCardView.type]: (state, action: PayloadAction<ECardView>) => {
        const {payload} = action;
        state.mode = payload;
    },
});
