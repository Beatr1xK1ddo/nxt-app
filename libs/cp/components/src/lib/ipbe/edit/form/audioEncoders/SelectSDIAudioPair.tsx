import {FC, useMemo} from "react";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {SelectChangeEvent} from "@mui/material/Select/Select";

import {Dropdown, IDropdownProps} from "@nxt-ui/components";
import {IVideoEncoderListItem} from "@nxt-ui/cp/types";
import {sdiAudioPair} from "@nxt-ui/cp/constants";

interface ISelectApplicationType extends IDropdownProps<IVideoEncoderListItem> {
    value?: number;
    onChange?: (e: SelectChangeEvent<unknown>) => void;
}

export const SelectSDIAudioPair: FC<ISelectApplicationType> = ({value, onChange, ...rest}) => {
    const audioPairs = useMemo(() => sdiAudioPair(), []);
    const selectItems = useMemo(() => {
        return audioPairs.map((pair) => {
            return (
                <MenuItem key={pair} value={pair} selected={pair === value}>
                    {pair}
                </MenuItem>
            );
        });
    }, [audioPairs, value]);

    return (
        <Dropdown onChange={onChange} value={value?.toString()} {...rest}>
            <MenuItem key="default" value={0} selected={0 === value}>
                Not set
            </MenuItem>
            {selectItems}
        </Dropdown>
    );
};
