import {FC, useState, SyntheticEvent} from "react";

import {Icon} from "@nxt-ui/icons";

import {INavigationTabProps} from "../types";
import {PopoverComponent} from "@nxt-ui/components";
import "./index.css";

export const NavigationTab: FC<INavigationTabProps> = (props) => {
    const {name, menu, children} = props;

    const [isActive, setActive] = useState(false);
    const toggleActive = (e: SyntheticEvent): void => {
        setActive(!isActive);
    };

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? "menu-top" : undefined;

    return (
        <li onClick={toggleActive} className={`nav-tab-wrap ${isActive ? "active-nav-tab" : ""}`}>
            <button className="nav-tab" aria-controls="menu-top" aria-haspopup="true" onClick={handleClick}>
                {children}
                {name}
                <Icon name="arrow" />
            </button>
            <PopoverComponent
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                TransitionProps={{timeout: 0}}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}>
                {menu}
            </PopoverComponent>
        </li>
    );
};
