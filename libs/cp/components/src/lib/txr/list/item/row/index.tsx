import {FC, useCallback, useRef, useState} from "react";
import {Button, CheckboxComponent, CircularProgressWithLabel, MenuComponent, MenuItemStyled} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {AppStatusDisplay, NodeName} from "@nxt-ui/cp/components";
import {EAppType, ITxrListItem} from "@nxt-ui/cp/types";
import {Caption} from "./caption";
import "./index.css";
import {useNavigate} from "react-router-dom";
import {commonActions, commonSelectors} from "@nxt-ui/cp-redux";
import {useDispatch, useSelector} from "react-redux";
import {TxrItemActions} from "../actions";

interface txrListItemProps {
    txr: ITxrListItem;
}

export const TxrRowItem: FC<txrListItemProps> = ({txr}) => {
    const dispatch = useDispatch();

    const {
        txNodeId,
        rxNodeId,
        sourceIp,
        outputIp: destinationIp,
        sourcePort,
        outputPort: destinationPort,
        proxyServersIds,
    } = txr;
    const proxyServerEntities = useSelector(commonSelectors.proxyServer.entities);

    const btnRef = useRef<HTMLDivElement | null>(null);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const handleMenuOpen = useCallback(() => {
        setMenuOpen(true);
    }, []);

    const handleMenuClose = useCallback(() => {
        setMenuOpen(false);
    }, []);
    const selected = useSelector(commonSelectors.apps.selectedApps);
    const handleSelection = useCallback(() => {
        const exist = selected.includes(txr.id);
        if (exist) {
            dispatch(commonActions.applicationActions.removeSelectedApplications(txr.id));
        } else {
            dispatch(commonActions.applicationActions.setSelectedApplications(txr.id));
        }
    }, [selected, dispatch, txr.id]);

    return (
        <li className="card-table-txr">
            <div className="card-table-checkbox">
                <CheckboxComponent onClick={handleSelection} checked={selected.includes(txr.id)} />
            </div>
            <div className="card-table-info">
                <Caption txr={txr} />
            </div>
            <div className="card-table-qos">
                <CircularProgressWithLabel value={80} />
            </div>
            <div className="card-table-status-txr">
                <AppStatusDisplay app={txr} nodeId={null} />
                {/* <NxtDatePicker nodeId={nodeId} /> */}
            </div>
            <div className="card-table-tx">
                <span className="text-thin">
                    {sourceIp}:{sourcePort}
                </span>
                <span className="text-small">{txNodeId && <NodeName nodeId={txNodeId} />}</span>
            </div>
            <div className="card-table-proxy">
                {proxyServersIds.map((item) => {
                    const proxyServer = proxyServerEntities[item];
                    return (
                        <>
                            <span className="text-small">{proxyServer?.name}</span>
                            <span className="text-thin">
                                {proxyServer?.ip} / {proxyServer?.port}
                            </span>
                        </>
                    );
                })}
            </div>
            <div className="card-table-rx">
                <span className="text-thin">
                    {destinationIp}:{destinationPort}
                </span>
                <span className="text-small">{rxNodeId && <NodeName nodeId={rxNodeId} />}</span>
            </div>
            <div className="card-table-actions">
                <TxrItemActions nodeId={txNodeId} item={txr} ref={btnRef} open={menuOpen} onClose={handleMenuClose} />

                <Button data-type="btn-icon" onClick={handleMenuOpen} btnRef={btnRef}>
                    <Icon name="properties" />
                </Button>
            </div>
        </li>
    );
};
