import {ipbeEditMainSlice} from "./slice";

const {
    changeChannel,
    changeLanguage,
    changeSdiPair,
    changeAc3DialogueLevel,
    changeBitrate,
    changeCodec,
    addNewAudioEncoder,
    addNewAudioChannel,
    deleteAudioEncoder,
    changeAudioPid,
} = ipbeEditMainSlice.actions;
export {
    changeChannel,
    changeLanguage,
    changeSdiPair,
    changeAc3DialogueLevel,
    changeBitrate,
    changeCodec,
    addNewAudioChannel,
    addNewAudioEncoder,
    deleteAudioEncoder,
    changeAudioPid,
};
