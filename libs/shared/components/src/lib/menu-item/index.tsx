import styled from "@emotion/styled";
import MenuItem, {MenuItemProps} from "@mui/material/MenuItem";
import {FC} from "react";

export const MenuItemComponent: FC<MenuItemProps> = styled(MenuItem)(`
    background: var(--white);
    font: var(--font);
    color: var(--grey-black);
    padding: 7px 16px;
    &:hover {
        background: var(--b-gblue);
    }
`);
