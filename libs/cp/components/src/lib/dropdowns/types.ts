import { SelectChangeEvent } from '@mui/material/Select/Select';
import { IDropdownProps } from '@nxt-ui/components';
import { INode } from '@nxt-ui/cp/api';

export type INodeDropdown = IDropdownProps<INode> & {
    onChange?(e: SelectChangeEvent<unknown>): void;
    activeNode?: string;
};
