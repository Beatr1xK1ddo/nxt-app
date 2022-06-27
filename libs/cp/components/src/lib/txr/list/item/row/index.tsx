import {FC, useCallback, useRef, useState} from "react";
import {Button, CheckboxComponent, CircularProgressWithLabel, MenuComponent, MenuItemStyled} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {AppStatus, NxtDatePicker} from "@nxt-ui/cp/components";
import {IIpbeListItem} from "@nxt-ui/cp/types";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";
import {Caption} from "./caption";
import "./index.css";
import {useNavigate} from "react-router-dom";
import {ipbeCommonActions} from "@nxt-ui/cp-redux";
import {useDispatch} from "react-redux";

interface IpbeListItemProps {
    ipbe: IIpbeListItem;
}

export const TxrRowItem: FC<IpbeListItemProps> = ({ipbe}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {id, name, node: nodeId} = ipbe;
    const {status} = useRealtimeAppData(nodeId, "ipbe", ipbe.id, ipbe.startedAtMs);

    const propertiesRef = useRef<HTMLDivElement | null>(null);
    const [openProperties, setOpenProperties] = useState(false);

    const openPropertiesHanndler = useCallback(() => {
        setOpenProperties(true);
    }, []);

    const closePropertiesHandler = useCallback(() => {
        setOpenProperties(false);
    }, []);

    const handleDeleteIpbe = useCallback(() => {
        setOpenProperties(false);
        dispatch(ipbeCommonActions.removeIpbes({id, name}));
    }, [dispatch, id, name]);

    const handleEditIpbe = useCallback(() => {
        setOpenProperties(false);
        navigate(`/ipbe/${ipbe.id}`);
    }, [ipbe.id, navigate]);

    return (
        <li className="card-table">
            <div className="card-table-checkbox">
                <CheckboxComponent />
            </div>
            <div className="card-table-info">
                <Caption id={id} name={name} nodeId={nodeId} />
            </div>
            <div className="card-table-qos">
                <CircularProgressWithLabel value={80} />
            </div>
            <div className="card-table-status">
                <AppStatus status={status} />
                <NxtDatePicker nodeId={nodeId} />
            </div>
            <div className="card-table-tx">
                <span className="text-thin">239.0.0.4:11848</span>
                <span className="text-small">devbox22 - Gleb (devbox22) - A192548</span>
            </div>
            <div className="card-table-proxy">
                <span className="text-small">test_dv_proxy2</span>
                <span className="text-thin">207.35.238.5:10001 / 1500</span>
            </div>
            <div className="card-table-rx">
                <span className="text-thin">239.10.15.122:1234</span>
                <span className="text-small">GLEB (dev-notebook) (gleb-dev-pc) - C627598</span>
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
                    <MenuItemStyled onClick={handleEditIpbe}>Edit</MenuItemStyled>
                    <MenuItemStyled onClick={handleDeleteIpbe}>Delete</MenuItemStyled>
                </MenuComponent>
                <Button data-type="btn-icon" onClick={openPropertiesHanndler} btnRef={propertiesRef}>
                    <Icon name="properties" />
                </Button>
            </div>
        </li>
    );
};
