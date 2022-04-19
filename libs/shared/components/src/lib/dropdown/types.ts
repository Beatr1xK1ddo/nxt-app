import { MenuItemProps } from '@mui/material/MenuItem/MenuItem';
import { SelectChangeEvent, SelectProps } from '@mui/material/Select';

type IDropdownParam<T = any> = T extends MenuItemProps['value']
    ? MenuItemProps['value']
    : T;

export type IDropdownProps<T, P = IDropdownParam<T>> = SelectProps & {
    values?: P[];
    inputWidth?: number;
    isSearch?: boolean;
    onChange?(value: SelectChangeEvent<unknown>): void;
};
