//selectors
import {createDraftSafeSelector} from "@reduxjs/toolkit";
import {ICompaniesListItem} from "@nxt-ui/cp/types";
import {selectFilter} from "../../utils";
import {companiesAdapter} from "./slice";
import {ICompaniesState} from "./types";
const companiesSelectors = companiesAdapter.getSelectors((state: ICompaniesState) => state.data);
export const selectStatus = (state: ICompaniesState) => state.status;

export const selectAll = companiesSelectors.selectAll;
export const selectById = companiesSelectors.selectById;

export const selectWithFilter = createDraftSafeSelector(
    selectAll,
    selectFilter,
    (companies, filter): Array<ICompaniesListItem> => {
        return filter
            ? companies.filter((company) => company.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
            : companies;
    }
);
