import {FC, useCallback, useRef, useState} from "react";
import {Button, CheckboxComponent, CircularProgressWithLabel} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {NodeSchema, AppStatus, NxtDatePicker} from "@nxt-ui/cp/components";
import {IIpbeListItem} from "@nxt-ui/cp/types";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";
import {Caption} from "./caption";
import Destination from "./destoination";
import "./index.css";
import {IpbeItemActions} from "../actions/index";
import {useDispatch, useSelector} from "react-redux";
import {ipbeListActions, ipbeListSelectors} from "@nxt-ui/cp-redux";

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
    } = ipbe;
    const {status, runTime} = useRealtimeAppData(nodeId, "ipbe2", ipbe.id, ipbe.status, ipbe.startedAtMs);
    const selected = useSelector(ipbeListSelectors.selectIpbeListSelected);
    const propertiesRef = useRef<HTMLDivElement>(null);
    const [openProperties, setOpenProperties] = useState(false);
    const dispatch = useDispatch();

    const openPropertiesHanndler = useCallback(() => {
        setOpenProperties(true);
    }, []);

    const handleChackbox = useCallback(() => {
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
                <CheckboxComponent checked={selected.includes(id)} onClick={handleChackbox} />
            </div>
            <div className="card-table-info">
                <Caption isEndpoint={isEndpoint} id={id} name={name} nodeId={nodeId} />
            </div>
            <div className="card-table-status">
                <CircularProgressWithLabel value={80} />
                <NxtDatePicker nodeId={nodeId} />
                <AppStatus status={status} />
            </div>
            <div className="card-table-runtime">
                <span className="text-small">{runTime}</span>
            </div>
            <div className="card-table-input">
                <p className="text-small">
                    <span className="text-thin">{`Format: `}</span>
                    {inputFormat}
                </p>
                <NodeSchema nodeId={nodeId} selected={sdiDevice} />
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
            <div className="schema-row-holder">{/* <NodeSchema nodeId={node} /> */}</div>
            <div className="card-table-actions">
                <IpbeItemActions
                    name={name}
                    id={id}
                    ref={propertiesRef}
                    open={openProperties}
                    onClose={closePropertiesHandler}
                    status={status}
                />
                <Button data-type="btn-icon" onClick={openPropertiesHanndler} btnRef={propertiesRef}>
                    <Icon name="properties" />
                </Button>
            </div>
        </li>
    );
};
