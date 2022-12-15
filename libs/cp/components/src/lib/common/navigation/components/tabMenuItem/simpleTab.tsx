import {FC, useCallback, useMemo} from "react";
import {CheckboxComponent} from "@nxt-ui/components";
import {Link} from "react-router-dom";
import "./index.css";
import {INavAppItemSetPayload, INavigationSubTabState} from "@nxt-ui/cp-redux";

type ITabMenuItemProps = {
    tab: INavigationSubTabState;
    active?: boolean;
    onAppItemChange?(value: Omit<INavAppItemSetPayload, "stateName">): void;
};

export const SimpleTabMenuItem: FC<ITabMenuItemProps> = (props) => {
    const {onAppItemChange, tab, active} = props;

    const toggleItem = useCallback(
        (value: Omit<INavAppItemSetPayload, "stateName">) => () => {
            if (active) {
                onAppItemChange?.(value);
            }
        },
        [onAppItemChange, active]
    );

    const link = useMemo(() => {
        const path = tab.link;
        const isRemote = path.startsWith("/");
        return isRemote ? <Link to={path}>{tab.label}</Link> : <a href={path}>{tab.label}</a>;
    }, [tab]);

    if (tab.disabled) {
        return null;
    }

    return (
        <li className="tab-items-container">
            <CheckboxComponent
                isCheck={!tab.disabled && tab.active}
                className="check-holder"
                onClick={toggleItem({subTabName: tab.key})}
                labelText={link}
            />
        </li>
    );
};
