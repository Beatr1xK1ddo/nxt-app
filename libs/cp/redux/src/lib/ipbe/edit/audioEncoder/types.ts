import {IDirty, IFormError, IIpbeAudioEncoder} from "@nxt-ui/cp/types";

export type IIpbeAudioEncoderError = {
    codec: IFormError;
    bitrate: IFormError;
    sdiPair: IFormError;
    ac3DialogueLevel: IFormError;
    channels?: IFormError;
    language?: IFormError;
};

export type IIpbeEditAudioEncodersState = {
    values: Array<IIpbeAudioEncoder>;
    errors: Array<IIpbeAudioEncoderError>;
    dirty: Array<IDirty>;
};
