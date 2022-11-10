import {FC, useCallback} from "react";
import {CheckboxComponent} from "@nxt-ui/components";
import {Link} from "react-router-dom";
import "./index.css";
import {INavAppItemSetPayload, INavAppSetPayload, INavigationTabState} from "@nxt-ui/cp-redux";

type ITabMenuItemProps = {
    tab: INavigationTabState;
    onAppChage?(value: Omit<INavAppSetPayload, "stateName">): void;
    onAppItemChange?(value: Omit<INavAppItemSetPayload, "stateName">): void;
};

export const TabMenuItem: FC<ITabMenuItemProps> = (props) => {
    const {onAppItemChange, onAppChage, tab} = props;

    const toggleItem = useCallback(
        (value: Omit<INavAppItemSetPayload, "stateName">) => () => {
            onAppItemChange?.(value);
        },
        [onAppItemChange]
    );

    const toggleApp = useCallback(
        (value: Omit<INavAppSetPayload, "stateName">) => () => {
            onAppChage?.(value);
        },
        [onAppChage]
    );

    return (
        <li className="tab-items-container">
            <CheckboxComponent
                isCheck={tab.active}
                onClick={toggleApp({tabName: tab.key})}
                className="tab-items-title"
                labelText={<div>{tab.label}</div>}
            />
            {Object.keys(tab.tabs).map((subTabName, index) => {
                const path = tab.tabs[subTabName].link;
                const isRemote = path.startsWith("/");
                const link = isRemote ? (
                    <a href={path}>{tab.tabs[subTabName].label}</a>
                ) : (
                    <Link to={path}>{tab.tabs[subTabName].label}</Link>
                );
                return (
                    <CheckboxComponent
                        isCheck={tab.tabs[subTabName].active}
                        key={index}
                        className="check-holder"
                        onClick={toggleItem({tabName: tab.key, subTabName})}
                        labelText={link}
                    />
                );
            })}
        </li>
    );
};
