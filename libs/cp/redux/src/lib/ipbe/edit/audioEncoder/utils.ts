import {EIpbeAudioCodec, EIpbeAudioEncoderChannels, IIpbeAudioEncoder} from "@nxt-ui/cp/types";
import {IIpbeAudioEncoderError} from "./types";

export const ipbeAudioEncoderErrorGenerator = () => {
    const result: IIpbeAudioEncoderError = [
        "codec",
        "bitrate",
        "sdiPair",
        "ac3DialogueLevel",
        "channels",
        "language",
    ].reduce((obj: any, key) => {
        obj[key] = {
            error: false,
        };

        return obj;
    }, {});

    return result;
};

export const ipbeAudioChannelGenerator = () => {
    const result: IIpbeAudioEncoder = [
        "codec",
        "bitrate",
        "sdiPair",
        "ac3DialogueLevel",
        "channels",
        "language",
    ].reduce((obj: any, key) => {
        if (key === "codec") {
            obj[key] = EIpbeAudioCodec.mp2;
        } else if (key === "bitrate") {
            obj[key] = 256;
        } else if (key === "sdiPair") {
            obj[key] = 0;
        } else if (key === "ac3DialogueLevel") {
            obj[key] = 0;
        } else if (key === "channels") {
            obj[key] = EIpbeAudioEncoderChannels.stereo;
        } else {
            obj[key] = undefined;
        }

        return obj;
    }, {});

    return result;
};

export const ipbeAudioEncoderToApiMapper = (items: IIpbeAudioEncoder[]) => ({
    ipbeAudioEncoders: items,
});
