import {FC, useState, useRef, useEffect} from "react";

import {Icon} from "@nxt-ui/icons";

import {INavigationTabProps} from "../types";
import {PopoverComponent} from "@nxt-ui/components";
import "./index.css";

export const NavigationTab: FC<INavigationTabProps> = (props) => {
    const {name, menu, children} = props;

    const [anchorEl, setMenuTopAnchorEl] = useState<HTMLButtonElement | null>(null);
    const menuTopClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuTopAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setMenuTopAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? "menu-top" : undefined;

    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    alert("You clicked outside of me!");
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    return (
        <li data-anchor={anchorEl} className="nav-tab-wrap">
            <button className="nav-tab" aria-controls="menu-top" aria-haspopup="true" onClick={menuTopClick}>
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
