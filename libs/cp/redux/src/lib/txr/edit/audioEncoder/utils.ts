import {ETxrAudioCodec, ITxrAudioEncoder} from "@nxt-ui/cp/types";
import {ITxrAudioEncoderError} from "./types";

export const txrAudioEncoderErrorGenerator = () => {
    const result: ITxrAudioEncoderError = [
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

export const txrAudioChannelGenerator = () => {
    const result: ITxrAudioEncoder = [
        "codec",
        "bitrate",
        "sdiPair",
        "ac3DialogueLevel",
        "channels",
        "language",
    ].reduce((obj: any, key) => {
        if (key === "codec") {
            obj[key] = ETxrAudioCodec.mp2;
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

export const txrAudioEncoderToApiMapper = (items: ITxrAudioEncoder[]) => ({
    txrAudioEncoders: items,
});
