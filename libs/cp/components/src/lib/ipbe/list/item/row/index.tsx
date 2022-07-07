import {FC, useCallback, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Button, CheckboxComponent, CircularProgressWithLabel} from "@nxt-ui/components";
import {NodeSchema, AppStatusDisplay, NxtDatePicker} from "@nxt-ui/cp/components";
import {Icon} from "@nxt-ui/icons";
import {EAppGeneralStatus, IIpbeListItem} from "@nxt-ui/cp/types";
import {ipbeListActions, ipbeListSelectors} from "@nxt-ui/cp-redux";

import {Caption} from "./caption";
import Destination from "./destoination";
import {IpbeItemActions} from "../actions";

import "./index.css";

interface IpbeListItemProps {
    ipbe: IIpbeListItem;
    status: EAppGeneralStatus;
    runTime?: string;
}

export const IpbeRowItem: FC<IpbeListItemProps> = ({ipbe, status, runTime}) => {
    const {id, name, node: nodeId, ipbeDestinations, videoBitrate} = ipbe;

    const selected = useSelector(ipbeListSelectors.selectIpbeListSelected);

    const dispatch = useDispatch();

    const [openProperties, setOpenProperties] = useState(false);

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
                <NxtDatePicker nodeId={nodeId} />
                <AppStatusDisplay status={status} />
            </div>
            <div className="card-table-runtime">
                {status === EAppGeneralStatus.active ? <span className="text-small">{runTime}</span> : null}
            </div>
            <div className="card-table-input">
                <p className="text-small">
                    <span className="text-thin">{`Format: `}</span>
                    {ipbe.inputFormat}
                </p>
                <NodeSchema nodeId={nodeId} selected={ipbe.sdiDevice} />
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
                    <Destination initialStatus={status} key={i} ipbe={ipbe} destination={destination} />
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
                <Button data-type="btn-icon" onClick={openPropertiesHandler} btnRef={propertiesRef}>
                    <Icon name="properties" />
                </Button>
            </div>
        </li>
    );
};
