import {FC} from "react";
import styled from "@emotion/styled";
import Menu from "@mui/material/Menu";
import MenuItem, {MenuItemProps} from "@mui/material/MenuItem";
import {IMenuComponent} from "./types";

const MenuUpd: FC<IMenuComponent> = (props) => {
    return <Menu {...props} />;
};

export const MenuItemStyled: FC<MenuItemProps> = styled(MenuItem)(`
    background: var(--white);
    font: var(--font);
    color: var(--grey-black);
    padding: 7px 16px;
    &:hover {
        background: var(--b-gblue);
    }
`);

export const MenuComponent = styled(MenuUpd)`
    & {
        background: transparrent;
    }
`;
