import {IUserStateApi} from "@nxt-ui/cp/api";
import {EDataProcessingStatus, Optional} from "@nxt-ui/cp/types";

export type IUserState = {
    status: EDataProcessingStatus;
    user: Optional<IUserStateApi>;
};
