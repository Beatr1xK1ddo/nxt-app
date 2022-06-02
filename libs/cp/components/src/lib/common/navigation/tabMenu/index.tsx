import {FC, useState, SyntheticEvent} from "react";
import {Icon} from "@nxt-ui/icons";
import {ITabMenuProps} from "../types";
import {CheckboxComponent} from "@nxt-ui/components";

import "./index.css";

export const TabMenu: FC<ITabMenuProps> = (props) => {
    const {items} = props;
    const [isActive, setActive] = useState(false);
    const toggleActive = (e: SyntheticEvent): void => {
        console.log(e.target);

        setActive(!isActive);
    };
    const test = () => {
        console.log("32");
    };

    return (
        <div className={`top-menu-holder ${isActive ? "top-menu-active" : ""} `}>
            <ul className="tab-menu-container">
                {/* {items?.map((item) => (
                <li className="tab-items-container" key={item.title.value}>
                    <p className="tab-items-title">{item.title.value}</p>
                    <CheckboxComponent defaultChecked={true} labelText={item.items?.[0].value} />
                </li>
            ))} */}
                {items?.map((item) => (
                    <li className="tab-items-container" key={item.title.value}>
                        {/* <p className="tab-items-title">{item.title.value}</p> */}
                        <CheckboxComponent
                            className="tab-items-title"
                            defaultChecked={true}
                            labelText={item.title.value}
                        />
                        {item.items?.map((innerEl) => (
                            <CheckboxComponent
                                className="check-holder"
                                defaultChecked={true}
                                labelText={innerEl.value}
                            />
                        ))}
                    </li>
                ))}
            </ul>
            <button className="btn-settings" onClick={toggleActive}>
                <Icon className="settings" name="settings" />
                <Icon className="tick" name="tick" />
            </button>
        </div>
    );
};
