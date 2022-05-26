import {EIpbeAudioCodec, IIpbeAudioChannels} from "@nxt-ui/cp/types";
import {IAudioEncodersError} from "./types";

export const ipbeAudioChannelErrorGenerator = () => {
    const result: IAudioEncodersError = [
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
    const result: IIpbeAudioChannels = [
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
        } else {
            obj[key] = undefined;
        }

        return obj;
    }, {});

    return result;
};
