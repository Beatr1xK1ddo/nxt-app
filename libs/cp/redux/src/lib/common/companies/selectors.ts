//selectors
import {companiesAdapter} from "./slice";
import {ICompaniesState} from "./types";

const companiesSelectors = companiesAdapter.getSelectors((state: ICompaniesState) => state.data);

export const selectCompanies = companiesSelectors.selectAll;
export const selectCompany = companiesSelectors.selectById;
