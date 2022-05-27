import {ipbeEditMpegTsMuxerSlice} from "./slice";

const {
    changeAddScte,
    changeServiceProvider,
    changeMuxer,
    changeMuxrate,
    changeServiceName,
    changeProgramNumber,
    changeTsId,
    changePcrPid,
    changePcrPeriod,
    changePmtPid,
    changePmtPeriod,
    changeVideoPid,
    changeAudioPid,
} = ipbeEditMpegTsMuxerSlice.actions;

export {
    changeAddScte,
    changeServiceProvider,
    changeMuxer,
    changeMuxrate,
    changeServiceName,
    changeProgramNumber,
    changeTsId,
    changePcrPid,
    changePcrPeriod,
    changePmtPid,
    changePmtPeriod,
    changeVideoPid,
    changeAudioPid,
};
