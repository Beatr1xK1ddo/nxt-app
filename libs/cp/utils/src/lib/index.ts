import {IAppData, IAppStatusData, IAppTimingData, ISdiMapperTypes, ISdiValues} from "@nxt-ui/cp/types";

import {IApiIpbeEditErrorResponse, IApiTxrEditErrorResponse} from "@nxt-ui/cp/api";

export * from "./lineChart";
export * from "./bitrateMonitoringChart";
export * from "./validators";
export * from "./formatters";

export enum EImageAllowedExtensions {
    png = "png",
    jpg = "jpg",
    jpeg = "jpeg",
    gif = "gif",
}
export const isIRealtimeAppStatusEvent = (data?: IAppData): data is IAppStatusData => {
    return typeof data === "object" && "status" in data;
};

export const isIRealtimeAppTimingEvent = (data?: IAppData): data is IAppTimingData => {
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

export const sdiDeviceMapper = (sdiMapper?: ISdiMapperTypes, ports?: number): ISdiValues | undefined => {
    if (!sdiMapper || !ports || ports <= 0) {
        return undefined;
    }
    const isMappedValues = sdiMapper === "R1234";
    const keys = [];
    let values: Array<number>;
    for (let index = 0; index < ports; index++) {
        const cardNumber = Math.floor(index / 4);
        const portNumber = index % 4;
        let label = 0;
        if (portNumber === 1) {
            label = 2;
        } else if (portNumber === 2) {
            label = 1;
        } else if (portNumber === 3) {
            label = 3;
        }
        label += cardNumber * 4;
        keys.push(label);
    }
    if (isMappedValues) {
        values = keys.map((_, index) => index + 1);
    } else {
        values = keys;
    }
    return {keys, values};
};

export const isIApiIpbeEditErrorResponse = (data: IApiIpbeEditErrorResponse): data is IApiIpbeEditErrorResponse => {
    return data && "errors" in data && "origin" in data;
};

export const isIApiTxrEditErrorResponse = (data: IApiTxrEditErrorResponse): data is IApiTxrEditErrorResponse => {
    return data && "errors" in data && "origin" in data;
};
