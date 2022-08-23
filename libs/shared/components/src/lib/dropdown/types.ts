import {MenuItemProps} from "@mui/material/MenuItem/MenuItem";
import {IIconNames} from "@nxt-ui/icons";
import {SelectChangeEvent, SelectProps} from "@mui/material/Select";
import {ChangeEventHandler} from "react";
import {EDropdownEmptyType} from "@nxt-ui/cp/types";

type IDropdownParam<T> = T extends MenuItemProps["value"] ? MenuItemProps["value"] : T;

export type IDropdownProps<T, P = IDropdownParam<T>> = SelectProps & {
    values?: P[];
    inputWidth?: number;
    withSearch?: boolean;
    icon?: IIconNames;
    onChange?(value: SelectChangeEvent<unknown>): void;
    onSearch?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    searchValue?: string;
    helperText?: string;
    error?: boolean;
    labelClass?: string;
    emptyValue?: EDropdownEmptyType;
};
