import React from "react";
import {Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {useRealtimeMonitoring} from "@nxt-ui/cp/hooks";
import {IIpbeListItem, IIpbeListItemDestination} from "@nxt-ui/cp/types";

type Props = {
    ipbe: IIpbeListItem;
    destination: IIpbeListItemDestination;
};

const Monitoring = ({ipbe, destination}: Props) => {
    const [, bitrate] = useRealtimeMonitoring(ipbe.node, destination.outputIp, destination.outputPort);

    return (
        <>
            <Button data-type="btn-icon">
                <Icon name="chart" />
            </Button>
            <span className="speed-destination">{bitrate}</span>
        </>
    );
};

export default Monitoring;
