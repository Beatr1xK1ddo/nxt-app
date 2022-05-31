import {IFormError, IIpbeAudioEncoder} from "@nxt-ui/cp/types";

export type IIpbeAudioEncoderError = {
    codec: IFormError;
    bitrate: IFormError;
    sdiPair: IFormError;
    ac3DialogueLevel: IFormError;
    channels?: IFormError;
    language?: IFormError;
};

export type IIpbeEditAudioEncodersState = {
    values: {
        audioEncoders: Array<IIpbeAudioEncoder>;
    };
    errors: {
        audioEncoders: Array<IIpbeAudioEncoderError>;
    };
};
