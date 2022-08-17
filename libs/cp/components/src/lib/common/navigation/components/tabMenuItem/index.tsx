import {FC, useCallback} from "react";
import {IAppItem} from "../../types";
import {CheckboxComponent} from "@nxt-ui/components";
import {Link} from "react-router-dom";
import "./index.css";

type ITabMenuItemProps = {
    active: boolean;
    keyName: string;
    name: string;
    items: Array<IAppItem>;
    onAppChage?(value: string): void;
    onAppItemChange?(value: string): void;
};

export const TabMenuItem: FC<ITabMenuItemProps> = (props) => {
    const {items, name, onAppItemChange, onAppChage, keyName, active} = props;

    const toggleItem = useCallback(
        (value: string) => () => {
            onAppItemChange?.(value);
        },
        [onAppItemChange]
    );

    const toggleApp = useCallback(
        (value: string) => () => {
            onAppChage?.(value);
        },
        [onAppChage]
    );

    return (
        <li className="tab-items-container">
            <CheckboxComponent
                isCheck={active}
                onClick={toggleApp(keyName)}
                className="tab-items-title"
                labelText={<div>{name}</div>}
            />
            {items?.map((item) => (
                <CheckboxComponent
                    isCheck={item.active}
                    key={item.key}
                    className="check-holder"
                    onClick={toggleItem(item.key)}
                    labelText={<Link to={item.path}>{item.key}</Link>}
                />
            ))}
        </li>
    );
};
