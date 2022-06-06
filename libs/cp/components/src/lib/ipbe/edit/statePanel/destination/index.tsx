import React from "react";
import {BitrateMonitoring} from "@nxt-ui/cp/components";
import {IIpbeListItemDestination, NumericId} from "@nxt-ui/cp/types";
import {useRealtimeMonitoring} from "@nxt-ui/cp/hooks";

type Props = {
    nodeId: NumericId;
    destination: IIpbeListItemDestination;
};

const Destination = ({nodeId, destination}: Props) => {
    const [data, bitrate] = useRealtimeMonitoring(nodeId, destination.outputIp, destination.outputPort);

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <a href="/">{`${destination.outputIp}:${destination.outputPort}`}</a>
            <BitrateMonitoring data={data} small />
            <strong>{bitrate}</strong>
        </div>
    );
};

export default Destination;
