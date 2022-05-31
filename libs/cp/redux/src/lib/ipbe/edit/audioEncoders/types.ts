import {IFormError, IIpbeAudioChannels} from "@nxt-ui/cp/types";

export type IAudioEncodersError = {
    codec: IFormError;
    bitrate: IFormError;
    sdiPair: IFormError;
    ac3DialogueLevel: IFormError;
    channels?: IFormError;
    language?: IFormError;
};

export type IIpbeEditAudioEncoders = {
    ipbeAudioEncoders: Array<IIpbeAudioChannels>;
};

export type IIpbeEditAudioEncodersTabState = {
    values: Partial<IIpbeEditAudioEncoders>;
    errors: Array<IAudioEncodersError>;
};
