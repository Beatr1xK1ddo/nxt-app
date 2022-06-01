import {EDataProcessingStatus, IVideoEncoderListItem} from "@nxt-ui/cp/types";

export interface IEncoderVersion {
    values: Array<IVideoEncoderListItem>;
    status: EDataProcessingStatus;
}
