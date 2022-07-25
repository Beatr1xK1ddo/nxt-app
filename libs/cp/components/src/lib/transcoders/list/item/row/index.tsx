import {FC, useCallback, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Button, CheckboxComponent, CircularProgressWithLabel} from "@nxt-ui/components";
import {NodeSchema, AppStatusDisplay, NxtDatePicker} from "@nxt-ui/cp/components";
import {Icon} from "@nxt-ui/icons";
import {IIpbeListItem} from "@nxt-ui/cp/types";
import {useRealtimeAppData, useStatusChangeNotification} from "@nxt-ui/cp/hooks";
import {ipbeListActions, ipbeListSelectors} from "@nxt-ui/cp-redux";

import {Caption} from "./caption";
import Destination from "./destoination";
import {IpbeItemActions} from "../actions";

import "./index.css";

interface IpbeListItemProps {
    ipbe: IIpbeListItem;
}

export const IpbeRowItem: FC<IpbeListItemProps> = ({ipbe}) => {
    const {
        id,
        name,
        node: nodeId,
        isEndpoint,
        ipbeDestinations,
        inputFormat,
        ipbeAudioEncoders,
        videoBitrate,
        sdiDevice,
        status: initialStatus,
    } = ipbe;
    const selected = useSelector(ipbeListSelectors.selectIpbeListSelected);

    const dispatch = useDispatch();

    const [openProperties, setOpenProperties] = useState(false);

    const {status, runTime} = useRealtimeAppData(nodeId, "ipbe2", ipbe.id, ipbe.startedAtMs);

    const {currentStatus} = useStatusChangeNotification(name, initialStatus, status);

    const propertiesRef = useRef<HTMLDivElement>(null);

    const openPropertiesHandler = useCallback(() => {
        setOpenProperties(true);
    }, []);

    const handleSelection = useCallback(() => {
        const exist = selected.includes(id);
        if (exist) {
            dispatch(ipbeListActions.removeSelected(id));
        } else {
            dispatch(ipbeListActions.setSelected(id));
        }
    }, [selected, dispatch, id]);

    const closePropertiesHandler = useCallback(() => {
        setOpenProperties(false);
    }, []);

    return (
        <li className="card-table">
            <div className="card-table-checkbox">
                <CheckboxComponent checked={selected.includes(id)} onClick={handleSelection} />
            </div>
            <div className="card-table-info">
                <Caption isEndpoint={ipbe.isEndpoint} id={id} name={name} nodeId={nodeId} />
            </div>
            <div className="card-table-status">
                <CircularProgressWithLabel value={80} />
                <div className="add-holder">
                    <AppStatusDisplay status={currentStatus} />
                    <NxtDatePicker nodeId={nodeId} />
                </div>
            </div>
            <div className="card-table-runtime">
                <span className="text-small">
                    2y 32d <br />
                    08h 41m
                </span>
                {/* <span className="text-small">{runTime}</span> */}
            </div>

            <div className="card-table-bitrate">
                <div className="bitrate-holder">
                    {videoBitrate && <span className="text-small">{`${videoBitrate}Mbps`}</span>}
                    {ipbe.ipbeAudioEncoders?.map((item, i) => (
                        <span key={i} className="text-small">{`${item.bitrate}kbps ${item.codec}`}</span>
                    ))}
                </div>
            </div>
            <div className="card-table-destination">
                {ipbeDestinations?.map((destination, i) => (
                    <Destination initialStatus={initialStatus} key={i} ipbe={ipbe} destination={destination} />
                ))}
            </div>

            <div className="card-table-input">
                <NodeSchema nodeId={nodeId} selected={ipbe.sdiDevice} />
                <p className="text-small">
                    <span className="text-thin">{`Format: `}</span>
                    {ipbe.inputFormat}
                </p>
            </div>
            <div className="card-table-actions">
                <Button data-type="btn-icon">
                    <Icon style={{color: "#FF9800"}} name="vlc" />
                </Button>
                <Button data-type="btn-icon">
                    <Icon style={{color: "#262626"}} name="mplayer" />
                </Button>
                <IpbeItemActions
                    name={name}
                    id={id}
                    ref={propertiesRef}
                    open={openProperties}
                    onClose={closePropertiesHandler}
                    status={status}
                />
                <Button data-type="btn-icon" onClick={openPropertiesHandler} btnRef={propertiesRef}>
                    <Icon name="properties" />
                </Button>
            </div>
        </li>
    );
};
