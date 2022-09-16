import {FC, useCallback} from "react";
import {Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import "./index.css";
import {IProxyServerItem} from "@nxt-ui/cp/types";
import {commonSelectors, txrEditActions} from "@nxt-ui/cp-redux";
import {useDispatch, useSelector} from "react-redux";

interface IProxyList {
    items: Array<number>;
}

export const ProxyList: FC<IProxyList> = ({items}) => {
    const dispatch = useDispatch();
    const proxyServerEntities = useSelector(commonSelectors.proxyServer.entities);
    const handleDeleteItem = useCallback(
        (id) => {
            dispatch(txrEditActions.removeProxyServerItem(id as number));
        },
        [dispatch, txrEditActions]
    );
    return (
        <ul className="proxy-list">
            {items.map((item) => {
                const proxyServer = proxyServerEntities[item];
                if (!proxyServer) return null;
                return (
                    <li>
                        <span className="proxy-text">
                            <strong>{proxyServer?.name}</strong>
                            <br />
                            {proxyServer?.ip} / {proxyServer?.port}
                        </span>
                        <Button data-type="btn-icon">
                            <Icon name="delete" onClick={() => handleDeleteItem(proxyServer?.id)} />
                        </Button>
                    </li>
                );
            })}
        </ul>
    );
};
