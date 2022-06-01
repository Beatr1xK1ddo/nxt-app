import type {FC} from "react";

import {ITabMenuProps} from "../types";
import {CheckboxComponent} from "@nxt-ui/components";

import "./index.css";

export const TabMenu: FC<ITabMenuProps> = (props) => {
    const {items} = props;
    return (
        <ul className="tab-menu-container">
            {/* {items?.map((item) => (
                <li className="tab-items-container" key={item.title.value}>
                    <p className="tab-items-title">{item.title.value}</p>
                    <CheckboxComponent defaultChecked={true} labelText={item.items?.[0].value} />
                </li>
            ))} */}
            {items?.map((item) => (
                <li className="tab-items-container" key={item.title.value}>
                    <p className="tab-items-title">{item.title.value}</p>
                    {item.items?.map((innerEl) => (
                        <CheckboxComponent className="check-holder" defaultChecked={true} labelText={innerEl.value} />
                    ))}
                </li>
            ))}
        </ul>
    );
};
