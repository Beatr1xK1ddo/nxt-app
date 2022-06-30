import {IDirty, IFormError, ITxrAudioEncoder} from "@nxt-ui/cp/types";

export type ITxrAudioEncoderError = {
    codec: IFormError;
    bitrate: IFormError;
    sdiPair: IFormError;
    ac3DialogueLevel: IFormError;
    channels?: IFormError;
    language?: IFormError;
};

export type ITxrEditAudioEncodersState = {
    values: Array<ITxrAudioEncoder>;
    errors: Array<ITxrAudioEncoderError>;
    dirty: Array<IDirty>;
};
