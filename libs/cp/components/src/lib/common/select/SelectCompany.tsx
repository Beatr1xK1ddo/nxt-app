import {ChangeEventHandler, FC, useCallback, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {SelectChangeEvent} from "@mui/material/Select/Select";

import {Dropdown, IDropdownProps} from "@nxt-ui/components";
import {commonSelectors, CpRootState} from "@nxt-ui/cp-redux";
import {ICompaniesListItem, NumericId} from "@nxt-ui/cp/types";

interface ISelectCompanyProps extends IDropdownProps<ICompaniesListItem> {
    value?: NumericId;
    onChange?: (e: SelectChangeEvent<unknown>) => void;
}

export const SelectCompany: FC<ISelectCompanyProps> = ({value, onChange, ...rest}) => {
    const [filter, setFilter] = useState<string>("");
    const companies = useSelector<CpRootState, Array<ICompaniesListItem>>((state) =>
        commonSelectors.companies.selectWithFilter(state, filter)
    );
    const company = useSelector<CpRootState>((state) => commonSelectors.companies.selectById(state, value));

    const renderCompany = useCallback((company) => {
        if (company) {
            return company.name;
        } else {
            return "";
        }
    }, []);

    const selectItems = useMemo(() => {
        return companies.map((company) => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <MenuItem key={company.id} value={company} selected={company.id === value}>
                {company.name}
            </MenuItem>
        ));
    }, [companies, value]);

    const handleSelect = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            e.target.value = e.target.value.id ? e.target.value.id : null;
            onChange && onChange(e);
        },
        [onChange]
    );

    const handleFilterChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback((event) => {
        event.stopPropagation();
        setFilter(event.currentTarget.value);
    }, []);

    return (
        <Dropdown
            withSearch
            value={company}
            searchValue={filter}
            renderValue={renderCompany}
            onChange={handleSelect}
            onSearch={handleFilterChange}
            {...rest}>
            <MenuItem value={""} selected={value === null}>
                None
            </MenuItem>
            {selectItems}
        </Dropdown>
    );
};
