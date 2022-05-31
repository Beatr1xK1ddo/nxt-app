import {IRealtimeAppEvent, IRealtimeAppStatusEvent, IRealtimeAppTimingEvent} from "@nxt-ui/cp/types";

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
