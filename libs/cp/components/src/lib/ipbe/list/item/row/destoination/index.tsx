import React from "react";
import {EAppGeneralStatus, IIpbeListItem, IIpbeListItemDestination} from "@nxt-ui/cp/types";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";
import Monitoring from "./Monitoring";

type Props = {
    ipbe: IIpbeListItem;
    destination: IIpbeListItemDestination;
};

const Destination = ({ipbe, destination}: Props) => {
    const {status} = useRealtimeAppData(ipbe.node, "ipbe", ipbe.id, ipbe.status, ipbe.startedAtMs);

    return (
        <div className="card-table-destination-holder">
            <span className="text-small-blue">{`${destination.outputIp}:${destination.outputPort}`}</span>
            {(status === EAppGeneralStatus.active || status === EAppGeneralStatus.error) && (
                <Monitoring ipbe={ipbe} destination={destination} />
            )}
        </div>
    );
};

export default Destination;
