import {FC, useMemo} from "react";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {Dropdown, IDropdownProps} from "@nxt-ui/components";
import {EAppGeneralStatus, Optional} from "@nxt-ui/cp/types";

interface ISelectStatus extends IDropdownProps<EAppGeneralStatus> {
    value: Optional<EAppGeneralStatus>;
    onChange?: (e: SelectChangeEvent<unknown>) => void;
}

export const SelectStatus: FC<ISelectStatus> = ({value, onChange, ...rest}) => {
    const selectItems = useMemo(() => {
        const values = Object.values(EAppGeneralStatus);
        const keys = Object.keys(EAppGeneralStatus);

        return keys.map((key, i) => (
            <MenuItem key={key} value={key} selected={key === value}>
                {values[i]}
            </MenuItem>
        ));
    }, [value]);

    return (
        <Dropdown onChange={onChange} value={value} {...rest}>
            <MenuItem key="clean" value={""} selected={value === null}>
                None
            </MenuItem>
            {selectItems}
        </Dropdown>
    );
};
