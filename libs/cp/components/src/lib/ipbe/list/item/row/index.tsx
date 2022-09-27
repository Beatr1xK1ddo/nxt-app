import {FC, useCallback, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Button, CheckboxComponent, CircularProgressWithLabel} from "@nxt-ui/components";
import {NodeSchema, AppStatusDisplay, NxtDatePicker} from "@nxt-ui/cp/components";
import {Icon} from "@nxt-ui/icons";
import {EAppGeneralStatus, IIpbeListItem} from "@nxt-ui/cp/types";
import {commonActions, commonSelectors} from "@nxt-ui/cp-redux";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";

import {IpbeItemActions} from "../actions";
import {Caption} from "./caption";
import Destination from "./destination";

import "./index.css";

interface IpbeListItemProps {
    ipbe: IIpbeListItem;
}

export const IpbeRowItem: FC<IpbeListItemProps> = ({ipbe}) => {
    const {id, nodeId, ipbeDestinations, videoBitrate} = ipbe;

    const selected = useSelector(commonSelectors.apps.selectedApps);

    const dispatch = useDispatch();

    const [openProperties, setOpenProperties] = useState(false);

    const propertiesRef = useRef<HTMLDivElement>(null);

    const {status, runTime} = useRealtimeAppData(ipbe, nodeId);

    const openPropertiesHandler = useCallback(() => {
        setOpenProperties(true);
    }, []);

    const handleSelection = useCallback(() => {
        const exist = selected.includes(id);
        if (exist) {
            dispatch(commonActions.applicationActions.removeSelectedApplications(id));
        } else {
            dispatch(commonActions.applicationActions.setSelectedApplications(id));
        }
    }, [selected, dispatch, id]);

    const closePropertiesHandler = useCallback(() => {
        setOpenProperties(false);
    }, []);

    const bitrateValue = useMemo(() => {
        if (videoBitrate) {
            return (videoBitrate / 1000000).toFixed(2);
        }
        return null;
    }, [videoBitrate]);

    return (
        <li className="card-table">
            <div className="card-table-checkbox">
                <CheckboxComponent checked={selected.includes(id)} onClick={handleSelection} />
            </div>
            <div className="card-table-info">
                <Caption ipbe={ipbe} />
            </div>
            <div className="card-table-status">
                <CircularProgressWithLabel value={80} />
                <div className="add-holder">
                    <AppStatusDisplay app={ipbe} nodeId={nodeId} />
                    <NxtDatePicker nodeId={nodeId} />
                </div>
            </div>
            <div className="card-table-runtime">
                <span className="text-small">
                    {status === EAppGeneralStatus.active ? (
                        <span className="text-small">{runTime || "Runtime not available"}</span>
                    ) : (
                        "Runtime not available"
                    )}
                </span>
                {/* <span className="text-small">{runTime}</span> */}
            </div>

            <div className="card-table-bitrate">
                <div className="bitrate-holder">
                    {videoBitrate && <span className="text-small">{`${bitrateValue} Mbps`}</span>}
                    {ipbe.ipbeAudioEncoders?.map((item, i) => (
                        <span key={i} className="text-small">{`${item.bitrate} kbps ${item.codec}`}</span>
                    ))}
                </div>
            </div>
            <div className="card-table-destination">
                {ipbeDestinations?.map((destination, i) => (
                    <Destination key={i} ipbe={ipbe} destination={destination} />
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
                {/* <Button data-type="btn-icon">
                    <Icon style={{color: "#FF9800"}} name="vlc" />
                </Button>
                <Button data-type="btn-icon">
                    <Icon style={{color: "#262626"}} name="mplayer" />
                </Button> */}
                <IpbeItemActions
                    nodeId={nodeId}
                    ipbe={ipbe}
                    ref={propertiesRef}
                    open={openProperties}
                    onClose={closePropertiesHandler}
                />
                <Button data-type="btn-icon" onClick={openPropertiesHandler} btnRef={propertiesRef}>
                    <Icon name="properties" />
                </Button>
            </div>
        </li>
    );
};
