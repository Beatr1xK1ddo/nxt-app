import {FC, useState, SyntheticEvent} from "react";

import {Icon} from "@nxt-ui/icons";

import {INavigationTabProps} from "../types";
import "./index.css";

export const NavigationTab: FC<INavigationTabProps> = (props) => {
    const {name, menu, children} = props;

    const [isActive, setActive] = useState(false);
    const toggleActive = (e: SyntheticEvent): void => {
        console.log(e.target);

        setActive(!isActive);
    };
    const test = () => {
        console.log("32");
    };

    return (
        <li
            onClick={toggleActive}
            className={`nav-tab-wrap ${isActive ? "active-nav-tab" : ""} `}
            //className="nav-tab-wrap"
        >
            <button className="nav-tab">
                {children}
                {name}
                <Icon name="arrow" />
            </button>
            <div className="nav-drop-menu">{menu}</div>
        </li>
    );
};
