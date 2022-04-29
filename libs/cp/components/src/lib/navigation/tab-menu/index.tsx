import {FC} from "react";
import {ITabMenuProps} from "../types";
import "./tab-menu.css";

export const TabMenu: FC<ITabMenuProps> = (props) => {
    const {items} = props;
    return (
        <ul className="tab-menu-container">
            {items?.map((item) => (
                <li className="tab-items-container" key={item.title.value}>
                    <p className="tab-items-title">{item.title.value}</p>
                    <ul className="tab-items-wrap">
                        <li className="tab-item">
                            <p className="tab-item-title">{item.items?.[0].value}</p>
                        </li>
                    </ul>
                </li>
            ))}
        </ul>
    );
};
