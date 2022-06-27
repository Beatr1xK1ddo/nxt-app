import React from "react";
import {Accordion} from "@nxt-ui/components";
import {BitrateMonitoring} from "@nxt-ui/cp/components";
import {IIpbeListItemDestination, NumericId} from "@nxt-ui/cp/types";

import IpbeCardAccordionHeader from "../accordionHeader";
import {useRealtimeMonitoring} from "@nxt-ui/cp/hooks";

type Props = {
    nodeId: NumericId;
    destination: IIpbeListItemDestination;
};

const PerformanceChart = ({nodeId, destination}: Props) => {
    const [data, bitrate] = useRealtimeMonitoring(nodeId, destination.outputIp, destination.outputPort);

    return (
        <Accordion
            header={
                <IpbeCardAccordionHeader
                    title={"Performance chart"}
                    paragraph={
                        <>
                            {`${destination.outputIp}:${destination.outputPort}`}
                            <strong>{bitrate}</strong>
                        </>
                    }
                />
            }
            TransitionProps={{unmountOnExit: true}}>
            <BitrateMonitoring data={data} />
        </Accordion>
    );
};

export default PerformanceChart;
