import {FC, useMemo} from "react";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {Dropdown, IDropdownProps} from "@nxt-ui/components";
import {IVideoEncoderListItem, Optional} from "@nxt-ui/cp/types";

interface ISelectBFramesType extends IDropdownProps<IVideoEncoderListItem> {
    value: Optional<number>;
    onChange?: (e: SelectChangeEvent<unknown>) => void;
}

export const SelectBFrames: FC<ISelectBFramesType> = ({value, onChange, ...rest}) => {
    const keys = useMemo(() => ["Disabled", "Fast", "Slow"], []);
    const values = useMemo(() => [0, 1, 2], []);

    const selectItems = useMemo(() => {
        return values.map((val, i) => (
            <MenuItem key={val} value={val} selected={val === value}>
                {keys[i]}
            </MenuItem>
        ));
    }, [values, value, keys]);

    return (
        <Dropdown onChange={onChange} value={value?.toString()} {...rest}>
            {selectItems}
        </Dropdown>
    );
};
