import { SelectProps } from '@mui/material/Select';

export type IDropdownProps = SelectProps & {
    values?: any[];
    inputWidth?: number;
    isSearch?: boolean;
};

export type IDropListProps = {
    values?: any[];
};
