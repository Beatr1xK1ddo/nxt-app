import {FC, useCallback, useMemo} from "react";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {bitrateValues} from "@nxt-ui/cp/constants";
import {Dropdown, IDropdownProps} from "@nxt-ui/components";

interface ISelectVideoBitrate extends IDropdownProps<number> {
    value?: number;
    onChange?: (e: SelectChangeEvent<unknown>) => void;
}

export const SelectVideoBitrate: FC<ISelectVideoBitrate> = ({value, onChange, ...rest}) => {
    const selectItems = useMemo(() => {
        return bitrateValues.map((bitrate) => {
            return (
                <MenuItem key={bitrate} value={bitrate} selected={bitrate === value}>
                    {`${bitrate} Mbps`}
                </MenuItem>
            );
        });
    }, [value]);

    const renderValue = useCallback((value: unknown) => {
        return `${value} Mbps`;
    }, []);

    return (
        <Dropdown renderValue={renderValue} onChange={onChange} value={value} values={bitrateValues} {...rest}>
            {selectItems}
        </Dropdown>
    );
};
