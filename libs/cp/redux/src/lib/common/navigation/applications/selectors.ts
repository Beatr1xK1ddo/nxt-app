import {INavigationState} from "../types";
import {createSelector} from "@reduxjs/toolkit";

export const selectNavApplication = (state: INavigationState) => state.applications;

export const ipbe = createSelector(selectNavApplication, (application) => application.ipbe);
export const txr = createSelector(selectNavApplication, (application) => application.txr);
export const channel = createSelector(selectNavApplication, (application) => application.channel);
export const transcoder2 = createSelector(selectNavApplication, (application) => application.transcoder2);
export const transcoder = createSelector(selectNavApplication, (application) => application.transcoder);
export const standardsConversion = createSelector(
    selectNavApplication,
    (application) => application.standardsConversion
);
export const slateGenerator = createSelector(selectNavApplication, (application) => application.slateGenerator);
export const srt = createSelector(selectNavApplication, (application) => application.srt);
export const spts = createSelector(selectNavApplication, (application) => application.spts);
export const mpts = createSelector(selectNavApplication, (application) => application.mpts);
export const supervisor = createSelector(selectNavApplication, (application) => application.supervisor);
export const teranex = createSelector(selectNavApplication, (application) => application.teranex);
export const timeshifting = createSelector(selectNavApplication, (application) => application.timeshifting);
export const failover = createSelector(selectNavApplication, (application) => application.failover);
export const tsForward = createSelector(selectNavApplication, (application) => application.tsForward);
export const multiscreens = createSelector(selectNavApplication, (application) => application.multiscreen);
export const qFrame = createSelector(selectNavApplication, (application) => application.qFrame);
export const decryption = createSelector(selectNavApplication, (application) => application.decryption);
export const encryption = createSelector(selectNavApplication, (application) => application.encryption);
export const nxtLitePlayer = createSelector(selectNavApplication, (application) => application.nxtLitePlayer);
export const filePlayer = createSelector(selectNavApplication, (application) => application.filePlayer);
export const hyperDeck = createSelector(selectNavApplication, (application) => application.hyperDeck);
export const hlsAnalyzer = createSelector(selectNavApplication, (application) => application.hlsAnalyzer);
