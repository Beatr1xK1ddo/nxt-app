import {FC, useMemo} from "react";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {Dropdown, IDropdownProps} from "@nxt-ui/components";
import {EChooseActions, Optional} from "@nxt-ui/cp/types";

interface ISelectActions extends IDropdownProps<keyof typeof EChooseActions> {
    value: Optional<keyof typeof EChooseActions>;
    onChange?: (e: SelectChangeEvent<unknown>) => void;
}

export const SelectActions: FC<ISelectActions> = ({value, onChange, ...rest}) => {
    const selectItems = useMemo(() => {
        const values = Object.values(EChooseActions);
        const keys = Object.keys(EChooseActions);
        return keys.map((key, i) => (
            <MenuItem key={key} value={key} selected={key === value}>
                {values[i]}
            </MenuItem>
        ));
    }, [value]);

    return (
        <Dropdown onChange={onChange} value={value} {...rest}>
            {selectItems}
        </Dropdown>
    );
};
