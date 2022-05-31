import {IApiCompanyListItem} from "@nxt-ui/cp/api";
import {ICompaniesListItem} from "@nxt-ui/cp/types";

export const companyMapper = (companyListItem: IApiCompanyListItem): ICompaniesListItem => ({
    id: companyListItem.id,
    name: companyListItem.name,
});
