import {txrEditMainSlice} from "./slice";

const {
    setChannel,
    setLanguage,
    setSdiPair,
    setAc3DialogueLevel,
    setBitrate,
    setCodec,
    addNewAudioEncoder,
    deleteAudioEncoder,
    setAudioPid,
    setDirty,
} = txrEditMainSlice.actions;
export {
    setChannel,
    setLanguage,
    setSdiPair,
    setAc3DialogueLevel,
    setBitrate,
    setCodec,
    setAudioPid,
    setDirty,
    addNewAudioEncoder,
    deleteAudioEncoder,
};
