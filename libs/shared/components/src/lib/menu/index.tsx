import {FC} from "react";
import styled from "@emotion/styled";
import Menu, {MenuProps} from "@mui/material/Menu";
import MenuItem, {MenuItemProps} from "@mui/material/MenuItem";
import {IMenuItem} from "./types";

interface IMenuComponent extends MenuProps {
    itemArr: IMenuItem[];
    className?: string;
}
const MenuItemStyled: FC<MenuItemProps> = styled(MenuItem)(`
    background: var(--white);
    font: var(--font);
    color: var(--grey-black);
    padding: 7px 16px;
    &:hover {
        background: var(--b-gblue);
    }
`);

const MenuUpd: FC<IMenuComponent> = ({itemArr, className, ...props}) => {
    return (
        <Menu {...props}>
            {itemArr.map((item) => (
                <MenuItemStyled key={item.id}>{item.content}</MenuItemStyled>
            ))}
        </Menu>
    );
};
export const MenuComponent = styled(MenuUpd)`
    & {
        background: #999;
    }
`;
