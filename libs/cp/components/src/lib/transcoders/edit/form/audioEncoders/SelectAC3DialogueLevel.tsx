import {FC, useMemo} from "react";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {SelectChangeEvent} from "@mui/material/Select/Select";

import {Dropdown, IDropdownProps} from "@nxt-ui/components";
import {IVideoEncoderListItem} from "@nxt-ui/cp/types";
import {ac3DialogueLevelValues} from "@nxt-ui/cp/constants";

interface ISelectApplicationType extends IDropdownProps<IVideoEncoderListItem> {
    value?: number;
    onChange?: (e: SelectChangeEvent<unknown>) => void;
}

export const SelectAC3DialogueLevel: FC<ISelectApplicationType> = ({value, onChange, ...rest}) => {
    const levels = useMemo(() => ac3DialogueLevelValues, []);
    const selectItems = useMemo(() => {
        return levels.map((level) => {
            return (
                <MenuItem key={level} value={level} selected={level === value}>
                    {level}
                </MenuItem>
            );
        });
    }, [levels, value]);

    return (
        <Dropdown onChange={onChange} value={value?.toString()} {...rest}>
            <MenuItem key="default" value={0} selected={0 === value}>
                Not set
            </MenuItem>
            {selectItems}
        </Dropdown>
    );
};
