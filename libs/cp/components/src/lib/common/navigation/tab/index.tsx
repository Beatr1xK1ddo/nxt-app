import {FC, useState, useRef, useEffect} from "react";

import {Icon} from "@nxt-ui/icons";

import {INavigationTabProps} from "../types";
import {PopperComponent} from "@nxt-ui/components";
import "./index.css";

export const NavigationTab: FC<INavigationTabProps> = (props) => {
    const {name, menu, children} = props;

    const [anchorEl, setMenuTopAnchorEl] = useState<HTMLButtonElement | null>(null);
    const menuTopClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuTopAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const id = open ? "menu-top" : undefined;

    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setMenuTopAnchorEl(null);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
        <li data-anchor={anchorEl} className="nav-tab-wrap">
            <button aria-describedby={id} className="nav-tab" onClick={menuTopClick}>
                {children}
                {name}
                <Icon name="arrow" />
            </button>
            <PopperComponent
                disablePortal={true}
                ref={wrapperRef}
                placement="bottom-start"
                id={id}
                open={open}
                anchorEl={anchorEl}>
                {menu}
            </PopperComponent>
        </li>
    );
};
