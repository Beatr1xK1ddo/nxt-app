import {
    IRealtimeAppEvent,
    IRealtimeAppStatusEvent,
    IRealtimeAppTimingEvent,
    ISdiMapperTypes,
    ISdiValues,
} from "@nxt-ui/cp/types";

export * from "./lineChart";
export * from "./validators";

export enum EImageAllowedExtensions {
    png = "png",
    jpg = "jpg",
    jpeg = "jpeg",
    gif = "gif",
}
export const isIRealtimeAppStatusEvent = (data?: IRealtimeAppEvent): data is IRealtimeAppStatusEvent => {
    return typeof data === "object" && "status" in data;
};

export const isIRealtimeAppTimingEvent = (data?: IRealtimeAppEvent): data is IRealtimeAppTimingEvent => {
    return typeof data === "object" && "startedAt" in data;
};

export const loadImage = (file: File): Promise<string | ArrayBuffer | ProgressEvent<FileReader>> => {
    return new Promise((resolve, reject) => {
        const fileExtension = file.name.split(".").pop();

        if (fileExtension && !(fileExtension in EImageAllowedExtensions)) {
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            if (reader.result) {
                return resolve(reader.result);
            }
        };
        reader.onerror = function (error) {
            return reject(error);
        };
    });
};

export const sdiDeviceMapper = (sdiMapper?: ISdiMapperTypes, ports?: number): ISdiValues => {
    if (!sdiMapper || !ports || ports <= 0) {
        return {
            keys: [],
            values: [],
        };
    }
    const isMappedValues = sdiMapper === "R1234";
    let values: Array<number>;
    const keys = [0, 2, 1, 3];
    if (ports <= 4) {
        Array.from(Array(4 - ports).keys()).forEach(() => {
            keys.pop();
        });
    } else {
        Array.from(Array(ports - 4).keys()).forEach((_, index) => {
            const value = keys[index] + 4;
            keys.push(value);
        });
    }
    if (isMappedValues) {
        values = keys.map((_, index) => index + 1);
    } else {
        values = keys;
    }
    return {keys, values};
};
