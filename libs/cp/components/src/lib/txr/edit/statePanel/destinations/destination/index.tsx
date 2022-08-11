import React from "react";
import {BitrateMonitoringThumbnail} from "@nxt-ui/cp/components";
import {IListItemDestination, NumericId, Optional} from "@nxt-ui/cp/types";
import {useRealtimeMonitoring} from "@nxt-ui/cp/hooks";
import clsx from "clsx";
import "./index.css";

type Props = {
    nodeId: NumericId;
    destination: IListItemDestination;
    appId: Optional<number>;
};

const Destination = ({nodeId, destination, appId}: Props) => {
    //@ts-ignore
    const {bitrate, errors} = useRealtimeMonitoring(nodeId, destination.outputIp, destination.outputPort);

    // const errors = JSON.stringify(data?.errors);

    return (
        <div className="bitrate-log-box">
            <a href="/">{`${destination.outputIp}:${destination.outputPort}`}</a>
            <strong
                //   if (bitrate === 0): className="signal-lost"
                //   if (errors): className="signal-errors"
                //   if (!errors): className="signal-good"
                className={clsx(
                    "bitrate-log",
                    errors?.cc && "signal-errors",
                    !errors?.cc && "signal-good",
                    (!bitrate?.bitrate || bitrate?.bitrate === 0) && "signal-lost"
                )}
            >
                {bitrate?.bitrate || ""}
            </strong>
            <BitrateMonitoringThumbnail data={null} />
        </div>
    );
};

export default Destination;
