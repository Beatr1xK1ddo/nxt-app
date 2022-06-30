import {IApiTxr} from "@nxt-ui/cp/api";
import {ITxrEditAdvanced} from "./types";

export const txrApiToAdvancedMapper = (apiTxrListItem: IApiTxr): ITxrEditAdvanced => ({
    addTimecode: apiTxrListItem.addTimecode,
    runMonitor: apiTxrListItem.runMonitor,
    enableLoopback: apiTxrListItem.enableLoopback,
    enableSlateIfNoSignal: apiTxrListItem.enableSlateIfNoSignal,
    enablePsfEncoding: apiTxrListItem.enablePsfEncoding,
    restartOnError: apiTxrListItem.restartOnError,
    enablePreviewImages: apiTxrListItem.enablePreviewImages,
    isEndpoint: apiTxrListItem.isEndpoint,
    image: {
        slateImage: apiTxrListItem.slateImage,
        slateImageUrl: apiTxrListItem.slateImageUrl,
        dirty: false,
    },
});

export const txrAdvancedToApiMapper = (editAdvancedTxrListItem: ITxrEditAdvanced) => ({
    addTimecode: editAdvancedTxrListItem.addTimecode,
    runMonitor: editAdvancedTxrListItem.runMonitor,
    enableLoopback: editAdvancedTxrListItem.enableLoopback,
    enableSlateIfNoSignal: editAdvancedTxrListItem.enableSlateIfNoSignal,
    enablePsfEncoding: editAdvancedTxrListItem.enablePsfEncoding,
    restartOnError: editAdvancedTxrListItem.restartOnError,
    enablePreviewImages: editAdvancedTxrListItem.enablePreviewImages,
    slateImage: editAdvancedTxrListItem.image.slateImage,
});
