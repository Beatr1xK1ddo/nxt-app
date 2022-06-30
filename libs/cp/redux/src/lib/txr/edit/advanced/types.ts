import {IFormError, Optional} from "@nxt-ui/cp/types";

export type ITxrEditAdvancedError = {
    slateImage: IFormError;
};

export type ITxrEditAdvanced = {
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

export type ITxrEditAdvancedState = {
    values: ITxrEditAdvanced;
    errors: ITxrEditAdvancedError;
};
