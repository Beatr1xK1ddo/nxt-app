import {IFormError} from "@nxt-ui/cp/types";

export type IIpbeEditAdvancedError = {
    slateImage: IFormError;
};

export type IIpbeEditAdvanced = {
    addTimecode: boolean;
    runMonitor: boolean;
    enableLoopback: boolean;
    enableSlateIfNoSignal: boolean;
    enablePsfEncoding: boolean;
    restartOnError: boolean;
    enablePreviewImages: boolean;
    slateImage?: string;
};

export type IIpbeEditAdvancedTabState = {
    values?: Partial<IIpbeEditAdvanced>;
    errors: IIpbeEditAdvancedError;
};
