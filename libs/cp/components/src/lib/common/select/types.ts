import {SelectChangeEvent} from "@mui/material/Select/Select";
import {IDropdownProps} from "@nxt-ui/components";
import {ICompany, INode} from "@nxt-ui/cp/api";

export type ISelectNodeProps = IDropdownProps<INode> & {
    onChange?(e: SelectChangeEvent<unknown>): void;
};

export type ICompanyDropdown = IDropdownProps<ICompany> & {
    onChange?(e: SelectChangeEvent<unknown>): void;
};
