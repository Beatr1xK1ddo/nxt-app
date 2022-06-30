import {IFormError, Optional} from "@nxt-ui/cp/types";

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
    isEndpoint: boolean;
    image: {
        slateImage: Optional<string>;
        slateImageUrl: Optional<string>;
        dirty: boolean;
    };
};

export type IIpbeEditAdvancedState = {
    values: IIpbeEditAdvanced;
    errors: IIpbeEditAdvancedError;
};
