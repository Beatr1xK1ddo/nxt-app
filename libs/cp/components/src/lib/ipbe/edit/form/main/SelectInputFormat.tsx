import {FC, useMemo} from "react";
import {useSelector} from "react-redux";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {Dropdown, IDropdownProps} from "@nxt-ui/components";
import {ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {EIpbeEncoderVideoFormat} from "@nxt-ui/cp/types";

interface ISelectApplicationType extends IDropdownProps<Array<string>> {
    onChange?: (e: SelectChangeEvent<unknown>) => void;
}

export const SelectInputFormat: FC<ISelectApplicationType> = ({onChange, ...rest}) => {
    const value = useSelector(ipbeEditSelectors.main.inputFormat);
    const selectItems = useMemo(() => {
        const values = Object.values(EIpbeEncoderVideoFormat);
        const keys = Object.keys(EIpbeEncoderVideoFormat);
        return values.map((val, i) => (
            <MenuItem key={val} value={keys[i]} selected={keys[i] === value}>
                {val}
            </MenuItem>
        ));
    }, [value]);

    return (
        <Dropdown onChange={onChange} value={value || "AutoDetect"} {...rest}>
            {selectItems}
        </Dropdown>
    );
};
