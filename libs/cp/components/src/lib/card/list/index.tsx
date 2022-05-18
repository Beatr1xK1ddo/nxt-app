import {FC, useMemo} from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import {CheckboxComponent} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {CardTableInfo} from "./info";
import {Status} from "../status";

import "./cardtable.css";

import img from "../img.png";
import {EAppGeneralStatus, IIpbeListItem} from "@nxt-ui/cp/types";

interface IpbeListItemProps {
    item: IIpbeListItem;
    status: EAppGeneralStatus;
    startedAt: null | number;
}

dayjs.extend(relativeTime);

export const IpbeRowItem: FC<IpbeListItemProps> = ({item, status, startedAt}) => {
    const {name, nodeText, ipbeDestinations, inputFormat, ipbeAudioEncoders, videoBitrate, cardIdx} = item;

    const runTime = useMemo(() => {
        if (status === EAppGeneralStatus.active && startedAt) {
            return dayjs(startedAt).fromNow(true);
        } else {
            return "-";
        }
    }, [status, startedAt]);

    return (
        <li className="card-table">
            <div className="card-table-checkbox">
                <CheckboxComponent />
            </div>
            <div className={"card-table-info"}>
                <CardTableInfo title={name} text={nodeText} image={img} />
            </div>
            <div className="card-table-status">
                <Status status={status} />
                <Icon name="calendar" style={{marginTop: 4}} />
            </div>
            <div className="card-table-runtime">
                <span className="text-small">{runTime}</span>
                {/*<span className="text-small">{runRef.current || "08h 41m"}</span>*/}
            </div>
            <div className={"card-table-input"}>
                <p className="text-small">
                    <span className="text-thin">{`IDX: `}</span>
                    {cardIdx}
                </p>
                <p className="text-small">
                    <span className="text-thin">{`Format: `}</span>
                    {inputFormat}
                </p>
            </div>
            <div className={"card-table-bitrate"}>
                <div className={"scroll"}>
                    {videoBitrate && <span className="text-small">{`${videoBitrate}Mbps`}</span>}
                    {ipbeAudioEncoders?.map((item) => (
                        <span key={item.id} className="text-small">{`${item.bitrate}kbps ${item.codec}`}</span>
                    ))}
                </div>
            </div>
            <div className={"card-table-destination"}>
                <div className={"destination-wrap"}>
                    {ipbeDestinations?.map((item) => (
                        <span key={item.id} className={"text-small-blue"}>{`${item.outputIp}:${item.outputPort}`}</span>
                    ))}
                </div>
                <div className="block-icon">
                    <Icon name="plus" />
                </div>
            </div>
            <div className="card-table-actions">
                <div className="block-icon">
                    <Icon name="properties" />
                </div>
            </div>
        </li>
    );
};
