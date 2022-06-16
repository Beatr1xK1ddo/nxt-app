import {FC, useMemo} from "react";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {Dropdown, IDropdownProps} from "@nxt-ui/components";
import {EIpbeTimeCode, Optional} from "@nxt-ui/cp/types";

interface ISelectTimecode extends IDropdownProps<EIpbeTimeCode> {
    value: Optional<EIpbeTimeCode>;
    onChange?: (e: SelectChangeEvent<unknown>) => void;
}

export const SelectTimecode: FC<ISelectTimecode> = ({value, onChange, ...rest}) => {
    const selectItems = useMemo(() => {
        const values = Object.values(EIpbeTimeCode);
        const keys = Object.keys(EIpbeTimeCode);

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
