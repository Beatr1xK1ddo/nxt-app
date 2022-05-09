export enum EDataProcessingStatus {
    idle = "idle",
    fetchRequired = "fetchRequired",
    loading = "loading",
    succeeded = "succeeded",
    failed = "failed",
}

export type IDataProcessingError = null | string;

export interface IPagination {
    page: number;
    itemsPerPage: number;
    itemsCount: number;
    pagesCount: number;
}

export enum EItemsPerPage {
    all = "all",
    ten = "10",
    fifty = "50",
    hundred = "100",
    threeHundred = "300",
}

export enum EAppGeneralStatus {
    active = "active",
    error = "error",
    stopped = "stopped",
    cloned = "cloned",
    new = "new",
}

export enum EAppGeneralStatusChange {
    start = "start",
    stop = "stop",
}

export type IRealtimeThumbnailEvent = {
    channel: string;
    imageSrcBase64: string;
};

export type IRealtimeAppEvent = IRealtimeAppStatusEvent | IRealtimeAppTimingEvent;

export type IRealtimeAppStatusEvent = {
    id: string;
    type: string;
    status: EAppGeneralStatus;
    statusChange: string;
};

export type IRealtimeAppTimingEvent = {
    id: string;
    type: string;
    startedAt: number;
};
