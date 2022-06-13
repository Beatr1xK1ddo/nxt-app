import {FC, useMemo} from "react";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {Dropdown, IDropdownProps} from "@nxt-ui/components";
import {IVideoEncoderListItem, Optional} from "@nxt-ui/cp/types";
import {bframesValues} from "@nxt-ui/cp/constants";

interface ISelectBFramesType extends IDropdownProps<IVideoEncoderListItem> {
    value: Optional<number>;
    onChange?: (e: SelectChangeEvent<unknown>) => void;
}

export const SelectBFrames: FC<ISelectBFramesType> = ({value, onChange, ...rest}) => {
    const selectItems = useMemo(() => {
        return bframesValues.map((val, i) => (
            <MenuItem key={val} value={val} selected={val === value}>
                {val}
            </MenuItem>
        ));
    }, [value]);

    return (
        <Dropdown onChange={onChange} value={value?.toString()} {...rest}>
            {selectItems}
        </Dropdown>
    );
};
