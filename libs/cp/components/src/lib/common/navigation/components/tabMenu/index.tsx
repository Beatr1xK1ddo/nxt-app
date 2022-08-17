import {FC} from "react";
import {Icon} from "@nxt-ui/icons";
import "./index.css";

type ITabMenuProps = {
    active: boolean;
    onClick?(): void;
};

export const TabMenu: FC<ITabMenuProps> = ({children, active, onClick}) => {
    return (
        <div className={`top-menu-holder ${active ? "top-menu-active" : ""} `}>
            <ul className="tab-menu-container">{children}</ul>
            <button className="btn-settings" onClick={onClick}>
                <Icon className="settings" name="settings" />
                <Icon className="tick" name="tick" />
            </button>
        </div>
    );
};
