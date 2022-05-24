import {FC, useMemo} from "react";
import {formatDistance} from "date-fns";

import {CheckboxComponent, Button, CircularProgressWithLabel} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {Caption} from "./caption";
import {NodeStatus, NodeSchema} from "../../../../common";

import "./index.css";

import {EAppGeneralStatus, IIpbeListItem} from "@nxt-ui/cp/types";

interface IpbeListItemProps {
    item: IIpbeListItem;
    status: EAppGeneralStatus;
    startedAt: null | number;
}

export const IpbeRowItem: FC<IpbeListItemProps> = ({item, status, startedAt}) => {
    const {name, node, ipbeDestinations, inputFormat, ipbeAudioEncoders, videoBitrate, cardIdx} = item;

    const runTime = useMemo(() => {
        if (status === EAppGeneralStatus.active && startedAt) {
            return formatDistance(startedAt, new Date(), {addSuffix: false});
        } else {
            return "-";
        }
    }, [status, startedAt]);

    const inputsNodeScheme = [{id: 1, content: <Icon name="input4" />}];

    return (
        <li className="card-table">
            <div className="card-table-checkbox">
                <CheckboxComponent />
            </div>
            <div className="card-table-info">
                <Caption name={name} nodeId={node} />
            </div>
            <div className="card-table-status">
                <CircularProgressWithLabel value={80} />
                <NodeStatus status={status} />
                <Button data-type="btn-icon">
                    <Icon name="calendar" />
                </Button>
            </div>
            <div className="card-table-runtime">
                <span className="text-small">{runTime}</span>
                {/*<span className="text-small">{runRef.current || "08h 41m"}</span>*/}
            </div>
            <div className="card-table-input">
                <p className="text-small">
                    <span className="text-thin">{`IDX: `}</span>
                    {cardIdx}
                </p>
                <p className="text-small">
                    <span className="text-thin">{`Format: `}</span>
                    {inputFormat}
                </p>
            </div>
            <div className="card-table-bitrate">
                <div className="bitrate-holder">
                    {videoBitrate && <span className="text-small">{`${videoBitrate}Mbps`}</span>}
                    {ipbeAudioEncoders?.map((item) => (
                        <span key={item.id} className="text-small">{`${item.bitrate}kbps ${item.codec}`}</span>
                    ))}
                </div>
            </div>
            <div className="card-table-destination">
                <div className="destination-wrap">
                    {ipbeDestinations?.map((item) => (
                        <span key={item.id} className="text-small-blue">{`${item.outputIp}:${item.outputPort}`}</span>
                    ))}
                </div>
                <Button data-type="btn-icon">
                    <Icon name="chart" />
                </Button>
                <span className="speed-destination">6 Mbps</span>
            </div>
            <div className="schema-row-holder">
                <NodeSchema className="schema-row-view" inputsImgs={inputsNodeScheme} />
            </div>

            <div className="card-table-actions">
                <Button data-type="btn-icon">
                    <Icon name="properties" />
                </Button>
            </div>
        </li>
    );
};
