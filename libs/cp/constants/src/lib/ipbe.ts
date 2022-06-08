export const sdiAudioPair = () => {
    const result = [
        ...Array(8)
            .fill(0)
            .map((_, i) => i + 1),
    ];
    return result;
};

export const maxRefsValues = [...Array(11).keys()];

export const ac3DialogueLevelValues = Array(31)
    .fill(0)
    .map((_, i) => {
        return (i + 1) * -1;
    });

export const threadsValues = [...Array(33).keys()];

export const bitrateValues = [96, 128, 160, 192, 256, 384];

export const ipbeMainRequiredFields = [
    "name",
    "nodeId",
    "applicationType",
    "encoderVersion",
    "sdiDevice",
    "inputFormat",
    "videoConnection",
    "outputType",
];

export const ipbeSdi2WebExtraFields = ["videoOutputIp", "videoOutputPort", "audioOutputIp", "audioOutputPort"];

export const ttlValues = Array.from(Array(65).keys());
