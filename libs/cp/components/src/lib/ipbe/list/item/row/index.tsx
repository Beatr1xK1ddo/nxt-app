import {FC, useCallback, useRef, useState} from "react";
import {Button, CheckboxComponent, CircularProgressWithLabel, MenuComponent, MenuItemStyled} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {NodeSchema, AppStatus, NxtDatePicker} from "@nxt-ui/cp/components";
import {IIpbeListItem} from "@nxt-ui/cp/types";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";
import {Caption} from "./caption";
import Destination from "./destoination";
import "./index.css";
import {useNavigate} from "react-router-dom";
import {ipbeEditActions} from "@nxt-ui/cp-redux";
import {useDispatch} from "react-redux";

interface IpbeListItemProps {
    ipbe: IIpbeListItem;
}

export const IpbeRowItem: FC<IpbeListItemProps> = ({ipbe}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {id, name, node: nodeId, ipbeDestinations, inputFormat, ipbeAudioEncoders, videoBitrate, sdiDevice} = ipbe;
    const {status, runTime} = useRealtimeAppData(nodeId, "ipbe", ipbe.id, ipbe.status, ipbe.startedAtMs);

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
        dispatch(ipbeEditActions.removeIpbe(id));
    }, [dispatch, id]);

    const handleCreateIpbe = useCallback(() => {
        setOpenProperties(false);
        navigate(`/ipbe/`);
    }, [navigate]);

    return (
        <li className="card-table">
            <div className="card-table-checkbox">
                <CheckboxComponent />
            </div>
            <div className="card-table-info">
                <Caption id={id} name={name} nodeId={nodeId} />
            </div>
            <div className="card-table-status">
                <CircularProgressWithLabel value={80} />
                <NxtDatePicker nodeId={nodeId} />
                <AppStatus status={status} />
            </div>
            <div className="card-table-runtime">
                <span className="text-small">{runTime}</span>
                {/*<span className="text-small">{runRef.current || "08h 41m"}</span>*/}
            </div>
            <div className="card-table-input">
                <p className="text-small">
                    <span className="text-thin">{`IDX: `}</span>
                    {sdiDevice?.toString() || "-"}
                </p>
                <p className="text-small">
                    <span className="text-thin">{`Format: `}</span>
                    {inputFormat}
                </p>
            </div>
            <div className="card-table-bitrate">
                <div className="bitrate-holder">
                    {videoBitrate && <span className="text-small">{`${videoBitrate}Mbps`}</span>}
                    {ipbeAudioEncoders?.map((item, i) => (
                        <span key={i} className="text-small">{`${item.bitrate}kbps ${item.codec}`}</span>
                    ))}
                </div>
            </div>
            <div className="card-table-destination">
                {ipbeDestinations?.map((destination, i) => (
                    <Destination key={i} ipbe={ipbe} destination={destination} />
                ))}
            </div>
            <div className="schema-row-holder">
                <NodeSchema nodeId={nodeId} />
                {/* <NodeSchema nodeId={node} /> */}
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
                    <MenuItemStyled onClick={handleCreateIpbe}>Create</MenuItemStyled>
                    <MenuItemStyled onClick={handleDeleteIpbe}>Delete</MenuItemStyled>
                </MenuComponent>
                <Button data-type="btn-icon" onClick={openPropertiesHanndler} btnRef={propertiesRef}>
                    <Icon name="properties" />
                </Button>
            </div>
        </li>
    );
};
