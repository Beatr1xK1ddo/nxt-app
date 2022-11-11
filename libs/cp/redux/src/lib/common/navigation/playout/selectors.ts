import {INavigationState} from "../types";
import {createSelector} from "@reduxjs/toolkit";
import {activeNavTab} from "../utils";

export const selectNavPlayout = (state: INavigationState) => state.playout;
export const selectActivePlayoutTab = createSelector(selectNavPlayout, (playout) => activeNavTab(playout));

export const playout = createSelector(selectNavPlayout, (playout) => playout.playout);
export const playout2 = createSelector(selectNavPlayout, (playout) => playout.playout2);
export const ingest = createSelector(selectNavPlayout, (playout) => playout.ingest);
export const mam = createSelector(selectNavPlayout, (playout) => playout.mam);
export const fastSync = createSelector(selectNavPlayout, (playout) => playout.fastSync);
export const adReplacer = createSelector(selectNavPlayout, (playout) => playout.adReplacer);
