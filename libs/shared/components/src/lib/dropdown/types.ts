import {MenuItemProps} from "@mui/material/MenuItem/MenuItem";
import {IIconNames} from "@nxt-ui/icons";
import {SelectChangeEvent, SelectProps} from "@mui/material/Select";
import {ChangeEventHandler} from "react";

type IDropdownParam<T = any> = T extends MenuItemProps["value"] ? MenuItemProps["value"] : T;

export type IDropdownProps<T, P = IDropdownParam<T>> = SelectProps & {
    values?: P[];
    inputWidth?: number;
    isSearch?: boolean;
    icon?: IIconNames;
    onChange?(value: SelectChangeEvent<unknown>): void;
    onSearch?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    searchValue?: string;
};
