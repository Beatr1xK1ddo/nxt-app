import {IApiAudioChannels} from "@nxt-ui/cp/api";
import {IFormError} from "@nxt-ui/cp/types";

export type IAudioEncodersError = {
    codec: IFormError;
    bitrate: IFormError;
    sdiPair: IFormError;
    ac3DialogueLevel: IFormError;
    channels?: IFormError;
    language?: IFormError;
};

export type IIpbeEditAudioEncoders = {
    ipbeAudioEncoders: Array<IApiAudioChannels>;
};

export type IIpbeEditAudioEncodersTabState = {
    values: Partial<IIpbeEditAudioEncoders>;
    errors: Array<IAudioEncodersError>;
};
