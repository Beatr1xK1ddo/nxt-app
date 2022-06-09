import {ipbeEditMainSlice} from "./slice";

//todo kan: update redux actions from "change" to "set" ALL ACROSS THE PROJECT
const {
    changeChannel,
    changeLanguage,
    changeSdiPair,
    changeAc3DialogueLevel,
    changeBitrate,
    changeCodec,
    addNewAudioEncoder,
    deleteAudioEncoder,
    changeAudioPid,
    changeDirty,
} = ipbeEditMainSlice.actions;
export {
    changeChannel,
    changeLanguage,
    changeSdiPair,
    changeAc3DialogueLevel,
    changeBitrate,
    changeCodec,
    addNewAudioEncoder,
    deleteAudioEncoder,
    changeAudioPid,
    changeDirty,
};
