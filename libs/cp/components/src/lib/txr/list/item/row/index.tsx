import {FC, useCallback, useEffect, useRef, useState} from "react";
import {Button, CheckboxComponent, CircularProgressWithLabel, MenuComponent, MenuItemStyled} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {AppStatusDisplay, NodeName} from "@nxt-ui/cp/components";
import {EAppType, ITxrListItem} from "@nxt-ui/cp/types";
import {Caption} from "./caption";
import "./index.css";
import {useNavigate} from "react-router-dom";
import {commonActions, commonSelectors} from "@nxt-ui/cp-redux";
import {useDispatch, useSelector} from "react-redux";
import {useRealtimeTxrNodeData} from "@nxt-ui/cp/hooks";

interface txrListItemProps {
    txr: ITxrListItem;
}

export const TxrRowItem: FC<txrListItemProps> = ({txr}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        id,
        name,
        txNodeId,
        rxNodeId,
        appType,
        sourceIp,
        destinationIp,
        sourcePort,
        destinationPort,
        proxyServersIds,
    } = txr;
    const proxyServerEntities = useSelector(commonSelectors.proxyServer.entities);

    const {txrData} = useRealtimeTxrNodeData(rxNodeId);

    useEffect(() => {
        console.log("txrData", txrData);
    }, [txrData]);

    const propertiesRef = useRef<HTMLDivElement | null>(null);
    const [openProperties, setOpenProperties] = useState(false);

    const openPropertiesHanndler = useCallback(() => {
        setOpenProperties(true);
    }, []);

    const closePropertiesHandler = useCallback(() => {
        setOpenProperties(false);
    }, []);

    const handleDeleteTxr = useCallback(() => {
        setOpenProperties(false);
        dispatch(commonActions.applicationActions.removeApplications({data: {id, name}, appType: EAppType.TXR}));
    }, [dispatch, id, name]);

    const handleEditTxr = useCallback(() => {
        setOpenProperties(false);
        navigate(`/txr/${txr.id}`);
    }, [txr.id, navigate]);

    return (
        <li className="card-table-txr">
            <div className="card-table-checkbox">
                <CheckboxComponent />
            </div>
            <div className="card-table-info">
                <Caption id={id} name={name} appType={appType} proxyServersIds={proxyServersIds} />
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
                <MenuComponent
                    anchorEl={propertiesRef.current}
                    open={openProperties}
                    onClose={closePropertiesHandler}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                    className="test">
                    <MenuItemStyled onClick={handleEditTxr}>Edit</MenuItemStyled>
                    <MenuItemStyled onClick={handleDeleteTxr}>Delete</MenuItemStyled>
                </MenuComponent>
                <Button data-type="btn-icon" onClick={openPropertiesHanndler} btnRef={propertiesRef}>
                    <Icon name="properties" />
                </Button>
            </div>
        </li>
    );
};
