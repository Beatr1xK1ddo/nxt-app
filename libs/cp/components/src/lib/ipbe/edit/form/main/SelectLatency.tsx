import {FC, useMemo} from "react";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {Dropdown, IDropdownProps} from "@nxt-ui/components";
import {EIpbeLatency, EIpbeLatencyKeys} from "@nxt-ui/cp/types";

interface ISelectLatencyProps extends IDropdownProps<Array<string>> {
    onChange?: (e: SelectChangeEvent<unknown>) => void;
}

export const SelectLatency: FC<ISelectLatencyProps> = ({onChange, value, ...rest}) => {
    const selectItems = useMemo(() => {
        const values = Object.values(EIpbeLatency);
        const keys = Object.keys(EIpbeLatencyKeys);
        return values.map((val, i) => (
            <MenuItem key={val} value={keys[i]} selected={keys[i] === value}>
                {val}
            </MenuItem>
        ));
    }, [value]);

    return (
        <Dropdown onChange={onChange} value={value || ""} {...rest}>
            {selectItems}
        </Dropdown>
    );
};
