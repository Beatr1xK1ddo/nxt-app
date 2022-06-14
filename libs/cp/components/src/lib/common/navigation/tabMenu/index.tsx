import {FC, useState, SyntheticEvent} from "react";
import {Icon} from "@nxt-ui/icons";
import {ITabMenuProps} from "../types";
import {CheckboxComponent} from "@nxt-ui/components";

import "./index.css";

export const TabMenu: FC<ITabMenuProps> = (props) => {
    const {items} = props;
    // const isMenuClick = (e: SyntheticEvent) => {
    //     e.stopPropagation();
    // };
    const [isActiveMenu, setActiveMenu] = useState(false);
    const toggleMenuChecks = (e: SyntheticEvent): void => {
        setActiveMenu(!isActiveMenu);
    };

    return (
        <div className={`top-menu-holder ${isActiveMenu ? "top-menu-active" : ""} `}>
            <ul className="tab-menu-container">
                {/* {items?.map((item) => (
                <li className="tab-items-container" key={item.title.value}>
                    <p className="tab-items-title">{item.title.value}</p>
                    <CheckboxComponent defaultChecked={true} labelText={item.items?.[0].value} />
                </li>
            ))} */}
                {items?.map((item) => (
                    <li className="tab-items-container" key={item.title.value}>
                        <CheckboxComponent
                            className="tab-items-title"
                            defaultChecked={true}
                            labelText={<a href="/">{item.title.value}</a>}
                        />
                        {item.items?.map((innerEl) => (
                            <CheckboxComponent
                                className="check-holder"
                                defaultChecked={true}
                                labelText={<a href="/">{innerEl.value}</a>}
                            />
                        ))}
                    </li>
                ))}
            </ul>
            <button className="btn-settings" onClick={toggleMenuChecks}>
                <Icon className="settings" name="settings" />
                <Icon className="tick" name="tick" />
            </button>
        </div>
    );
};
