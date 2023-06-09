import {FC, useCallback, useMemo} from "react";
import {CheckboxComponent} from "@nxt-ui/components";
import {Link} from "react-router-dom";
import "./index.css";
import {INavAppItemSetPayload, INavAppSetPayload, INavigationTabState} from "@nxt-ui/cp-redux";

type ITabMenuItemProps = {
    tab: INavigationTabState;
    active?: boolean;
    onAppChage?(value: Omit<INavAppSetPayload, "stateName">): void;
    onAppItemChange?(value: Omit<INavAppItemSetPayload, "stateName">): void;
};

export const TabMenuItem: FC<ITabMenuItemProps> = (props) => {
    const {onAppItemChange, onAppChage, tab, active} = props;

    const toggleItem = useCallback(
        (value: Omit<INavAppItemSetPayload, "stateName">) => () => {
            if (active) {
                onAppItemChange?.(value);
            }
        },
        [onAppItemChange, active]
    );

    const toggleApp = useCallback(
        (value: Omit<INavAppSetPayload, "stateName">) => () => {
            if (active) {
                onAppChage?.(value);
            }
        },
        [onAppChage, active]
    );

    const tabsDisabled = useMemo(() => Object.keys(tab.tabs).filter((key) => !tab.tabs[key].disabled), [tab.tabs]);

    if (tab.disabled || !tabsDisabled.length) {
        return null;
    }

    return (
        <li className="tab-items-container">
            <CheckboxComponent
                isCheck={tab.active}
                onClick={toggleApp({tabName: tab.key})}
                className="tab-items-title"
                labelText={<div>{tab.label}</div>}
            />
            {Object.keys(tab.tabs)
                .map((subTabName, index) => tab.tabs[subTabName])
                .sort((a, b) => (a.id || 0) - (b.id || 0))
                .map((item, index) => {
                    const isRemote = item.link.startsWith("/");
                    const link = isRemote ? (
                        <Link to={item.link}>{item.label}</Link>
                    ) : (
                        <a href={item.link}>{item.label}</a>
                    );
                    return (
                        <CheckboxComponent
                            isCheck={!item.disabled && item.active}
                            key={index}
                            className="check-holder"
                            onClick={toggleItem({tabName: tab.key, subTabName: item.key})}
                            labelText={link}
                        />
                    );
                })}
        </li>
    );
};
