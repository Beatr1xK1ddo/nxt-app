import {EDataProcessingStatus, IApplicationTypeListItem} from "@nxt-ui/cp/types";

export interface IApplicationTypeState {
    values: Array<IApplicationTypeListItem>;
    status: EDataProcessingStatus;
}
