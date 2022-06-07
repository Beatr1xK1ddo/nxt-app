import React from "react";
import {BitrateMonitoring} from "@nxt-ui/cp/components";
import {IIpbeListItemDestination, NumericId} from "@nxt-ui/cp/types";
import {useRealtimeMonitoring} from "@nxt-ui/cp/hooks";
import clsx from "clsx";
import "./index.css";

type Props = {
    nodeId: NumericId;
    destination: IIpbeListItemDestination;
};

const Destination = ({nodeId, destination}: Props) => {
    const [data, bitrate] = useRealtimeMonitoring(nodeId, destination.outputIp, destination.outputPort);

    const errors = JSON.stringify(data?.errors);
    console.log(errors);

    return (
        <div className="bitrate-log-box">
            <a href="/">{`${destination.outputIp}:${destination.outputPort}`}</a>
            <strong
                //   if (bitrate === 0): className="signal-lost"
                //   if (errors): className="signal-errors"
                //   if (!errors): className="signal-good"
                className={clsx(
                    "bitrate-log",
                    errors && "signal-errors",
                    !errors && "signal-good",
                    parseFloat(bitrate) === 0 && "signal-lost"
                )}>
                {bitrate}
            </strong>
            <BitrateMonitoring data={data} small />
        </div>
    );
};

export default Destination;
