import {IApiIpbe} from "@nxt-ui/cp/api";
import {IIpbeEditAdvanced} from "./types";

export const ipbeEditAdvancedMapper = (apiIpbeListItem: IApiIpbe): IIpbeEditAdvanced => ({
    addTimecode: apiIpbeListItem.addTimecode,
    runMonitor: apiIpbeListItem.runMonitor,
    enableLoopback: apiIpbeListItem.enableLoopback,
    enableSlateIfNoSignal: apiIpbeListItem.enableSlateIfNoSignal,
    enablePsfEncoding: apiIpbeListItem.enablePsfEncoding,
    restartOnError: apiIpbeListItem.restartOnError,
    enablePreviewImages: apiIpbeListItem.enablePreviewImages,
    slateImage: apiIpbeListItem.slateImage,
});
