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
    padding: 0.4375rem 1rem;
    &:hover {
        background: var(--b-gblue);
    }
    a {
        color: var(--grey-black);
        text-decoration: none;
    }
`);

export const MenuComponent = styled(MenuUpd)`
    & {
        background: transparrent;
    }
`;
