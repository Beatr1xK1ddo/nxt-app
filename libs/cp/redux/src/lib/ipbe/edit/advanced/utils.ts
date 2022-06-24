import {IApiIpbe} from "@nxt-ui/cp/api";
import {IIpbeEditAdvanced} from "./types";

export const ipbeApiToAdvancedMapper = (apiIpbeListItem: IApiIpbe): IIpbeEditAdvanced => ({
    addTimecode: apiIpbeListItem.addTimecode,
    runMonitor: apiIpbeListItem.runMonitor,
    enableLoopback: apiIpbeListItem.enableLoopback,
    enableSlateIfNoSignal: apiIpbeListItem.enableSlateIfNoSignal,
    enablePsfEncoding: apiIpbeListItem.enablePsfEncoding,
    restartOnError: apiIpbeListItem.restartOnError,
    enablePreviewImages: apiIpbeListItem.enablePreviewImages,
    slateImage: apiIpbeListItem.slateImage,
    isEndpoint: apiIpbeListItem.isEndpoint,
});

export const ipbeAdvancedToApiMapper = (editAdvancedIpbeListItem: IIpbeEditAdvanced) => ({
    addTimecode: editAdvancedIpbeListItem.addTimecode,
    runMonitor: editAdvancedIpbeListItem.runMonitor,
    enableLoopback: editAdvancedIpbeListItem.enableLoopback,
    enableSlateIfNoSignal: editAdvancedIpbeListItem.enableSlateIfNoSignal,
    enablePsfEncoding: editAdvancedIpbeListItem.enablePsfEncoding,
    restartOnError: editAdvancedIpbeListItem.restartOnError,
    enablePreviewImages: editAdvancedIpbeListItem.enablePreviewImages,
    slateImage: editAdvancedIpbeListItem.slateImage,
});
