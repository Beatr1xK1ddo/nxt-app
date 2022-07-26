import {FC, useCallback, useRef, useState} from "react";
import {Button, CheckboxComponent, CircularProgressWithLabel, MenuComponent, MenuItemStyled} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {AppStatusDisplay, NodeName} from "@nxt-ui/cp/components";
import {EAppType, ITxrListItem} from "@nxt-ui/cp/types";
import {Caption} from "./caption";
import "./index.css";
import {useNavigate} from "react-router-dom";
import {commonActions} from "@nxt-ui/cp-redux";
import {useDispatch} from "react-redux";

interface txrListItemProps {
    txr: ITxrListItem;
}

export const TxrRowItem: FC<txrListItemProps> = ({txr}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {id, name, txNodeId, rxNodeId, appType, sourceIp, destinationIp, sourcePort, destinationPort, status} = txr;

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
                <Caption id={id} name={name} appType={appType} />
            </div>
            <div className="card-table-qos">
                <CircularProgressWithLabel value={80} />
            </div>
            <div className="card-table-status-txr">
                <AppStatusDisplay status={status} />
                {/* <NxtDatePicker nodeId={nodeId} /> */}
            </div>
            <div className="card-table-tx">
                <span className="text-thin">
                    {sourceIp}:{sourcePort}
                </span>
                <span className="text-small">{txNodeId && <NodeName nodeId={txNodeId} />}</span>
            </div>
            <div className="card-table-proxy">
                {/* Wainting data for PROXY*/}
                <span className="text-small">test_dv_proxy2</span>
                <span className="text-thin">207.35.238.5:10001 / 1500</span>
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
                    className="test"
                >
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
