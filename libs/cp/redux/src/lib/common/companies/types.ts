import {EntityState} from "@reduxjs/toolkit";
import {EDataProcessingStatus, ICompaniesListItem} from "@nxt-ui/cp/types";

export interface ICompaniesState {
    data: EntityState<ICompaniesListItem>;
    status: EDataProcessingStatus;
}
