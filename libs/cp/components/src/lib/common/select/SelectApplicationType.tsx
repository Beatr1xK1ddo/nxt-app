import {ChangeEventHandler, FC, useCallback, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {SelectChangeEvent} from "@mui/material/Select/Select";

import {Dropdown, IDropdownProps} from "@nxt-ui/components";
import {commonSelectors, CpRootState} from "@nxt-ui/cp-redux";
import {IApplicationTypeListItem} from "@nxt-ui/cp/types";

interface ISelectApplicationType extends IDropdownProps<IApplicationTypeListItem> {
    value?: string;
    onChange?: (e: SelectChangeEvent<unknown>) => void;
}

export const SelectApplicationType: FC<ISelectApplicationType> = ({value, onChange, ...rest}) => {
    // const [filter, setFilter] = useState<string>("");
    const applications = useSelector<CpRootState, Array<IApplicationTypeListItem>>(
        commonSelectors.applicationType.selectValues
    );
    const selectItems = useMemo(() => {
        return applications.map((application) => (
            <MenuItem key={application.key} value={application.key} selected={application.key === value}>
                {application.value}
            </MenuItem>
        ));
    }, [applications, value]);

    const renderApplication = useCallback(
        (applicationKey) => {
            const application = applications.find((app) => app.key === applicationKey);
            if (application) {
                return application.value;
            }
            return value || "";
        },
        [applications, value]
    );

    // const handleSelect = useCallback(
    //     (e: SelectChangeEvent<unknown>) => {
    //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //         // @ts-ignore
    //         e.target.value = e.target.value.id ? e.target.value.id : null;
    //         onChange && onChange(e);
    //     },
    //     [onChange]
    // );

    // const handleFilterChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback((event) => {
    //     event.stopPropagation();
    //     setFilter(event.currentTarget.value);
    // }, []);

    return (
        <Dropdown
            // withSearch
            // searchValue={filter}
            renderValue={renderApplication}
            onChange={onChange}
            value={value}
            // onSearch={handleFilterChange}
            {...rest}>
            {selectItems}
        </Dropdown>
    );
};
